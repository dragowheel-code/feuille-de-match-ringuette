export function obtenirHistoriqueChandail(
  ensembleId,
  attributions = []
) {
  return attributions
    .filter(
      (attribution) =>
        String(attribution.ensembleId) ===
        String(ensembleId)
    )
    .sort((a, b) =>
      b.dateAttribution.localeCompare(
        a.dateAttribution
      )
    );
}