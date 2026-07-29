export function remplacerNomOfficielDansRoles(
  matchInfo,
  ancienNom,
  nouveauNom
) {
  return Object.fromEntries(
    Object.entries(matchInfo).map(([cle, valeur]) => [
      cle,
      valeur === ancienNom ? nouveauNom : valeur,
    ])
  );
}