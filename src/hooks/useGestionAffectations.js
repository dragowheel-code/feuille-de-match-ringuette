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

    const { error } = await supabase
      .from('affectations')
      .delete()
      .eq('id', idAffectation)

    if (error) {
      return {
        succes: false,
        affectation: null,
        erreur: error.message,
      }
    }

    setAffectations((actuelles) =>
      actuelles.filter(
        (affectation) => String(affectation.id) !== String(idAffectation)
      )
    )

    return {
      succes: true,
      affectation: affectationExistante,
    }
  }

  async function remplacerAffectationsEquipe(equipeId, nouvellesAffectations) {
    const anciennes = affectations.filter(
      (affectation) =>
        String(affectation.equipeId) === String(equipeId) &&
        affectation.active !== false
    )

    const idsNouvelles = new Set(
      nouvellesAffectations
        .map((affectation) => affectation.id)
        .filter(Boolean)
        .map(String)
    )

    const aDesactiver = anciennes.filter(
      (affectation) => !idsNouvelles.has(String(affectation.id))
    )

    if (aDesactiver.length > 0) {
      const ids = aDesactiver.map((affectation) => affectation.id)

      const { error } = await supabase
        .from('affectations')
        .update({
          active: false,
          date_fin: new Date().toISOString().slice(0, 10),
        })
        .in('id', ids)

      if (error) {
        return {
          succes: false,
          erreurs: [error.message],
        }
      }
    }

    const affectationsSauvegardees = []

    for (const affectation of nouvellesAffectations) {
      if (affectation.id) {
        const donnees = convertirAffectationVersSupabase(
          creerAffectation({
            ...affectation,
            active: true,
            dateFin: '',
          })
        )

        const { data, error } = await supabase
          .from('affectations')
          .update(donnees)
          .eq('id', affectation.id)
          .select()
          .single()

        if (error) {
          return {
            succes: false,
            erreurs: [error.message],
          }
        }

        affectationsSauvegardees.push(convertirAffectationDepuisSupabase(data))
      } else {
        const donnees = convertirAffectationVersSupabase(
          creerAffectation({
            ...affectation,
            active: true,
            dateFin: '',
          })
        )

        const { data, error } = await supabase
          .from('affectations')
          .insert(donnees)
          .select()
          .single()

        if (error) {
          return {
            succes: false,
            erreurs: [error.message],
          }
        }

        affectationsSauvegardees.push(convertirAffectationDepuisSupabase(data))
      }
    }

    setAffectations((actuelles) => {
      const horsEquipe = actuelles.filter(
        (affectation) => String(affectation.equipeId) !== String(equipeId)
      )

      const anciennesInactives = anciennes
        .filter((affectation) =>
          aDesactiver.some(
            (element) => String(element.id) === String(affectation.id)
          )
        )
        .map((affectation) => ({
          ...affectation,
          active: false,
          dateFin: new Date().toISOString().slice(0, 10),
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
