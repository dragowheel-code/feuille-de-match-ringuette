export function creerPenalite({
  libelle,
  code,
  lettre = null,
  duree,
  categorie,
  annulableParBut,
}) {
  return {
    libelle,
    code,
    lettre,
    duree: Number(duree),
    categorie,
    annulableParBut,
  };
}