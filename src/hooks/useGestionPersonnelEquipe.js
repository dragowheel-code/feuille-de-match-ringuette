import {
  creerPersonnelEquipe,
  modifierPersonnelEquipe,
  supprimerPersonnelEquipe,
  validerPersonnelEquipe,
} from "../domain/personnelEquipe";

import { useEtatPersistant } from "./useEtatPersistant";
import { obtenirBaseDeDonnees } from "../services/baseDeDonneesV2";

export function useGestionPersonnelEquipe() {
  const [
    personnelEquipe,
    setPersonnelEquipe,
  ] = useEtatPersistant(
    "ringuette-v2-personnel-equipe",
    () => {
      const base =
        obtenirBaseDeDonnees();

      return Array.isArray(
        base.personnelEquipe
      )
        ? base.personnelEquipe
        : [];
    }
  );

  function ajouterPersonnel(formulaire) {
    const personnel =
      creerPersonnelEquipe(
        formulaire
      );

    const validation =
      validerPersonnelEquipe(
        personnel,
        personnelEquipe
      );

    if (!validation.valide) {
      return {
        succes: false,
        personnel: null,
        erreurs:
          validation.erreurs,
      };
    }

    setPersonnelEquipe(
      (actuels) => [
        ...actuels,
        personnel,
      ]
    );

    return {
      succes: true,
      personnel,
      erreurs: [],
    };
  }

  function modifierPersonnel(formulaire) {
    const resultat =
      modifierPersonnelEquipe(
        personnelEquipe,
        formulaire
      );

    if (!resultat.succes) {
      return resultat;
    }

    setPersonnelEquipe(
      resultat.personnelEquipe
    );

    return resultat;
  }

  function supprimerPersonnel(
    personnelId
  ) {
    const resultat =
      supprimerPersonnelEquipe(
        personnelEquipe,
        personnelId
      );

    if (!resultat.succes) {
      return resultat;
    }

    setPersonnelEquipe(
      resultat.personnelEquipe
    );

    return resultat;
  }

  function obtenirPersonnelParId(id) {
    return (
      personnelEquipe.find(
        (personnel) =>
          String(personnel.id) ===
          String(id)
      ) ?? null
    );
  }

  function obtenirPersonnelAssociation(
    associationId
  ) {
    if (!associationId) {
      return [];
    }

    return personnelEquipe.filter(
      (personnel) =>
        String(
          personnel.associationId
        ) ===
        String(associationId)
    );
  }

  function obtenirPersonnelActif(
    associationId
  ) {
    if (!associationId) {
      return [];
    }

    return personnelEquipe.filter(
      (personnel) =>
        String(
          personnel.associationId
        ) ===
          String(associationId) &&
        personnel.actif !== false
    );
  }

  return {
    personnelEquipe,
    setPersonnelEquipe,

    ajouterPersonnel,
    modifierPersonnel,
    supprimerPersonnel,

    obtenirPersonnelParId,
    obtenirPersonnelAssociation,
    obtenirPersonnelActif,
  };
}