import { ETATS_CHANDAIL } from "./etatsChandails";
import { TAILLES_CHANDAIL } from "./taillesChandails";

export function validerEnsembleChandails(
  ensemble,
  ensemblesExistants = []
) {
  const erreurs = [];

  if (!ensemble.associationId?.trim()) {
    erreurs.push(
      "L'association est obligatoire."
    );
  }

  if (!ensemble.numero?.trim()) {
    erreurs.push(
      "Le numéro de chandail est obligatoire."
    );
  }

  if (!ensemble.taille?.trim()) {
    erreurs.push(
      "La taille est obligatoire."
    );
  } else if (
    !TAILLES_CHANDAIL.includes(
      ensemble.taille
    )
  ) {
    erreurs.push(
      "La taille du chandail est invalide."
    );
  }

  if (
    !ETATS_CHANDAIL.includes(
      ensemble.clair?.etat
    )
  ) {
    erreurs.push(
      "L'état du chandail clair est invalide."
    );
  }

  if (
    !ETATS_CHANDAIL.includes(
      ensemble.fonce?.etat
    )
  ) {
    erreurs.push(
      "L'état du chandail foncé est invalide."
    );
  }

  const doublonExiste =
    ensemblesExistants.some(
      (ensembleExistant) =>
        ensembleExistant.id !== ensemble.id &&
        ensembleExistant.associationId ===
          ensemble.associationId &&
        ensembleExistant.numero ===
          ensemble.numero &&
        ensembleExistant.taille ===
          ensemble.taille
    );

  if (doublonExiste) {
    erreurs.push(
      "Un ensemble de chandails avec ce numéro et cette taille existe déjà pour cette association."
    );
  }

  return {
    valide: erreurs.length === 0,
    erreurs,
  };
}