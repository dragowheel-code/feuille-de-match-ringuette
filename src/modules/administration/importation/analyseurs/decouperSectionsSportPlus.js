function obtenirTexteLigne(ligne) {
  return ligne
    .map((cellule) => String(cellule ?? "").trim())
    .filter(Boolean)
    .join(" ");
}

function extraireInformationsGroupe(texte) {
  const correspondance = texte.match(
    /\(\s*([^-()]+-[^-()]+-[^-()]+)\s*-\s*(.+?)\s+(\d{4}-\d{4})\s*\)/
  );

  if (!correspondance) {
    return null;
  }

  return {
    code: correspondance[1].trim(),
    categorie: correspondance[2].trim(),
    saison: correspondance[3].trim(),
  };
}

export function decouperSectionsSportPlus(document) {
  const premiereFeuille = document?.feuilles?.[0];

  if (!premiereFeuille) {
    return [];
  }

  const sections = [];
  let sectionCourante = null;

  premiereFeuille.lignes.forEach((ligne, index) => {
    const texte = obtenirTexteLigne(ligne);
    const informationsGroupe = extraireInformationsGroupe(texte);

    if (informationsGroupe) {
      if (sectionCourante) {
        sections.push(sectionCourante);
      }

      sectionCourante = {
        ...informationsGroupe,
        ligneDebut: index,
        ligneFin: null,
        lignes: [],
      };

      return;
    }

    if (!sectionCourante) {
      return;
    }

    if (
      texte.includes("Total de participants à l`activité") ||
      texte.includes("Total de participants à l'activité")
    ) {
      sectionCourante.ligneFin = index;
      sections.push(sectionCourante);
      sectionCourante = null;
      return;
    }

    sectionCourante.lignes.push(ligne);
  });

  if (sectionCourante) {
    sectionCourante.ligneFin =
      premiereFeuille.lignes.length - 1;

    sections.push(sectionCourante);
  }

  return sections;
}