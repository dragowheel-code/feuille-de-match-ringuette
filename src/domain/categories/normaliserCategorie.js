export function normaliserCategorie(categorie = "") {
  const valeur = categorie.trim();

  if (
    valeur.toLowerCase() === "intermédiaire" ||
    valeur.toLowerCase() === "intermediaire"
  ) {
    return "Inter";
  }

  return valeur;
}