export function remplacerAffectation(
  affectations,
  affectationModifiee
) {
  return affectations.map((affectation) =>
    affectation.id === affectationModifiee.id
      ? { ...affectationModifiee }
      : affectation
  );
}