const TYPES_AFFECTATION = [
  "NORMALE",
  "SURCLASSEMENT",
  "RETROGRADATION",
  "DEROGATION",
  "PE",
];

export function validerAffectation(
  affectation,
  affectationsExistantes = []
) {
  const erreurs = [];

  if (!affectation.saisonId) {
    erreurs.push(
      "La saison est obligatoire."
    );
  }

  if (!affectation.equipeId) {
    erreurs.push(
      "L'équipe est obligatoire."
    );
  }

  if (!affectation.joueuseId) {
    erreurs.push(
      "La joueuse est obligatoire."
    );
  }

  if (
    !TYPES_AFFECTATION.includes(
      affectation.typeAffectation
    )
  ) {
    erreurs.push(
      "Le type d'affectation est invalide."
    );
  }

  if (
    affectation.dateDebut &&
    affectation.dateFin &&
    affectation.dateDebut >
      affectation.dateFin
  ) {
    erreurs.push(
      "La date de début doit précéder la date de fin."
    );
  }

  const affectationsComparables =
    affectationsExistantes.filter(
      (existante) =>
        String(existante.id) !==
          String(affectation.id) &&
        String(existante.saisonId) ===
          String(affectation.saisonId)
    );

  const affectationPrincipaleExiste =
    affectationsComparables.some(
      (existante) =>
        String(existante.joueuseId) ===
          String(affectation.joueuseId) &&
        existante.active === true &&
        affectation.active === true &&
        existante.typeAffectation !==
          "PE" &&
        affectation.typeAffectation !==
          "PE"
    );

  if (affectationPrincipaleExiste) {
    erreurs.push(
      "Cette joueuse possède déjà une affectation principale active pour cette saison."
    );
  }

  const numeroNormalise =
    String(
      affectation.numero ?? ""
    ).trim();

  if (
    affectation.active &&
    numeroNormalise
  ) {
    const numeroDejaAttribue =
      affectationsComparables.some(
        (existante) =>
          String(existante.equipeId) ===
            String(affectation.equipeId) &&
          existante.active === true &&
          String(
            existante.numero ?? ""
          ).trim() ===
            numeroNormalise
      );

    if (numeroDejaAttribue) {
      erreurs.push(
        "Ce numéro de chandail est déjà attribué dans cette équipe pour cette saison."
      );
    }
  }

  return {
    valide:
      erreurs.length === 0,
    erreurs,
  };
}