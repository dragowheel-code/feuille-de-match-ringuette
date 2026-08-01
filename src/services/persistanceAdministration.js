const CLE_BASE_ADMINISTRATION =
  "ringuette-administration-v2";

export function chargerBaseAdministration(
  baseParDefaut
) {
  try {
    const contenu = localStorage.getItem(
      CLE_BASE_ADMINISTRATION
    );

    if (!contenu) {
      return structuredClone(baseParDefaut);
    }

    const baseSauvegardee = JSON.parse(contenu);

    return {
      ...structuredClone(baseParDefaut),
      ...baseSauvegardee,
    };
  } catch (erreur) {
    console.error(
      "Impossible de charger la sauvegarde locale.",
      erreur
    );

    return structuredClone(baseParDefaut);
  }
}

export function sauvegarderBaseAdministration(base) {
  try {
    localStorage.setItem(
      CLE_BASE_ADMINISTRATION,
      JSON.stringify(base)
    );
  } catch (erreur) {
    console.error(
      "Impossible de sauvegarder les données.",
      erreur
    );
  }
}

export function effacerSauvegardeAdministration() {
  localStorage.removeItem(
    CLE_BASE_ADMINISTRATION
  );
}