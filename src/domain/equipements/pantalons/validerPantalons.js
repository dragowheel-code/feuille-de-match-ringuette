import {
  TAILLES_PANTALON,
} from "./taillesPantalons";

export function validerPantalons(
  pantalon,
  pantalonsExistants = []
) {
  const erreurs = [];

  if (
    !pantalon.associationId?.trim()
  ) {
    erreurs.push(
      "L'association est obligatoire."
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
    !Number.isInteger(
      pantalon.quantiteStock
    ) ||
    pantalon.quantiteStock < 0
  ) {
    erreurs.push(
      "La quantité en stock doit être un nombre entier positif ou égal à zéro."
    );
  }

  const doublonExiste =
    pantalonsExistants.some(
      (pantalonExistant) =>
        String(
          pantalonExistant.id
        ) !==
          String(pantalon.id) &&
        String(
          pantalonExistant.associationId
        ) ===
          String(
            pantalon.associationId
          ) &&
        pantalonExistant.taille ===
          pantalon.taille &&
        pantalonExistant.actif !==
          false
    );

  if (doublonExiste) {
    erreurs.push(
      "Cette taille existe déjà dans l'inventaire de cette association."
    );
  }

  return {
    valide:
      erreurs.length === 0,

    erreurs,
  };
}