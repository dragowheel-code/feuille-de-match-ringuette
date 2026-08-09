import {
  attribuerEnsembleChandail,
  terminerAttributionChandail,
  libererAttributionChandail,
} from "../domain/equipements/attributionsChandails";

import { useEtatPersistant } from "./useEtatPersistant";
import { obtenirBaseDeDonnees } from "../services/baseDeDonneesV2";

export function useGestionAttributionsChandails() {
  const [
    attributionsChandails,
    setAttributionsChandails,
  ] = useEtatPersistant(
    "ringuette-v2-attributions-chandails",
    () => {
      const baseDeDonnees =
        obtenirBaseDeDonnees();

      return Array.isArray(
        baseDeDonnees.attributionsChandails
      )
        ? baseDeDonnees.attributionsChandails
        : [];
    }
  );

  function distribuerEnsemble(formulaire) {
    const resultat =
      attribuerEnsembleChandail(
        formulaire,
        attributionsChandails
      );

    if (!resultat.succes) {
      return resultat;
    }

    setAttributionsChandails(
      (attributionsActuelles) => [
        ...attributionsActuelles,
        resultat.attribution,
      ]
    );

    return resultat;
  }

  function libererEnsemble(
    attributionId,
    donneesLiberation = {}
  ) {
    const attributionExistante =
      attributionsChandails.find(
        (attribution) =>
          String(attribution.id) ===
          String(attributionId)
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

    setAttributionsChandails(
      (attributionsActuelles) =>
        attributionsActuelles.map(
          (attribution) =>
            String(attribution.id) ===
            String(attributionId)
              ? resultat.attribution
              : attribution
        )
    );

    return resultat;
  }

  function retournerEnsemble(
    attributionId,
    donneesRetour = {}
  ) {
    const attributionExistante =
      attributionsChandails.find(
        (attribution) =>
          String(attribution.id) ===
          String(attributionId)
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

    setAttributionsChandails(
      (attributionsActuelles) =>
        attributionsActuelles.map(
          (attribution) =>
            String(attribution.id) ===
            String(attributionId)
              ? attributionTerminee
              : attribution
        )
    );

    return {
      succes: true,
      attribution:
        attributionTerminee,
      erreurs: [],
    };
  }

  function rattacherAffectation(
    attributionId,
    affectationId
  ) {
    const attributionExistante =
      attributionsChandails.find(
        (attribution) =>
          String(attribution.id) ===
          String(attributionId)
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

    const attributionModifiee = {
      ...attributionExistante,

      affectationId:
        affectationId || null,
    };

    setAttributionsChandails(
      (attributionsActuelles) =>
        attributionsActuelles.map(
          (attribution) =>
            String(attribution.id) ===
            String(attributionId)
              ? attributionModifiee
              : attribution
        )
    );

    return {
      succes: true,
      attribution:
        attributionModifiee,
      erreurs: [],
    };
  }

  return {
    attributionsChandails,
    setAttributionsChandails,

    distribuerEnsemble,
    libererEnsemble,
    retournerEnsemble,
    rattacherAffectation,
  };
}