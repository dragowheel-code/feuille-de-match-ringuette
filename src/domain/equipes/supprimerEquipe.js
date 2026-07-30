export function supprimerEquipe(
  equipes,
  idEquipe
) {
  return equipes.filter(
    (equipe) => equipe.id !== idEquipe
  );
}