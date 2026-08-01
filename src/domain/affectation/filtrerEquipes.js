export function filtrerEquipes({
  equipes,
  associationId,
}) {
  if (!associationId) {
    return [];
  }

  return equipes.filter(
    (equipe) =>
      String(equipe.associationId) ===
      String(associationId)
  );
}