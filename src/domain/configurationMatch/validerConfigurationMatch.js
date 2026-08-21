import {
  TYPES_CONFIGURATION_MATCH,
} from "./typesConfigurationMatch";

export function validerConfigurationMatch(
  configuration
) {
  const erreurs = [];

  if (
    !Object.values(
      TYPES_CONFIGURATION_MATCH
    ).includes(
      configuration.typeConfiguration
    )
  ) {
    erreurs.push(
      "Le type de configuration du match est invalide."
    );
  }

  if (
    configuration.typeConfiguration ===
    TYPES_CONFIGURATION_MATCH.LOCAL
  ) {
    if (
      !configuration.associationLocaleId
    ) {
      erreurs.push(
        "L'association locale est obligatoire."
      );
    }
  }

  if (
    configuration.typeConfiguration ===
    TYPES_CONFIGURATION_MATCH.INTER_ASSOCIATION
  ) {
    if (
      !configuration.associationLocaleId
    ) {
      erreurs.push(
        "L'association locale est obligatoire."
      );
    }

    if (
      !configuration.associationVisiteuseId
    ) {
      erreurs.push(
        "L'association visiteuse est obligatoire."
      );
    }

    if (
      configuration.associationLocaleId &&
      configuration.associationVisiteuseId &&
      String(
        configuration.associationLocaleId
      ) ===
        String(
          configuration.associationVisiteuseId
        )
    ) {
      erreurs.push(
        "Les deux associations doivent être différentes."
      );
    }
  }

  if (
    configuration.typeConfiguration ===
    TYPES_CONFIGURATION_MATCH.TOURNOI
  ) {
    if (!configuration.tournoiId) {
      erreurs.push(
        "Le tournoi est obligatoire."
      );
    }
  }

  return {
    valide:
      erreurs.length === 0,
    erreurs,
  };
}