export function obtenirStatutEnsembleChandails(
  ensemble,
  attributionActive = null
) {
  if (attributionActive) {
    return "attribue";
  }

  const etatClair =
    ensemble.clair?.etat ?? "";

  const etatFonce =
    ensemble.fonce?.etat ?? "";

  const clairManquant =
    etatClair === "Manquant";

  const fonceManquant =
    etatFonce === "Manquant";

  if (clairManquant && fonceManquant) {
    return "perdu";
  }

  if (clairManquant || fonceManquant) {
    return "incomplet";
  }

  if (
    etatClair !== "Bon" ||
    etatFonce !== "Bon"
  ) {
    return "attention";
  }

  return "disponible";
}