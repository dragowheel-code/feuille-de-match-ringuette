export function obtenirHistoriqueJoueuse(
  joueuseId,
  attributions = []
) {
  return attributions
    .filter(
      (attribution) =>
        String(attribution.joueuseId) ===
        String(joueuseId)
    )
    .sort((a, b) =>
      b.dateAttribution.localeCompare(
        a.dateAttribution
      )
    );
}