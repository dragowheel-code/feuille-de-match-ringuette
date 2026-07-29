export const ROLES_OFFICIEL = [
  "arbitre",
  "chronometreur",
  "marqueur",
  "operateur30s",
];

export function creerOfficiel({
  id,
  nom,
  arbitre = false,
  chronometreur = false,
  marqueur = false,
  operateur30s = false,
}) {
  return {
    id,
    nom: nom.trim(),
    arbitre,
    chronometreur,
    marqueur,
    operateur30s,
  };
}

export function modifierOfficiel(
  officiels,
  idOfficiel,
  modifications
) {
  return officiels.map((officiel) =>
    String(officiel.id) === String(idOfficiel)
      ? {
          ...officiel,
          ...modifications,
          nom:
            modifications.nom !== undefined
              ? modifications.nom.trim()
              : officiel.nom,
        }
      : officiel
  );
}

export function supprimerOfficiel(
  officiels,
  idOuNomOfficiel
) {
  return officiels.filter(
    (officiel) =>
      String(officiel.id) !== String(idOuNomOfficiel) &&
      officiel.nom !== idOuNomOfficiel
  );
}

export function retirerOfficielDesRoles(
  matchInfo,
  nomOfficiel
) {
  return {
    ...matchInfo,

    arbitre1:
      matchInfo.arbitre1 === nomOfficiel
        ? ""
        : matchInfo.arbitre1,

    arbitre2:
      matchInfo.arbitre2 === nomOfficiel
        ? ""
        : matchInfo.arbitre2,

    chronometreur:
      matchInfo.chronometreur === nomOfficiel
        ? ""
        : matchInfo.chronometreur,

    marqueur:
      matchInfo.marqueur === nomOfficiel
        ? ""
        : matchInfo.marqueur,

    operateur30s:
      matchInfo.operateur30s === nomOfficiel
        ? ""
        : matchInfo.operateur30s,
  };
}

export function remplacerNomOfficielDansRoles(
  matchInfo,
  ancienNom,
  nouveauNom
) {
  return {
    ...matchInfo,

    arbitre1:
      matchInfo.arbitre1 === ancienNom
        ? nouveauNom
        : matchInfo.arbitre1,

    arbitre2:
      matchInfo.arbitre2 === ancienNom
        ? nouveauNom
        : matchInfo.arbitre2,

    chronometreur:
      matchInfo.chronometreur === ancienNom
        ? nouveauNom
        : matchInfo.chronometreur,

    marqueur:
      matchInfo.marqueur === ancienNom
        ? nouveauNom
        : matchInfo.marqueur,

    operateur30s:
      matchInfo.operateur30s === ancienNom
        ? nouveauNom
        : matchInfo.operateur30s,
  };
}