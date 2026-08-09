import {
  creerAffectationPersonnel,
  modifierAffectationPersonnel,
  supprimerAffectationPersonnel,
  validerAffectationPersonnel,
} from "../domain/personnelEquipe/affectations";

import { useEtatPersistant } from "./useEtatPersistant";
import { obtenirBaseDeDonnees } from "../services/baseDeDonneesV2";

export function useGestionAffectationsPersonnel() {
  const [
    affectationsPersonnel,
    setAffectationsPersonnel,
  ] = useEtatPersistant(
    "ringuette-v2-affectations-personnel",
    () => {
      const base =
        obtenirBaseDeDonnees();

      return Array.isArray(
        base.affectationsPersonnel
      )
        ? base.affectationsPersonnel
        : [];
    }
  );

  function ajouterAffectation(
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

    setAffectationsPersonnel(
      (actuelles) => [
        ...actuelles,
        affectation,
      ]
    );

    return {
      succes: true,
      affectation,
      erreurs: [],
    };
  }

  function modifierAffectation(
    formulaire
  ) {
    const resultat =
      modifierAffectationPersonnel(
        affectationsPersonnel,
        formulaire
      );

    if (!resultat.succes) {
      return resultat;
    }

    setAffectationsPersonnel(
      resultat.affectations
    );

    return resultat;
  }

  function supprimerAffectation(
    affectationId
  ) {
    const resultat =
      supprimerAffectationPersonnel(
        affectationsPersonnel,
        affectationId
      );

    if (!resultat.succes) {
      return resultat;
    }

    setAffectationsPersonnel(
      resultat.affectations
    );

    return resultat;
  }

  return {
    affectationsPersonnel,
    setAffectationsPersonnel,

    ajouterAffectation,
    modifierAffectation,
    supprimerAffectation,
  };
}