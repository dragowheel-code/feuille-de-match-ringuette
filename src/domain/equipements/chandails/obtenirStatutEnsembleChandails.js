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
    etatClair === "Perdu" ||
    etatClair === "Retiré";

  const fonceManquant =
    etatFonce === "Perdu" ||
    etatFonce === "Retiré";
    
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