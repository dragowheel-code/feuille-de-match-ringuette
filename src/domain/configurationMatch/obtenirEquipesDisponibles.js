import {
  TYPES_CONFIGURATION_MATCH,
} from "./typesConfigurationMatch";

export function obtenirEquipesDisponibles({
  typeConfiguration,

  associationLocaleId = "",
  associationVisiteuseId = "",

  tournoiId = "",

  equipes = [],
  inscriptionsEquipesTournoi = [],
} = {}) {
  if (
    typeConfiguration ===
    TYPES_CONFIGURATION_MATCH.LOCAL
  ) {
    if (!associationLocaleId) {
      return [];
    }

    return equipes.filter(
      (equipe) =>
        String(equipe.associationId) ===
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

    return equipes.filter(
      (equipe) =>
        associationsPermises.has(
          String(equipe.associationId)
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

    const idsEquipesInscrites =
      new Set(
        inscriptionsEquipesTournoi
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
                inscription.equipeId
              )
          )
      );

    return equipes.filter(
      (equipe) =>
        idsEquipesInscrites.has(
          String(equipe.id)
        )
    );
  }

  return [];
}