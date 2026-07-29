export function detecterSportPlus(document) {
  const lignes = document.feuilles[0].lignes;

  let listeParticipants = false;
  let association = false;
  let enteteNom = false;

  for (const ligne of lignes) {
    const texte = ligne.join(" ");

    if (texte.includes("Liste des participants")) {
      listeParticipants = true;
    }

    if (texte.includes("Association de Ringuette")) {
      association = true;
    }

    if (ligne.includes("Nom")) {
      enteteNom = true;
    }
  }

  return {
    reconnu: listeParticipants && association && enteteNom,
    type: listeParticipants && association && enteteNom
      ? "SPORTPLUS_PARTICIPANTS"
      : null,
  };
}