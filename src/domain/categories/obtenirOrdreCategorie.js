import { CATEGORIES } from "./categories";

export function obtenirOrdreCategorie(
  categorie
) {
  const categorieTrouvee =
    CATEGORIES.find(
      (element) =>
        element.nom === categorie
    );

  return categorieTrouvee?.ordre ?? 999;
}