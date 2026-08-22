import { useEffect, useState } from "react";

import { supabase } from "../services/supabase";

import { creerSaison } from "../domain/saison/creerSaison";
import { validerSaison } from "../domain/saison/validerSaison";

function convertirSaisonDepuisSupabase(saison) {
  return {
    id: saison.id,

    associationId:
      saison.association_id,

    nom:
      saison.nom,

    anneeReference:
      saison.annee_reference,

    dateDebut:
      saison.date_debut ?? "",

    dateFin:
      saison.date_fin ?? "",

    active:
      saison.active === true,

    verrouillee:
      saison.verrouillee === true,

    notes:
      saison.notes ?? "",
  };
}

function convertirSaisonVersSupabase(saison) {
  return {
    id: saison.id,

    association_id:
      saison.associationId,

    nom:
      saison.nom,

    annee_reference:
      Number(
        saison.anneeReference
      ),

    date_debut:
      saison.dateDebut || null,

    date_fin:
      saison.dateFin || null,

    active:
      saison.active === true,

    verrouillee:
      saison.verrouillee === true,

    notes:
      saison.notes || null,
  };
}

export function useGestionSaisons() {
  const [
    saisons,
    setSaisons,
  ] = useState([]);

  const [
    chargement,
    setChargement,
  ] = useState(true);

  const [
    erreurChargement,
    setErreurChargement,
  ] = useState(null);

  useEffect(() => {
    async function chargerSaisons() {
      setChargement(true);
      setErreurChargement(null);

      const {
        data,
        error,
      } = await supabase
        .from("saisons")
        .select("*")
        .order(
          "annee_reference",
          {
            ascending: false,
          }
        );

      if (error) {
        console.error(
          "Erreur chargement saisons :",
          error
        );

        setErreurChargement(
          error.message
        );

        setChargement(false);
        return;
      }

      setSaisons(
        (data ?? []).map(
          convertirSaisonDepuisSupabase
        )
      );

      setChargement(false);
    }

    chargerSaisons();
  }, []);

  function obtenirSaisonParId(
    idSaison
  ) {
    return saisons.find(
      (saison) =>
        String(saison.id) ===
        String(idSaison)
    );
  }

  function obtenirSaisonActive(
    associationId = null
  ) {
    return saisons.find(
      (saison) =>
        saison.active === true &&
        (
          !associationId ||
          String(
            saison.associationId
          ) ===
          String(associationId)
        )
    );
  }

  async function ajouterSaison(
    formulaire
  ) {
    const nouvelleSaison =
      creerSaison(formulaire);

    const validation =
      validerSaison(
        nouvelleSaison,
        saisons
      );

    if (!validation.valide) {
      return {
        succes: false,
        saison: null,
        erreurs:
          validation.erreurs,
      };
    }

    if (nouvelleSaison.active) {
      const {
        error:
          erreurDesactivation,
      } = await supabase
        .from("saisons")
        .update({
          active: false,
        })
        .eq(
          "association_id",
          nouvelleSaison.associationId
        )
        .eq(
          "active",
          true
        );

      if (erreurDesactivation) {
        return {
          succes: false,
          saison: null,
          erreurs: [
            erreurDesactivation.message,
          ],
        };
      }
    }

    const {
      data,
      error,
    } = await supabase
      .from("saisons")
      .insert(
        convertirSaisonVersSupabase(
          nouvelleSaison
        )
      )
      .select()
      .single();

    if (error) {
      return {
        succes: false,
        saison: null,
        erreurs: [
          error.message,
        ],
      };
    }

    const saisonCreee =
      convertirSaisonDepuisSupabase(
        data
      );

    setSaisons(
      (saisonsActuelles) => {
        const saisonsMisesAJour =
          saisonCreee.active
            ? saisonsActuelles.map(
                (saison) =>
                  String(
                    saison.associationId
                  ) ===
                    String(
                      saisonCreee.associationId
                    )
                    ? {
                        ...saison,
                        active: false,
                      }
                    : saison
              )
            : saisonsActuelles;

        return [
          ...saisonsMisesAJour,
          saisonCreee,
        ];
      }
    );

    return {
      succes: true,
      saison:
        saisonCreee,
      erreurs: [],
    };
  }

  async function modifierSaison(
    formulaire
  ) {
    const saisonExistante =
      obtenirSaisonParId(
        formulaire.id
      );

    if (!saisonExistante) {
      return {
        succes: false,
        saison: null,
        erreurs: [
          "Saison introuvable.",
        ],
      };
    }

    if (
      saisonExistante.verrouillee
    ) {
      return {
        succes: false,
        saison: null,
        erreurs: [
          "Une saison verrouillée ne peut pas être modifiée.",
        ],
      };
    }

    const saisonModifiee =
      creerSaison({
        ...saisonExistante,
        ...formulaire,
        id:
          saisonExistante.id,
      });

    const validation =
      validerSaison(
        saisonModifiee,
        saisons
      );

    if (!validation.valide) {
      return {
        succes: false,
        saison: null,
        erreurs:
          validation.erreurs,
      };
    }

    if (saisonModifiee.active) {
      const {
        error:
          erreurDesactivation,
      } = await supabase
        .from("saisons")
        .update({
          active: false,
        })
        .eq(
          "association_id",
          saisonModifiee.associationId
        )
        .eq(
          "active",
          true
        )
        .neq(
          "id",
          saisonModifiee.id
        );

      if (erreurDesactivation) {
        return {
          succes: false,
          saison: null,
          erreurs: [
            erreurDesactivation.message,
          ],
        };
      }
    }

    const {
      data,
      error,
    } = await supabase
      .from("saisons")
      .update(
        convertirSaisonVersSupabase(
          saisonModifiee
        )
      )
      .eq(
        "id",
        saisonModifiee.id
      )
      .select()
      .single();

    if (error) {
      return {
        succes: false,
        saison: null,
        erreurs: [
          error.message,
        ],
      };
    }

    const saisonSauvegardee =
      convertirSaisonDepuisSupabase(
        data
      );

    setSaisons(
      (saisonsActuelles) =>
        saisonsActuelles.map(
          (saison) => {
            if (
              String(saison.id) ===
              String(
                saisonSauvegardee.id
              )
            ) {
              return saisonSauvegardee;
            }

            if (
              saisonSauvegardee.active &&
              String(
                saison.associationId
              ) ===
                String(
                  saisonSauvegardee.associationId
                )
            ) {
              return {
                ...saison,
                active: false,
              };
            }

            return saison;
          }
        )
    );

    return {
      succes: true,
      saison:
        saisonSauvegardee,
      erreurs: [],
    };
  }

  async function supprimerSaison(
    idSaison
  ) {
    const saisonExistante =
      obtenirSaisonParId(
        idSaison
      );

    if (!saisonExistante) {
      return {
        succes: false,
        saison: null,
        erreur:
          "Saison introuvable.",
      };
    }

    if (
      saisonExistante.verrouillee
    ) {
      return {
        succes: false,
        saison: null,
        erreur:
          "Une saison verrouillée ne peut pas être supprimée.",
      };
    }

    const {
      error,
    } = await supabase
      .from("saisons")
      .delete()
      .eq(
        "id",
        idSaison
      );

    if (error) {
      return {
        succes: false,
        saison: null,
        erreur:
          error.message,
      };
    }

    setSaisons(
      (saisonsActuelles) =>
        saisonsActuelles.filter(
          (saison) =>
            String(saison.id) !==
            String(idSaison)
        )
    );

    return {
      succes: true,
      saison:
        saisonExistante,
    };
  }

  return {
    saisons,

    chargement,
    erreurChargement,

    ajouterSaison,
    modifierSaison,
    supprimerSaison,

    obtenirSaisonParId,
    obtenirSaisonActive,
  };
}