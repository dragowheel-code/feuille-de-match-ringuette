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
    affectation.dateDebut &&
    affectation.dateFin &&
    affectation.dateDebut > affectation.dateFin
  ) {
    erreurs.push(
      "La date de début doit précéder la date de fin."
    );
  }

  if (
    affectation.capitaine &&
    affectation.assistante
  ) {
    erreurs.push(
      "Une joueuse ne peut pas être capitaine et assistante-capitaine dans la même affectation."
    );
  }

  const affectationsComparables =
    affectationsExistantes.filter(
      (affectationExistante) =>
        affectationExistante.id !== affectation.id &&
        affectationExistante.saisonId ===
          affectation.saisonId &&
        affectationExistante.equipeId ===
          affectation.equipeId
    );

  const affectationJoueuseExiste =
    affectationsComparables.some(
      (affectationExistante) =>
        affectationExistante.joueuseId ===
          affectation.joueuseId &&
        affectationExistante.active &&
        affectation.active
    );

  if (affectationJoueuseExiste) {
    erreurs.push(
      "Cette joueuse possède déjà une affectation active dans cette équipe pour cette saison."
    );
  }

  const numeroNormalise = String(
    affectation.numero ?? ""
  ).trim();

  if (
    affectation.active &&
    numeroNormalise
  ) {
    const numeroDejaAttribue =
      affectationsComparables.some(
        (affectationExistante) =>
          affectationExistante.active &&
          String(
            affectationExistante.numero ?? ""
          ).trim() === numeroNormalise
      );

    if (numeroDejaAttribue) {
      erreurs.push(
        "Ce numéro de chandail est déjà attribué dans cette équipe pour cette saison."
      );
    }
  }

  if (
  affectation.active &&
  (
    affectation.capitaine ||
    affectation.assistante
  )
) {
  const nombreLettresExistantes =
    affectationsComparables.filter(
      (affectationExistante) =>
        affectationExistante.active &&
        (
          affectationExistante.capitaine ||
          affectationExistante.assistante
        )
    ).length;

  if (nombreLettresExistantes >= 3) {
    erreurs.push(
      "Cette équipe possède déjà trois joueuses avec une lettre pour cette saison."
    );
  }
}

  return {
    valide: erreurs.length === 0,
    erreurs,
  };
}