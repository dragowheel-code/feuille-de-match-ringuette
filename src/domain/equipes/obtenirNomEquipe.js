import { obtenirCategorieParCode } from "../categories/obtenirCategorie";

export function obtenirNomEquipe(equipe) {
  if (!equipe) {
    return "";
  }

  const codeCategorie = String(
    equipe.categorie ?? ""
  ).trim();

  const categorie =
    obtenirCategorieParCode(
      codeCategorie
    );

  const nomCategorie =
    categorie?.nom ?? codeCategorie;

  const niveau = String(
    equipe.niveau ?? ""
  ).trim();

  const numeroEquipe = String(
    equipe.numeroEquipe ?? ""
  ).trim();

  const designation = [
    niveau,
    numeroEquipe,
  ]
    .filter(Boolean)
    .join("");

  return [
    nomCategorie,
    designation,
  ]
    .filter(Boolean)
    .join(" ");
}