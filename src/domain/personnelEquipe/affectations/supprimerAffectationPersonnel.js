export function supprimerAffectationPersonnel(
  affectationsExistantes = [],
  affectationId
) {
  const affectationExistante =
    affectationsExistantes.find(
      (affectation) =>
        String(affectation.id) ===
        String(affectationId)
    );

  if (!affectationExistante) {
    return {
      succes: false,
      affectation: null,
      affectations: affectationsExistantes,
      erreurs: [
        "L'affectation du personnel est introuvable.",
      ],
    };
  }

  const nouvelleListe =
    affectationsExistantes.filter(
      (affectation) =>
        String(affectation.id) !==
        String(affectationId)
    );

  return {
    succes: true,
    affectation: affectationExistante,
    affectations: nouvelleListe,
    erreurs: [],
  };
}