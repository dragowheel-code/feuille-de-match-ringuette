import { CATEGORIES } from "./categories";
import { obtenirIndiceCategorie } from "./obtenirIndiceCategorie";

export function categorieSuperieure(
  nomCategorie
) {
  const indice =
    obtenirIndiceCategorie(nomCategorie);

  if (indice < 0) {
    return null;
  }

  return (
    CATEGORIES[indice + 1] ?? null
  );
}