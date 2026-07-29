import { ACTIONS_IMPORTATION } from "../previsualisation/actionsImportation";

export function appliquerActionsImportation(lignes) {
  return {
    ajouter: lignes.filter(
      (l) => l.action === ACTIONS_IMPORTATION.AJOUTER
    ),

    mettreAJour: lignes.filter(
      (l) => l.action === ACTIONS_IMPORTATION.METTRE_A_JOUR
    ),

    ignorer: lignes.filter(
      (l) => l.action === ACTIONS_IMPORTATION.IGNORER
    ),

    verifier: lignes.filter(
      (l) => l.action === ACTIONS_IMPORTATION.VERIFIER
    ),
  };
}