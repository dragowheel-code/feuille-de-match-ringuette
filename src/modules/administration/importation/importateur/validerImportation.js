import { ACTIONS_IMPORTATION } from "../previsualisation/actionsImportation";

export function validerImportation(lignes) {
  const erreurs = [];

  for (const ligne of lignes) {
    if (ligne.action === ACTIONS_IMPORTATION.VERIFIER) {
      erreurs.push({
        participante: ligne.participante,
        raison: ligne.raison,
      });
    }
  }

  return {
    valide: erreurs.length === 0,
    erreurs,
  };
}