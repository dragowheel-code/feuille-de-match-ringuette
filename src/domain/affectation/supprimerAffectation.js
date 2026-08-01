export function supprimerAffectation(
  affectations,
  id
) {
  return affectations.filter(
    (affectation) =>
      affectation.id !== id
  );
}