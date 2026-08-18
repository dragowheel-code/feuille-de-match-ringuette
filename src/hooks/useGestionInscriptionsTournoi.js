import {
  creerInscriptionEquipeTournoi,
  creerInscriptionOfficielTournoi,
  supprimerInscriptionTournoi,
  validerInscriptionEquipeTournoi,
  validerInscriptionOfficielTournoi,
} from "../domain/tournois/inscriptions";

import { useEtatPersistant } from "./useEtatPersistant";
import { obtenirBaseDeDonnees } from "../services/baseDeDonneesV2";

export function useGestionInscriptionsTournoi() {
  const [
    inscriptionsEquipesTournoi,
    setInscriptionsEquipesTournoi,
  ] = useEtatPersistant(
    "ringuette-v2-inscriptions-equipes-tournoi",
    () => {
      const base =
        obtenirBaseDeDonnees();

      return Array.isArray(
        base.inscriptionsEquipesTournoi
      )
        ? base.inscriptionsEquipesTournoi
        : [];
    }
  );

  const [
    inscriptionsOfficielsTournoi,
    setInscriptionsOfficielsTournoi,
  ] = useEtatPersistant(
    "ringuette-v2-inscriptions-officiels-tournoi",
    () => {
      const base =
        obtenirBaseDeDonnees();

      return Array.isArray(
        base.inscriptionsOfficielsTournoi
      )
        ? base.inscriptionsOfficielsTournoi
        : [];
    }
  );

  function inscrireEquipe({
    tournoiId,
    equipeId,
  }) {
    const inscription =
      creerInscriptionEquipeTournoi({
        tournoiId,
        equipeId,
      });

    const validation =
      validerInscriptionEquipeTournoi(
        inscription,
        inscriptionsEquipesTournoi
      );

    if (!validation.valide) {
      return {
        succes: false,
        inscription: null,
        erreurs:
          validation.erreurs,
      };
    }

    setInscriptionsEquipesTournoi(
      (actuelles) => [
        ...actuelles,
        inscription,
      ]
    );

    return {
      succes: true,
      inscription,
      erreurs: [],
    };
  }

  function inscrireOfficiel({
    tournoiId,
    officielId,
  }) {
    const inscription =
      creerInscriptionOfficielTournoi({
        tournoiId,
        officielId,
      });

    const validation =
      validerInscriptionOfficielTournoi(
        inscription,
        inscriptionsOfficielsTournoi
      );

    if (!validation.valide) {
      return {
        succes: false,
        inscription: null,
        erreurs:
          validation.erreurs,
      };
    }

    setInscriptionsOfficielsTournoi(
      (actuelles) => [
        ...actuelles,
        inscription,
      ]
    );

    return {
      succes: true,
      inscription,
      erreurs: [],
    };
  }

  function retirerEquipe(
    inscriptionId
  ) {
    const resultat =
      supprimerInscriptionTournoi(
        inscriptionsEquipesTournoi,
        inscriptionId
      );

    if (!resultat.succes) {
      return resultat;
    }

    setInscriptionsEquipesTournoi(
      resultat.inscriptions
    );

    return resultat;
  }

  function retirerOfficiel(
    inscriptionId
  ) {
    const resultat =
      supprimerInscriptionTournoi(
        inscriptionsOfficielsTournoi,
        inscriptionId
      );

    if (!resultat.succes) {
      return resultat;
    }

    setInscriptionsOfficielsTournoi(
      resultat.inscriptions
    );

    return resultat;
  }

  function obtenirEquipesTournoi(
    tournoiId
  ) {
    if (!tournoiId) {
      return [];
    }

    return inscriptionsEquipesTournoi.filter(
      (inscription) =>
        String(
          inscription.tournoiId
        ) ===
        String(tournoiId)
    );
  }

  function obtenirOfficielsTournoi(
    tournoiId
  ) {
    if (!tournoiId) {
      return [];
    }

    return inscriptionsOfficielsTournoi.filter(
      (inscription) =>
        String(
          inscription.tournoiId
        ) ===
        String(tournoiId)
    );
  }

  function equipeEstInscrite({
    tournoiId,
    equipeId,
  }) {
    return inscriptionsEquipesTournoi.some(
      (inscription) =>
        String(
          inscription.tournoiId
        ) ===
          String(tournoiId) &&
        String(
          inscription.equipeId
        ) ===
          String(equipeId)
    );
  }

  function officielEstInscrit({
    tournoiId,
    officielId,
  }) {
    return inscriptionsOfficielsTournoi.some(
      (inscription) =>
        String(
          inscription.tournoiId
        ) ===
          String(tournoiId) &&
        String(
          inscription.officielId
        ) ===
          String(officielId)
    );
  }
function supprimerInscriptionsTournoi(
  tournoiId
) {
  setInscriptionsEquipesTournoi(
    (actuelles) =>
      actuelles.filter(
        (inscription) =>
          String(
            inscription.tournoiId
          ) !== String(tournoiId)
      )
  );

  setInscriptionsOfficielsTournoi(
    (actuelles) =>
      actuelles.filter(
        (inscription) =>
          String(
            inscription.tournoiId
          ) !== String(tournoiId)
      )
  );

  return {
    succes: true,
    erreurs: [],
  };
}
  return {
  inscriptionsEquipesTournoi,
  setInscriptionsEquipesTournoi,

  inscriptionsOfficielsTournoi,
  setInscriptionsOfficielsTournoi,

  inscrireEquipe,
  inscrireOfficiel,

  retirerEquipe,
  retirerOfficiel,

  supprimerInscriptionsTournoi,

  obtenirEquipesTournoi,
  obtenirOfficielsTournoi,

  equipeEstInscrite,
  officielEstInscrit,
};
}