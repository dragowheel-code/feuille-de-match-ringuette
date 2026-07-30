export function remplacerEquipe(
  equipes,
  equipeModifiee
) {
  return equipes.map((equipe) =>
    equipe.id === equipeModifiee.id
      ? equipeModifiee
      : equipe
  );
}