export function obtenirNomEquipe(equipe) {
  if (!equipe) {
    return "";
  }

  const categorie = String(
    equipe.categorie ?? ""
  ).trim();

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
    categorie,
    designation,
  ]
    .filter(Boolean)
    .join(" ");
}