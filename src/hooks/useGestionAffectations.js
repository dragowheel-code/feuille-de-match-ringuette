import { useEffect, useState } from 'react'

import { supabase } from '../services/supabase'

import { creerAffectation } from '../domain/affectation/creerAffectation'
import { validerAffectation } from '../domain/affectation/validerAffectation'

function convertirAffectationDepuisSupabase(affectation) {
  return {
    id: affectation.id,

    saisonId: affectation.saison_id,

    equipeId: affectation.equipe_id,

    joueuseId: affectation.joueuse_id,

    numero: affectation.numero ?? '',

    typeAffectation: affectation.type_affectation ?? 'NORMALE',

    roleEquipe: affectation.role_equipe ?? 'JOUEUSE',

    dateDebut: affectation.date_debut ?? '',

    dateFin: affectation.date_fin ?? '',

    active: affectation.active !== false,

    notes: affectation.notes ?? '',
  }
}

function convertirAffectationVersSupabase(affectation) {
  return {
    id: affectation.id,

    saison_id: affectation.saisonId,

    equipe_id: affectation.equipeId,

    joueuse_id: affectation.joueuseId,

    numero: affectation.numero ?? '',

    type_affectation: affectation.typeAffectation ?? 'NORMALE',

    role_equipe: affectation.roleEquipe ?? 'JOUEUSE',

    date_debut: affectation.dateDebut || null,

    date_fin: affectation.dateFin || null,

    active: affectation.active !== false,

    notes: affectation.notes || null,
  }
}

export function useGestionAffectations() {
  const [affectations, setAffectations] = useState([])

  const [chargement, setChargement] = useState(true)

  const [erreurChargement, setErreurChargement] = useState(null)

  useEffect(() => {
    async function chargerAffectations() {
      setChargement(true)
      setErreurChargement(null)

      const { data, error } = await supabase.from('affectations').select('*')

      if (error) {
        console.error('Erreur chargement affectations :', error)

        setErreurChargement(error.message)

        setChargement(false)
        return
      }

      setAffectations((data ?? []).map(convertirAffectationDepuisSupabase))

      setChargement(false)
    }

    chargerAffectations()
  }, [])

  function obtenirAffectationParId(idAffectation) {
    return affectations.find(
      (affectation) => String(affectation.id) === String(idAffectation)
    )
  }

  async function ajouterAffectation(formulaire) {
    const nouvelleAffectation = creerAffectation(formulaire)

    const validation = validerAffectation(nouvelleAffectation, affectations)

    if (!validation.valide) {
      return {
        succes: false,
        affectation: null,
        erreurs: validation.erreurs,
      }
    }

    const { data, error } = await supabase
      .from('affectations')
      .insert(convertirAffectationVersSupabase(nouvelleAffectation))
      .select()
      .single()

    if (error) {
      return {
        succes: false,
        affectation: null,
        erreurs: [error.message],
      }
    }

    const affectationCreee = convertirAffectationDepuisSupabase(data)

    setAffectations((actuelles) => [...actuelles, affectationCreee])

    return {
      succes: true,
      affectation: affectationCreee,
      erreurs: [],
    }
  }

  async function modifierAffectation(formulaire) {
    const affectationExistante = obtenirAffectationParId(formulaire.id)

    if (!affectationExistante) {
      return {
        succes: false,
        affectation: null,
        erreurs: ['Affectation introuvable.'],
      }
    }

    const affectationModifiee = creerAffectation({
      ...affectationExistante,
      ...formulaire,
      id: affectationExistante.id,
    })

    const validation = validerAffectation(affectationModifiee, affectations)

    if (!validation.valide) {
      return {
        succes: false,
        affectation: null,
        erreurs: validation.erreurs,
      }
    }

    const { data, error } = await supabase
      .from('affectations')
      .update(convertirAffectationVersSupabase(affectationModifiee))
      .eq('id', affectationModifiee.id)
      .select()
      .single()

    if (error) {
      return {
        succes: false,
        affectation: null,
        erreurs: [error.message],
      }
    }

    const affectationSauvegardee = convertirAffectationDepuisSupabase(data)

    setAffectations((actuelles) =>
      actuelles.map((affectation) =>
        String(affectation.id) === String(affectationSauvegardee.id)
          ? affectationSauvegardee
          : affectation
      )
    )

    return {
      succes: true,
      affectation: affectationSauvegardee,
      erreurs: [],
    }
  }

  async function supprimerAffectation(idAffectation) {
    const affectationExistante = obtenirAffectationParId(idAffectation)

    if (!affectationExistante) {
      return {
        succes: false,
        affectation: null,
        erreur: 'Affectation introuvable.',
      }
    }

    const dateFin = new Date().toISOString().slice(0, 10)

    const { data, error } = await supabase
      .from('affectations')
      .update({
        active: false,
        date_fin: dateFin,
      })
      .eq('id', idAffectation)
      .select()

    if (error) {
      return {
        succes: false,
        affectation: null,
        erreur: error.message,
      }
    }

    if (!data || data.length === 0) {
      return {
        succes: false,
        affectation: null,
        erreur: "L'affectation n'a pas pu être désactivée.",
      }
    }

    const affectationDesactivee = convertirAffectationDepuisSupabase(data[0])

    setAffectations((actuelles) =>
      actuelles.map((affectation) =>
        String(affectation.id) === String(idAffectation)
          ? affectationDesactivee
          : affectation
      )
    )

    return {
      succes: true,
      affectation: affectationDesactivee,
    }
  }

  async function remplacerAffectationsEquipe(equipeId, nouvellesAffectations) {
    const anciennes = affectations.filter(
      (affectation) =>
        String(affectation.equipeId) === String(equipeId) &&
        affectation.active !== false
    )

    function trouverExistante(nouvelle) {
      // Si l'ID existe réellement dans les affectations chargées,
      // c'est la correspondance la plus fiable.
      if (nouvelle.id) {
        const parId = anciennes.find(
          (ancienne) => String(ancienne.id) === String(nouvelle.id)
        )

        if (parId) {
          return parId
        }
      }

      // Sinon, on retrouve l'affectation par la joueuse.
      return anciennes.find(
        (ancienne) => String(ancienne.joueuseId) === String(nouvelle.joueuseId)
      )
    }

    // --------------------------------------------------
    // 1. Déterminer les affectations qui restent
    // --------------------------------------------------

    const correspondances = nouvellesAffectations.map((nouvelle) => ({
      nouvelle,
      existante: trouverExistante(nouvelle),
    }))

    // --------------------------------------------------
    // 2. Désactiver les joueuses retirées
    // --------------------------------------------------

    const idsConserves = new Set(
      correspondances
        .map(({ existante }) => existante?.id)
        .filter(Boolean)
        .map(String)
    )

    const aDesactiver = anciennes.filter(
      (ancienne) => !idsConserves.has(String(ancienne.id))
    )

    const dateFin = new Date().toISOString().slice(0, 10)

    if (aDesactiver.length > 0) {
      const ids = aDesactiver.map((affectation) => affectation.id)

      const { error } = await supabase
        .from('affectations')
        .update({
          active: false,
          date_fin: dateFin,
        })
        .in('id', ids)

      if (error) {
        return {
          succes: false,
          erreurs: [error.message],
        }
      }
    }

    // --------------------------------------------------
    // 3. Mettre à jour celles qui existaient déjà
    //    et créer seulement les nouvelles
    // --------------------------------------------------

    const affectationsSauvegardees = []

    for (const { nouvelle, existante } of correspondances) {
      if (existante) {
        const affectationModifiee = creerAffectation({
          ...existante,
          ...nouvelle,

          // On conserve impérativement l'ID Supabase
          // de l'affectation existante.
          id: existante.id,

          active: true,
          dateFin: '',
        })

        const donnees = convertirAffectationVersSupabase(affectationModifiee)

        const { data, error } = await supabase
          .from('affectations')
          .update(donnees)
          .eq('id', existante.id)
          .select()

        if (error) {
          return {
            succes: false,
            erreurs: [error.message],
          }
        }

        if (!data || data.length === 0) {
          return {
            succes: false,
            erreurs: [
              `Impossible de mettre à jour l'affectation de la joueuse ${nouvelle.joueuseId}.`,
            ],
          }
        }

        affectationsSauvegardees.push(
          convertirAffectationDepuisSupabase(data[0])
        )

        continue
      }

      // Nouvelle affectation : on ne conserve surtout
      // pas un éventuel ID provenant du formulaire.
      const nouvelleAffectation = creerAffectation({
        ...nouvelle,
        id: undefined,
        active: true,
        dateFin: '',
      })

      const donnees = convertirAffectationVersSupabase(nouvelleAffectation)

      // L'ID doit être généré par la base.
      delete donnees.id

      const { data, error } = await supabase
        .from('affectations')
        .insert(donnees)
        .select()

      if (error) {
        return {
          succes: false,
          erreurs: [error.message],
        }
      }

      if (!data || data.length === 0) {
        return {
          succes: false,
          erreurs: [
            `Impossible de créer l'affectation de la joueuse ${nouvelle.joueuseId}.`,
          ],
        }
      }

      affectationsSauvegardees.push(convertirAffectationDepuisSupabase(data[0]))
    }

    // --------------------------------------------------
    // 4. Synchroniser l'état React
    // --------------------------------------------------

    setAffectations((actuelles) => {
      const horsEquipe = actuelles.filter(
        (affectation) => String(affectation.equipeId) !== String(equipeId)
      )

      const anciennesInactives = aDesactiver.map((affectation) => ({
        ...affectation,
        active: false,
        dateFin,
      }))

      return [...horsEquipe, ...anciennesInactives, ...affectationsSauvegardees]
    })

    return {
      succes: true,
      erreurs: [],
    }
  }

  return {
    affectations,

    chargement,
    erreurChargement,

    ajouterAffectation,
    modifierAffectation,
    supprimerAffectation,
    remplacerAffectationsEquipe,
    obtenirAffectationParId,
  }
}
