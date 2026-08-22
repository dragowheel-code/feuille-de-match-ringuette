import {
  useEffect,
  useState,
} from "react";

import { supabase } from "../services/supabase";

import { creerAffectation } from "../domain/affectation/creerAffectation";
import { validerAffectation } from "../domain/affectation/validerAffectation";

function convertirAffectationDepuisSupabase(
  affectation
) {
  return {
    id: affectation.id,

    saisonId:
      affectation.saison_id,

    equipeId:
      affectation.equipe_id,

    joueuseId:
      affectation.joueuse_id,

    numero:
      affectation.numero ?? "",

    typeAffectation:
      affectation.type_affectation ??
      "NORMALE",

    dateDebut:
      affectation.date_debut ?? "",

    dateFin:
      affectation.date_fin ?? "",

    active:
      affectation.active !== false,

    notes:
      affectation.notes ?? "",
  };
}

function convertirAffectationVersSupabase(
  affectation
) {
  return {
    id:
      affectation.id,

    saison_id:
      affectation.saisonId,

    equipe_id:
      affectation.equipeId,

    joueuse_id:
      affectation.joueuseId,

    numero:
      affectation.numero ?? "",

    type_affectation:
      affectation.typeAffectation ??
      "NORMALE",

    date_debut:
      affectation.dateDebut || null,

    date_fin:
      affectation.dateFin || null,

    active:
      affectation.active !== false,

    notes:
      affectation.notes || null,
  };
}

export function useGestionAffectations() {
  const [
    affectations,
    setAffectations,
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
    async function chargerAffectations() {
      setChargement(true);
      setErreurChargement(null);

      const {
        data,
        error,
      } = await supabase
        .from("affectations")
        .select("*");

      if (error) {
        console.error(
          "Erreur chargement affectations :",
          error
        );

        setErreurChargement(
          error.message
        );

        setChargement(false);
        return;
      }

      setAffectations(
        (data ?? []).map(
          convertirAffectationDepuisSupabase
        )
      );

      setChargement(false);
    }

    chargerAffectations();
  }, []);

  function obtenirAffectationParId(
    idAffectation
  ) {
    return affectations.find(
      (affectation) =>
        String(affectation.id) ===
        String(idAffectation)
    );
  }

  async function ajouterAffectation(
    formulaire
  ) {
    const nouvelleAffectation =
      creerAffectation(formulaire);

    const validation =
      validerAffectation(
        nouvelleAffectation,
        affectations
      );

    if (!validation.valide) {
      return {
        succes: false,
        affectation: null,
        erreurs:
          validation.erreurs,
      };
    }

    const {
      data,
      error,
    } = await supabase
      .from("affectations")
      .insert(
        convertirAffectationVersSupabase(
          nouvelleAffectation
        )
      )
      .select()
      .single();

    if (error) {
      return {
        succes: false,
        affectation: null,
        erreurs: [
          error.message,
        ],
      };
    }

    const affectationCreee =
      convertirAffectationDepuisSupabase(
        data
      );

    setAffectations(
      (actuelles) => [
        ...actuelles,
        affectationCreee,
      ]
    );

    return {
      succes: true,
      affectation:
        affectationCreee,
      erreurs: [],
    };
  }

  async function modifierAffectation(
    formulaire
  ) {
    const affectationExistante =
      obtenirAffectationParId(
        formulaire.id
      );

    if (!affectationExistante) {
      return {
        succes: false,
        affectation: null,
        erreurs: [
          "Affectation introuvable.",
        ],
      };
    }

    const affectationModifiee =
      creerAffectation({
        ...affectationExistante,
        ...formulaire,
        id:
          affectationExistante.id,
      });

    const validation =
      validerAffectation(
        affectationModifiee,
        affectations
      );

    if (!validation.valide) {
      return {
        succes: false,
        affectation: null,
        erreurs:
          validation.erreurs,
      };
    }

    const {
      data,
      error,
    } = await supabase
      .from("affectations")
      .update(
        convertirAffectationVersSupabase(
          affectationModifiee
        )
      )
      .eq(
        "id",
        affectationModifiee.id
      )
      .select()
      .single();

    if (error) {
      return {
        succes: false,
        affectation: null,
        erreurs: [
          error.message,
        ],
      };
    }

    const affectationSauvegardee =
      convertirAffectationDepuisSupabase(
        data
      );

    setAffectations(
      (actuelles) =>
        actuelles.map(
          (affectation) =>
            String(
              affectation.id
            ) ===
            String(
              affectationSauvegardee.id
            )
              ? affectationSauvegardee
              : affectation
        )
    );

    return {
      succes: true,
      affectation:
        affectationSauvegardee,
      erreurs: [],
    };
  }

  async function supprimerAffectation(
    idAffectation
  ) {
    const affectationExistante =
      obtenirAffectationParId(
        idAffectation
      );

    if (!affectationExistante) {
      return {
        succes: false,
        affectation: null,
        erreur:
          "Affectation introuvable.",
      };
    }

    const {
      error,
    } = await supabase
      .from("affectations")
      .delete()
      .eq(
        "id",
        idAffectation
      );

    if (error) {
      return {
        succes: false,
        affectation: null,
        erreur:
          error.message,
      };
    }

    setAffectations(
      (actuelles) =>
        actuelles.filter(
          (affectation) =>
            String(
              affectation.id
            ) !==
            String(idAffectation)
        )
    );

    return {
      succes: true,
      affectation:
        affectationExistante,
    };
  }

  async function remplacerAffectationsEquipe(
    equipeId,
    nouvellesAffectations
  ) {
    const anciennes =
      affectations.filter(
        (affectation) =>
          String(
            affectation.equipeId
          ) ===
          String(equipeId)
      );

    if (anciennes.length > 0) {
      const {
        error: erreurSuppression,
      } = await supabase
        .from("affectations")
        .delete()
        .eq(
          "equipe_id",
          equipeId
        );

      if (erreurSuppression) {
        return {
          succes: false,
          erreurs: [
            erreurSuppression.message,
          ],
        };
      }
    }

    if (
      nouvellesAffectations.length >
      0
    ) {
      const donnees =
        nouvellesAffectations.map(
          (affectation) =>
            convertirAffectationVersSupabase(
              creerAffectation(
                affectation
              )
            )
        );

      const {
        data,
        error,
      } = await supabase
        .from("affectations")
        .insert(donnees)
        .select();

      if (error) {
        return {
          succes: false,
          erreurs: [
            error.message,
          ],
        };
      }

      const nouvelles =
        (data ?? []).map(
          convertirAffectationDepuisSupabase
        );

      setAffectations(
        (actuelles) => [
          ...actuelles.filter(
            (affectation) =>
              String(
                affectation.equipeId
              ) !==
              String(equipeId)
          ),
          ...nouvelles,
        ]
      );

      return {
        succes: true,
        erreurs: [],
      };
    }

    setAffectations(
      (actuelles) =>
        actuelles.filter(
          (affectation) =>
            String(
              affectation.equipeId
            ) !==
            String(equipeId)
        )
    );

    return {
      succes: true,
      erreurs: [],
    };
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
  };
}