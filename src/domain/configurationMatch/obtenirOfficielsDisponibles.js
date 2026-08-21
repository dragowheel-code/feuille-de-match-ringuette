import {
  TYPES_CONFIGURATION_MATCH,
} from "./typesConfigurationMatch";

export function obtenirOfficielsDisponibles({
  typeConfiguration,

  associationLocaleId = "",
  associationVisiteuseId = "",

  tournoiId = "",

  officiels = [],
  inscriptionsOfficielsTournoi = [],
} = {}) {
  if (
    typeConfiguration ===
    TYPES_CONFIGURATION_MATCH.LOCAL
  ) {
    if (!associationLocaleId) {
      return [];
    }

    return officiels.filter(
      (officiel) =>
        officiel.actif !== false &&
        String(officiel.associationId) ===
          String(associationLocaleId)
    );
  }

  if (
    typeConfiguration ===
    TYPES_CONFIGURATION_MATCH.INTER_ASSOCIATION
  ) {
    if (
      !associationLocaleId ||
      !associationVisiteuseId
    ) {
      return [];
    }

    const associationsPermises =
      new Set([
        String(associationLocaleId),
        String(associationVisiteuseId),
      ]);

    return officiels.filter(
      (officiel) =>
        officiel.actif !== false &&
        associationsPermises.has(
          String(
            officiel.associationId
          )
        )
    );
  }

  if (
    typeConfiguration ===
    TYPES_CONFIGURATION_MATCH.TOURNOI
  ) {
    if (!tournoiId) {
      return [];
    }

    const idsOfficielsInscrits =
      new Set(
        inscriptionsOfficielsTournoi
          .filter(
            (inscription) =>
              String(
                inscription.tournoiId
              ) ===
              String(tournoiId)
          )
          .map(
            (inscription) =>
              String(
                inscription.officielId
              )
          )
      );

    return officiels.filter(
      (officiel) =>
        officiel.actif !== false &&
        idsOfficielsInscrits.has(
          String(officiel.id)
        )
    );
  }

  return [];
}