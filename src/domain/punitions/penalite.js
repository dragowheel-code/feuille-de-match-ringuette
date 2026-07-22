export function creerPenalite({
  type,
  code,
  duree,
  categorie,
  annulableParBut,
}) {
  return {
    type,
    code,
    duree: Number(duree),
    categorie,
    annulableParBut,
  };
}