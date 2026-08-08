import baseDeDonneesInitiale from "../data/baseDeDonnees2.json";
import {
  chargerBaseAdministration,
  sauvegarderBaseAdministration,
} from "./persistanceAdministration";

const MODELE_BASE_V2 = {
  version: "2.0.0",
  dateExport: null,
  dateCreation: null,

  associations: [],
  saisons: [],
  equipes: [],
  joueuses: [],
  officiels: [],

  affectations: [],

  chandails: [],
  pantalons: [],
  attributionsChandails: [],
};

function normaliserBaseDeDonnees(base) {
  return {
    ...base,

    associations: Array.isArray(base.associations)
      ? base.associations.map((association) => ({
          ...association,
          active: Boolean(association.active),
        }))
      : [],
      saisons: Array.isArray(base.saisons)
  ? base.saisons
  : [],

equipes: Array.isArray(base.equipes)
  ? base.equipes
  : [],

joueuses: Array.isArray(base.joueuses)
  ? base.joueuses
  : [],

officiels: Array.isArray(base.officiels)
  ? base.officiels
  : [],

affectations: Array.isArray(base.affectations)
  ? base.affectations
  : [],

chandails: Array.isArray(base.chandails)
  ? base.chandails
  : [],

pantalons: Array.isArray(base.pantalons)
  ? base.pantalons
  : [],

attributionsChandails: Array.isArray(
  base.attributionsChandails
)
  ? base.attributionsChandails
  : [],
  };
}

export function creerBaseDeDonnees() {
  const base = structuredClone(MODELE_BASE_V2);

base.dateCreation = new Date().toISOString();

return base;
}

export function obtenirBaseDeDonnees() {
  const baseInitiale =
    normaliserBaseDeDonnees(
      structuredClone(baseDeDonneesInitiale)
    );

  return chargerBaseAdministration(
    baseInitiale
  );
}
export function sauvegarderBaseDeDonnees(base) {
  sauvegarderBaseAdministration(
    normaliserBaseDeDonnees(base)
  );
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
  Array.isArray(base.saisons) &&
  Array.isArray(base.equipes) &&
  Array.isArray(base.joueuses) &&
  Array.isArray(base.officiels) &&
  Array.isArray(base.affectations) &&
  Array.isArray(base.chandails) &&
  Array.isArray(base.pantalons) &&
  Array.isArray(base.attributionsChandails)
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
export function obtenirJoueuses(base) {
  return [...base.joueuses];
}

export function mettreAJourJoueuses(
  base,
  joueuses
) {
  return {
    ...base,
    joueuses: [...joueuses],
  };
}
export function obtenirSaisons(base) {
  return [...base.saisons];
}

export function mettreAJourSaisons(
  base,
  saisons
) {
  return {
    ...base,
    saisons: [...saisons],
  };
}
export function obtenirChandails(base) {
  return Array.isArray(base.chandails)
    ? [...base.chandails]
    : [];
}

export function mettreAJourChandails(
  base,
  chandails
) {
  return {
    ...base,
    chandails: [...chandails],
  };
}
export function obtenirPantalons(base) {
  return [...base.pantalons];
}

export function mettreAJourPantalons(
  base,
  pantalons
) {
  return {
    ...base,
    pantalons: [...pantalons],
  };
}
export function obtenirAffectations(base) {
  return Array.isArray(base.affectations)
    ? [...base.affectations]
    : [];
}

export function mettreAJourAffectations(
  base,
  affectations
) {
  return {
    ...base,
    affectations: [...affectations],
  };
}
export function obtenirAttributionsChandails(
  base
) {
  return [...base.attributionsChandails];
}

export function mettreAJourAttributionsChandails(
  base,
  attributionsChandails
) {
  return {
    ...base,
    attributionsChandails: [
      ...attributionsChandails,
    ],
  };
}
export function construireBaseDeDonnees({
  base,
  associations,
  saisons,
  equipes,
  joueuses,
  officiels,
  affectations,
  chandails,
  pantalons,
  attributionsChandails,
}) {
  return {
  ...base,

  dateExport: new Date().toISOString(),

  associations: [...associations],
  saisons: [...saisons],
  equipes: [...equipes],
  joueuses: [...joueuses],
  officiels: [...officiels],

  affectations: [...affectations],
  chandails: [...chandails],
  pantalons: [...pantalons],

  attributionsChandails: [
    ...attributionsChandails,
  ],
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

  return normaliserBaseDeDonnees(base);
}