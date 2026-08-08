import {
  creerEnsembleChandails,
  remplacerEnsembleChandails,
  supprimerEnsembleChandails,
  validerEnsembleChandails,
} from "../domain/equipements";
import { useEtatPersistant } from "./useEtatPersistant";
import { obtenirBaseDeDonnees } from "../services/baseDeDonneesV2";

export function useGestionChandails() {
  const [
    ensemblesChandails,
    setEnsemblesChandails,
  ] = useEtatPersistant(
    "ringuette-v2-chandails",
    () => {
      const baseDeDonnees =
        obtenirBaseDeDonnees();

      return Array.isArray(
        baseDeDonnees.chandails
      )
        ? baseDeDonnees.chandails
        : [];
    }
  );
  function ajouterEnsemble(formulaire) {
  const nouvelEnsemble =
    creerEnsembleChandails(formulaire);

  const validation =
    validerEnsembleChandails(
      nouvelEnsemble,
      ensemblesChandails
    );

  if (!validation.valide) {
    return {
      succes: false,
      ensemble: null,
      erreurs: validation.erreurs,
    };
  }

  setEnsemblesChandails(
    (ensemblesActuels) => [
      ...ensemblesActuels,
      nouvelEnsemble,
    ]
  );

  return {
    succes: true,
    ensemble: nouvelEnsemble,
    erreurs: [],
  };
}

  function modifierEnsemble(formulaire) {
  const ensembleExistant =
    ensemblesChandails.find(
      (ensemble) =>
        String(ensemble.id) ===
        String(formulaire.id)
    );

  if (!ensembleExistant) {
    return {
      succes: false,
      ensemble: null,
      erreurs: [
        "L'ensemble de chandails est introuvable.",
      ],
    };
  }

  const ensembleModifie =
    creerEnsembleChandails({
      ...ensembleExistant,
      ...formulaire,
      id: ensembleExistant.id,
    });

  const validation =
    validerEnsembleChandails(
      ensembleModifie,
      ensemblesChandails
    );

  if (!validation.valide) {
    return {
      succes: false,
      ensemble: null,
      erreurs: validation.erreurs,
    };
  }

  setEnsemblesChandails(
    (ensemblesActuels) =>
      remplacerEnsembleChandails(
        ensemblesActuels,
        ensembleExistant.id,
        ensembleModifie
      )
  );

  return {
    succes: true,
    ensemble: ensembleModifie,
    erreurs: [],
  };
}

  function supprimerEnsemble(idEnsemble) {
  const ensembleExistant =
    ensemblesChandails.find(
      (ensemble) =>
        String(ensemble.id) ===
        String(idEnsemble)
    );

  if (!ensembleExistant) {
    return {
      succes: false,
      ensemble: null,
      erreurs: [
        "L'ensemble de chandails est introuvable.",
      ],
    };
  }

  setEnsemblesChandails(
    (ensemblesActuels) =>
      supprimerEnsembleChandails(
        ensemblesActuels,
        idEnsemble
      )
  );

  return {
    succes: true,
    ensemble: ensembleExistant,
    erreurs: [],
  };
}

  return {
    ensemblesChandails,
    ajouterEnsemble,
    modifierEnsemble,
    supprimerEnsemble,
  };
}