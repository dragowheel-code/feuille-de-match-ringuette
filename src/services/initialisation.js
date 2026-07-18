import baseDeDonnees from "../data/baseDeDonnees.json";
import { BASE_VERSION } from "../data/version";

const CLES_BASE = ["equipes", "joueuses", "officiels"];

function contientDesDonnees(cle) {
  try {
    const valeur = JSON.parse(localStorage.getItem(cle));

    return Array.isArray(valeur) && valeur.length > 0;
  } catch {
    return false;
  }
}

export function initialiserBaseOfficielle() {
  const versionLocale = localStorage.getItem("baseVersion");

  // La base officielle a déjà été installée.
  if (versionLocale) {
    return;
  }

  // Préserve une ancienne base importée manuellement.
  const donneesLocalesExistantes =
    CLES_BASE.some(contientDesDonnees);

  if (donneesLocalesExistantes) {
    return;
  }

  if (
    !Array.isArray(baseDeDonnees.equipes) ||
    !Array.isArray(baseDeDonnees.joueuses) ||
    !Array.isArray(baseDeDonnees.officiels)
  ) {
    console.error(
      "La base de données intégrée est invalide."
    );
    return;
  }

  localStorage.setItem(
    "equipes",
    JSON.stringify(baseDeDonnees.equipes)
  );

  localStorage.setItem(
    "joueuses",
    JSON.stringify(baseDeDonnees.joueuses)
  );

  localStorage.setItem(
    "officiels",
    JSON.stringify(baseDeDonnees.officiels)
  );

  localStorage.setItem("baseVersion", BASE_VERSION);

  localStorage.setItem(
    "baseDateInstallation",
    new Date().toISOString()
  );
}