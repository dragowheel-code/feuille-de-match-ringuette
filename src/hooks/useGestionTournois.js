import {
  creerTournoi,
  modifierTournoi,
  supprimerTournoi,
  validerTournoi,
} from "../domain/tournois";

import { useEtatPersistant } from "./useEtatPersistant";
import { obtenirBaseDeDonnees } from "../services/baseDeDonneesV2";

export function useGestionTournois() {
  const [
    tournois,
    setTournois,
  ] = useEtatPersistant(
    "ringuette-v2-tournois",
    () => {
      const base =
        obtenirBaseDeDonnees();

      return Array.isArray(
        base.tournois
      )
        ? base.tournois
        : [];
    }
  );

  function ajouterTournoi(
    formulaire
  ) {
    const tournoi =
      creerTournoi(
        formulaire
      );

    const validation =
      validerTournoi(
        tournoi,
        tournois
      );

    if (!validation.valide) {
      return {
        succes: false,
        tournoi: null,
        erreurs:
          validation.erreurs,
      };
    }

    setTournois(
      (actuels) => [
        ...actuels,
        tournoi,
      ]
    );

    return {
      succes: true,
      tournoi,
      erreurs: [],
    };
  }

  function modifierTournoiExistant(
    formulaire
  ) {
    const resultat =
      modifierTournoi(
        tournois,
        formulaire
      );

    if (!resultat.succes) {
      return resultat;
    }

    setTournois(
      resultat.tournois
    );

    return resultat;
  }

  function supprimerTournoiExistant(
    tournoiId
  ) {
    const resultat =
      supprimerTournoi(
        tournois,
        tournoiId
      );

    if (!resultat.succes) {
      return resultat;
    }

    setTournois(
      resultat.tournois
    );

    return resultat;
  }

  function obtenirTournoiParId(
    tournoiId
  ) {
    return (
      tournois.find(
        (tournoi) =>
          String(tournoi.id) ===
          String(tournoiId)
      ) ?? null
    );
  }

  function obtenirTournoisAssociation(
    associationId
  ) {
    if (!associationId) {
      return [];
    }

    return tournois.filter(
      (tournoi) =>
        String(
          tournoi.associationOrganisatriceId
        ) ===
        String(associationId)
    );
  }

  function obtenirTournoisSaison(
    saisonId
  ) {
    if (!saisonId) {
      return [];
    }

    return tournois.filter(
      (tournoi) =>
        String(
          tournoi.saisonId
        ) ===
        String(saisonId)
    );
  }

  function obtenirTournoisActifs({
    associationId,
    saisonId,
  } = {}) {
    return tournois.filter(
      (tournoi) => {
        if (
          tournoi.actif === false
        ) {
          return false;
        }

        if (
          associationId &&
          String(
            tournoi.associationOrganisatriceId
          ) !==
            String(
              associationId
            )
        ) {
          return false;
        }

        if (
          saisonId &&
          String(
            tournoi.saisonId
          ) !==
            String(saisonId)
        ) {
          return false;
        }

        return true;
      }
    );
  }

  return {
    tournois,
    setTournois,

    ajouterTournoi,
    modifierTournoi:
      modifierTournoiExistant,
    supprimerTournoi:
      supprimerTournoiExistant,

    obtenirTournoiParId,
    obtenirTournoisAssociation,
    obtenirTournoisSaison,
    obtenirTournoisActifs,
  };
}