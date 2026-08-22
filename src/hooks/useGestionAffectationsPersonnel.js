import {
  useEffect,
  useState,
} from "react";

import { supabase } from "../services/supabase";

import {
  creerAffectationPersonnel,
  validerAffectationPersonnel,
} from "../domain/personnelEquipe/affectations";

function convertirAffectationPersonnelDepuisSupabase(
  affectation
) {
  return {
    id: affectation.id,

    saisonId:
      affectation.saison_id,

    equipeId:
      affectation.equipe_id,

    personnelId:
      affectation.personnel_id,

    role:
      affectation.role ?? "",

    actif:
      affectation.actif !== false,
  };
}

function convertirAffectationPersonnelVersSupabase(
  affectation
) {
  return {
    id:
      affectation.id,

    saison_id:
      affectation.saisonId,

    equipe_id:
      affectation.equipeId,

    personnel_id:
      affectation.personnelId,

    role:
      affectation.role,

    actif:
      affectation.actif !== false,
  };
}

export function useGestionAffectationsPersonnel() {
  const [
    affectationsPersonnel,
    setAffectationsPersonnel,
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
    async function chargerAffectationsPersonnel() {
      setChargement(true);
      setErreurChargement(null);

      const {
        data,
        error,
      } = await supabase
        .from("affectations_personnel")
        .select("*");

      if (error) {
        console.error(
          "Erreur chargement affectations personnel :",
          error
        );

        setErreurChargement(
          error.message
        );

        setChargement(false);
        return;
      }

      setAffectationsPersonnel(
        (data ?? []).map(
          convertirAffectationPersonnelDepuisSupabase
        )
      );

      setChargement(false);
    }

    chargerAffectationsPersonnel();
  }, []);

  function obtenirAffectationParId(
    id
  ) {
    return (
      affectationsPersonnel.find(
        (affectation) =>
          String(
            affectation.id
          ) ===
          String(id)
      ) ?? null
    );
  }

  async function ajouterAffectation(
    formulaire
  ) {
    const affectation =
      creerAffectationPersonnel(
        formulaire
      );

    const validation =
      validerAffectationPersonnel(
        affectation,
        affectationsPersonnel
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
      .from(
        "affectations_personnel"
      )
      .insert(
        convertirAffectationPersonnelVersSupabase(
          affectation
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
      convertirAffectationPersonnelDepuisSupabase(
        data
      );

    setAffectationsPersonnel(
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
      creerAffectationPersonnel({
        ...affectationExistante,
        ...formulaire,
        id:
          affectationExistante.id,
      });

    const validation =
      validerAffectationPersonnel(
        affectationModifiee,
        affectationsPersonnel
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
      .from(
        "affectations_personnel"
      )
      .update(
        convertirAffectationPersonnelVersSupabase(
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
      convertirAffectationPersonnelDepuisSupabase(
        data
      );

    setAffectationsPersonnel(
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
    affectationId
  ) {
    const affectationExistante =
      obtenirAffectationParId(
        affectationId
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

    const {
      error,
    } = await supabase
      .from(
        "affectations_personnel"
      )
      .delete()
      .eq(
        "id",
        affectationId
      );

    if (error) {
      return {
        succes: false,
        affectation: null,
        erreurs: [
          error.message,
        ],
      };
    }

    setAffectationsPersonnel(
      (actuelles) =>
        actuelles.filter(
          (affectation) =>
            String(
              affectation.id
            ) !==
            String(
              affectationId
            )
        )
    );

    return {
      succes: true,
      affectation:
        affectationExistante,
      erreurs: [],
    };
  }

  return {
    affectationsPersonnel,
    setAffectationsPersonnel,

    chargement,
    erreurChargement,

    ajouterAffectation,
    modifierAffectation,
    supprimerAffectation,
  };
}