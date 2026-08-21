import {
  TYPES_CONFIGURATION_MATCH,
} from "./typesConfigurationMatch";

export function creerConfigurationMatch({
  typeConfiguration =
    TYPES_CONFIGURATION_MATCH.LOCAL,

  associationLocaleId = "",
  associationVisiteuseId = "",

  tournoiId = "",
} = {}) {
  return {
    typeConfiguration,

    associationLocaleId:
      String(
        associationLocaleId
      ).trim(),

    associationVisiteuseId:
      String(
        associationVisiteuseId
      ).trim(),

    tournoiId:
      String(tournoiId).trim(),
  };
}