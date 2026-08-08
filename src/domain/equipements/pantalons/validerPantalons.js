import { ETATS_PANTALON } from "./etatsPantalons";
import { TAILLES_PANTALON } from "./taillesPantalons";

export function validerPantalons(
  pantalon,
  pantalonsExistants = []
) {
  const erreurs = [];

  if (!pantalon.associationId?.trim()) {
    erreurs.push(
      "L'association est obligatoire."
    );
  }

  if (!pantalon.numero?.trim()) {
    erreurs.push(
      "Le numéro de pantalon est obligatoire."
    );
  }

  if (!pantalon.taille?.trim()) {
    erreurs.push(
      "La taille est obligatoire."
    );
  } else if (
    !TAILLES_PANTALON.includes(
      pantalon.taille
    )
  ) {
    erreurs.push(
      "La taille du pantalon est invalide."
    );
  }

  if (
    !ETATS_PANTALON.includes(
      pantalon.etat
    )
  ) {
    erreurs.push(
      "L'état du pantalon est invalide."
    );
  }

  
  const doublonExiste =
    pantalonsExistants.some(
      (pantalonExistant) =>
        pantalonExistant.id !== pantalon.id &&
        pantalonExistant.associationId ===
          pantalon.associationId &&
        pantalonExistant.numero ===
          pantalon.numero &&
        pantalonExistant.taille ===
          pantalon.taille
    );

  if (doublonExiste) {
    erreurs.push(
      "Un ensemble de pantalons avec ce numéro et cette taille existe déjà pour cette association."
    );
  }

  return {
    valide: erreurs.length === 0,
    erreurs,
  };
}