export function remplacerEnsembleChandails(
  ensembles,
  id,
  modifications
) {
  return ensembles.map((ensemble) =>
    String(ensemble.id) === String(id)
      ? {
          ...ensemble,
          ...modifications,
        }
      : ensemble
  );
}