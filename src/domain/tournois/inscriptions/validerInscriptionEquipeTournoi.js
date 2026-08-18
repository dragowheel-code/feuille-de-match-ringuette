export function validerInscriptionEquipeTournoi(
  inscription,
  inscriptionsExistantes = []
) {
  const erreurs = [];

  if (!inscription.tournoiId) {
    erreurs.push(
      "Le tournoi est obligatoire."
    );
  }

  if (!inscription.equipeId) {
    erreurs.push(
      "L'équipe est obligatoire."
    );
  }

  const doublon =
    inscriptionsExistantes.some(
      (existante) =>
        String(
          existante.tournoiId
        ) ===
          String(
            inscription.tournoiId
          ) &&
        String(
          existante.equipeId
        ) ===
          String(
            inscription.equipeId
          )
    );

  if (doublon) {
    erreurs.push(
      "Cette équipe est déjà inscrite au tournoi."
    );
  }

  return {
    valide:
      erreurs.length === 0,
    erreurs,
  };
}