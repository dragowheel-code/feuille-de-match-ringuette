export function remplacerSaison(
  saisons,
  saisonModifiee
) {
  return saisons.map((saison) =>
    saison.id === saisonModifiee.id
      ? { ...saisonModifiee }
      : saison
  );
}