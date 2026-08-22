import {
  useEffect,
  useState,
} from "react";

import { supabase } from "../services/supabase";

import {
  attribuerEnsembleChandail,
  terminerAttributionChandail,
  libererAttributionChandail,
} from "../domain/equipements/attributionsChandails";

function convertirAttributionDepuisSupabase(
  attribution
) {
  return {
    id:
      attribution.id,

    ensembleId:
      attribution.ensemble_id,

    joueuseId:
      attribution.joueuse_id ?? "",

    saisonId:
      attribution.saison_id ?? "",

    affectationId:
      attribution.affectation_id ??
      null,

    dateAttribution:
      attribution.date_attribution ??
      "",

    dateRetour:
      attribution.date_retour ??
      null,

    active:
      attribution.active === true,

    commentaire:
      attribution.commentaire ?? "",

    typeFin:
      attribution.type_fin ?? null,
  };
}

function convertirAttributionVersSupabase(
  attribution
) {
  return {
    id:
      attribution.id,

    ensemble_id:
      attribution.ensembleId,

    joueuse_id:
      attribution.joueuseId ||
      null,

    saison_id:
      attribution.saisonId ||
      null,

    affectation_id:
      attribution.affectationId ||
      null,

    date_attribution:
      attribution.dateAttribution,

    date_retour:
      attribution.dateRetour ||
      null,

    active:
      attribution.active === true,

    commentaire:
      attribution.commentaire ||
      null,

    type_fin:
      attribution.typeFin ||
      null,
  };
}

export function useGestionAttributionsChandails() {
  const [
    attributionsChandails,
    setAttributionsChandails,
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
    async function chargerAttributions() {
      setChargement(true);
      setErreurChargement(null);

      const {
        data,
        error,
      } = await supabase
        .from(
          "attributions_chandails"
        )
        .select("*")
        .order(
          "date_attribution",
          {
            ascending: false,
          }
        );

      if (error) {
        console.error(
          "Erreur chargement attributions chandails :",
          error
        );

        setErreurChargement(
          error.message
        );

        setChargement(false);
        return;
      }

      setAttributionsChandails(
        (data ?? []).map(
          convertirAttributionDepuisSupabase
        )
      );

      setChargement(false);
    }

    chargerAttributions();
  }, []);

  async function distribuerEnsemble(
    formulaire
  ) {
    const resultat =
      attribuerEnsembleChandail(
        formulaire,
        attributionsChandails
      );

    if (!resultat.succes) {
      return resultat;
    }

    const attribution =
      resultat.attribution;

    const {
      data,
      error,
    } = await supabase
      .from(
        "attributions_chandails"
      )
      .insert(
        convertirAttributionVersSupabase(
          attribution
        )
      )
      .select()
      .single();

    if (error) {
      return {
        succes: false,
        attribution: null,
        erreurs: [
          error.message,
        ],
      };
    }

    const attributionCreee =
      convertirAttributionDepuisSupabase(
        data
      );

    setAttributionsChandails(
      (actuelles) => [
        ...actuelles,
        attributionCreee,
      ]
    );

    return {
      succes: true,
      attribution:
        attributionCreee,
      erreurs: [],
    };
  }

  async function libererEnsemble(
    attributionId,
    donneesLiberation = {}
  ) {
    const attributionExistante =
      attributionsChandails.find(
        (attribution) =>
          String(
            attribution.id
          ) ===
          String(
            attributionId
          )
      );

    if (!attributionExistante) {
      return {
        succes: false,
        attribution: null,
        erreurs: [
          "L'attribution est introuvable.",
        ],
      };
    }

    const resultat =
      libererAttributionChandail(
        attributionExistante,
        donneesLiberation
      );

    if (!resultat.succes) {
      return resultat;
    }

    const attributionLiberee =
      resultat.attribution;

    const {
      data,
      error,
    } = await supabase
      .from(
        "attributions_chandails"
      )
      .update(
        convertirAttributionVersSupabase(
          attributionLiberee
        )
      )
      .eq(
        "id",
        attributionId
      )
      .select()
      .single();

    if (error) {
      return {
        succes: false,
        attribution: null,
        erreurs: [
          error.message,
        ],
      };
    }

    const attributionSauvegardee =
      convertirAttributionDepuisSupabase(
        data
      );

    setAttributionsChandails(
      (actuelles) =>
        actuelles.map(
          (attribution) =>
            String(
              attribution.id
            ) ===
            String(
              attributionId
            )
              ? attributionSauvegardee
              : attribution
        )
    );

    return {
      succes: true,
      attribution:
        attributionSauvegardee,
      erreurs: [],
    };
  }

  async function retournerEnsemble(
    attributionId,
    donneesRetour = {}
  ) {
    const attributionExistante =
      attributionsChandails.find(
        (attribution) =>
          String(
            attribution.id
          ) ===
          String(
            attributionId
          )
      );

    if (!attributionExistante) {
      return {
        succes: false,
        attribution: null,
        erreurs: [
          "L'attribution est introuvable.",
        ],
      };
    }

    const attributionTerminee =
      terminerAttributionChandail(
        attributionExistante,
        donneesRetour
      );

    const attributionRetournee = {
      ...attributionTerminee,

      typeFin:
        "RETOUR",
    };

    const {
      data,
      error,
    } = await supabase
      .from(
        "attributions_chandails"
      )
      .update(
        convertirAttributionVersSupabase(
          attributionRetournee
        )
      )
      .eq(
        "id",
        attributionId
      )
      .select()
      .single();

    if (error) {
      return {
        succes: false,
        attribution: null,
        erreurs: [
          error.message,
        ],
      };
    }

    const attributionSauvegardee =
      convertirAttributionDepuisSupabase(
        data
      );

    setAttributionsChandails(
      (actuelles) =>
        actuelles.map(
          (attribution) =>
            String(
              attribution.id
            ) ===
            String(
              attributionId
            )
              ? attributionSauvegardee
              : attribution
        )
    );

    return {
      succes: true,
      attribution:
        attributionSauvegardee,
      erreurs: [],
    };
  }

  async function rattacherAffectation(
    attributionId,
    affectationId
  ) {
    const attributionExistante =
      attributionsChandails.find(
        (attribution) =>
          String(
            attribution.id
          ) ===
          String(
            attributionId
          )
      );

    if (!attributionExistante) {
      return {
        succes: false,
        attribution: null,
        erreurs: [
          "L'attribution est introuvable.",
        ],
      };
    }

    const {
      data,
      error,
    } = await supabase
      .from(
        "attributions_chandails"
      )
      .update({
        affectation_id:
          affectationId || null,
      })
      .eq(
        "id",
        attributionId
      )
      .select()
      .single();

    if (error) {
      return {
        succes: false,
        attribution: null,
        erreurs: [
          error.message,
        ],
      };
    }

    const attributionSauvegardee =
      convertirAttributionDepuisSupabase(
        data
      );

    setAttributionsChandails(
      (actuelles) =>
        actuelles.map(
          (attribution) =>
            String(
              attribution.id
            ) ===
            String(
              attributionId
            )
              ? attributionSauvegardee
              : attribution
        )
    );

    return {
      succes: true,
      attribution:
        attributionSauvegardee,
      erreurs: [],
    };
  }

  return {
    attributionsChandails,
    setAttributionsChandails,

    chargement,
    erreurChargement,

    distribuerEnsemble,
    libererEnsemble,
    retournerEnsemble,
    rattacherAffectation,
  };
}