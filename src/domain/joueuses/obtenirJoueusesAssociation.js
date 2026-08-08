export function obtenirJoueusesAssociation(
  joueuses = [],
  associationId
) {
  return joueuses
    .filter(
      (joueuse) =>
        String(joueuse.associationId) ===
        String(associationId) &&
        joueuse.active !== false
    )
    .sort((a, b) =>
      a.nomComplet.localeCompare(
        b.nomComplet,
        "fr-CA"
      )
    );
}