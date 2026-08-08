export function obtenirEnsemblesARetourner(
  ensembles = [],
  attributions = [],
  saisonId
) {
  if (!saisonId) {
    return [];
  }

  const ensemblesAttribues =
    new Set(
      attributions
        .filter(
          (attribution) =>
            attribution.active === true &&
            String(
              attribution.saisonId
            ) === String(saisonId)
        )
        .map(
          (attribution) =>
            String(
              attribution.ensembleId
            )
        )
    );

  return ensembles.filter(
    (ensemble) =>
      ensemblesAttribues.has(
        String(ensemble.id)
      )
  );
}