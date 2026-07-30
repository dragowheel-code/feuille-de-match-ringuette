export function remplacerAssociation(
  associations,
  associationModifiee
) {
  return associations.map((association) =>
    association.id === associationModifiee.id
      ? associationModifiee
      : association
  );
}