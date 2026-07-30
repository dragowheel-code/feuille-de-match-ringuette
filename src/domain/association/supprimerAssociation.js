export function supprimerAssociation(associations, idAssociation) {
  return associations.filter(
    (association) => association.id !== idAssociation
  );
}