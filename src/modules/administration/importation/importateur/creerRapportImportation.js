export function creerRapportImportation(actions) {
  return {
    ajoutees: actions.ajouter.length,
    misesAJour: actions.mettreAJour.length,
    ignorees: actions.ignorer.length,
    aVerifier: actions.verifier.length,
    total:
      actions.ajouter.length +
      actions.mettreAJour.length +
      actions.ignorer.length +
      actions.verifier.length,
  };
}