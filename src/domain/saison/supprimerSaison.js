export function supprimerSaison(
  saisons,
  id
) {
  return saisons.filter(
    (saison) => saison.id !== id
  );
}