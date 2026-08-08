export function obtenirAttributionActive(
  ensembleId,
  attributions = []
) {
  return (
    attributions.find(
      (attribution) =>
        String(attribution.ensembleId) ===
          String(ensembleId) &&
        attribution.active === true
    ) ?? null
  );
}