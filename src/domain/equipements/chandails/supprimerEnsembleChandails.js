export function supprimerEnsembleChandails(
  ensembles,
  id
) {
  return ensembles.filter(
    (ensemble) =>
      String(ensemble.id) !== String(id)
  );
}