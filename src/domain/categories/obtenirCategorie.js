import { CATEGORIES } from "./categories";

export function obtenirCategorie(nomCategorie) {
  return CATEGORIES.find(
    (categorie) =>
      categorie.nom === nomCategorie
  );
}