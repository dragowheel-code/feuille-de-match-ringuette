export function chargerDepuisStockage(cle, valeurDefaut) {
  const donnees = localStorage.getItem(cle);

  if (!donnees) {
    return valeurDefaut;
  }

  try {
    return JSON.parse(donnees);
  } catch {
    return valeurDefaut;
  }
}
export function sauvegarderDansStockage(cle, valeur) {
  localStorage.setItem(cle, JSON.stringify(valeur));
}