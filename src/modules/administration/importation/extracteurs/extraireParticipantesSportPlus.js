function nettoyer(valeur) {
  return String(valeur ?? "").trim();
}

export function extraireParticipantesSportPlus(section) {
  const participantes = [];

  let ligneEntete = -1;

  for (let i = 0; i < section.lignes.length; i++) {
    if (section.lignes[i].includes("Nom")) {
      ligneEntete = i;
      break;
    }
  }

  if (ligneEntete === -1) {
    return participantes;
  }

  const entetes = section.lignes[ligneEntete].map(nettoyer);

  for (let i = ligneEntete + 1; i < section.lignes.length; i++) {
    const ligne = section.lignes[i];

    const nom = nettoyer(ligne[2]);

    if (!nom) {
      continue;
    }

    if (nom.startsWith("Total de participants")) {
      break;
    }

    const participante = {
      categorie: section.categorie,
      codeCategorie: section.code,
      saison: section.saison,
    };

    entetes.forEach((entete, index) => {
      if (!entete) {
        return;
      }

      participante[entete] = nettoyer(ligne[index]);
    });

    participantes.push(participante);
  }

  return participantes;
}