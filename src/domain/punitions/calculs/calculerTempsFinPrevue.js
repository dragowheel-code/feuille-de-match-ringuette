export function calculerTempsFinPrevue(portions, tempsSortie) {
  return portions.length > 0
    ? portions[portions.length - 1].tempsFinPrevue
    : tempsSortie;
}