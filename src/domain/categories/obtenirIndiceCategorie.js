import { CATEGORIES } from "./categories";

export function obtenirIndiceCategorie(
  nomCategorie
) {
  return CATEGORIES.findIndex(
    (categorie) =>
      categorie.nom === nomCategorie
  );
}