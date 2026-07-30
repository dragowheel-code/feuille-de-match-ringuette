import baseDeDonneesInitiale from "../data/baseDeDonnees2.json";

const MODELE_BASE_V2 = {
  version: "2.0.0",
  dateExport: null,
  dateCreation: null,

  associations: [],
  equipes: [],
  joueuses: [],
  officiels: [],
};

export function creerBaseDeDonnees() {
  const base = structuredClone(MODELE_BASE_V2);

base.dateCreation = new Date().toISOString();

return base;
}

export function obtenirBaseDeDonnees() {
  return structuredClone(baseDeDonneesInitiale);
}

export function validerBaseDeDonnees(base) {
  if (!base || typeof base !== "object") {
    return false;
  }

  if (base.version !== "2.0.0") {
    return false;
  }

  return (
    Array.isArray(base.associations) &&
    Array.isArray(base.equipes) &&
    Array.isArray(base.joueuses) &&
    Array.isArray(base.officiels)
  );
}

export function obtenirAssociations(base) {
  return [...base.associations];
}

export function mettreAJourAssociations(
  base,
  associations
) {
  return {
    ...base,
    associations: [...associations],
  };
}
export function obtenirEquipes(base) {
  return [...base.equipes];
}

export function mettreAJourEquipes(
  base,
  equipes
) {
  return {
    ...base,
    equipes: [...equipes],
  };
}
export function construireBaseDeDonnees({
  base,
  associations,
  equipes,
  joueuses,
  officiels,
}) {
  return {
    ...base,

    dateExport: new Date().toISOString(),

    associations: [...associations],
    equipes: [...equipes],
    joueuses: [...joueuses],
    officiels: [...officiels],
  };
}

export function exporterBaseDeDonnees(base) {
  const contenu = JSON.stringify(base, null, 2);

  const fichier = new Blob(
    [contenu],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(fichier);

  const lien = document.createElement("a");

  lien.href = url;
  lien.download = `RinguetteDB-V2-${new Date()
    .toISOString()
    .slice(0, 10)}.json`;

  document.body.appendChild(lien);
  lien.click();
  lien.remove();

  URL.revokeObjectURL(url);
}
export async function importerBaseDeDonnees(fichier) {
  const contenu = await fichier.text();

  const base = JSON.parse(contenu);

  if (!validerBaseDeDonnees(base)) {
    throw new Error(
      "Le fichier ne contient pas une base de données valide."
    );
  }

  return base;
}