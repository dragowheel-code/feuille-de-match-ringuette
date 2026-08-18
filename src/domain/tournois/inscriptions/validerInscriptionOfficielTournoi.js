export function validerInscriptionOfficielTournoi(
  inscription,
  inscriptionsExistantes = []
) {
  const erreurs = [];

  if (!inscription.tournoiId) {
    erreurs.push(
      "Le tournoi est obligatoire."
    );
  }

  if (!inscription.officielId) {
    erreurs.push(
      "L'officiel est obligatoire."
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
          existante.officielId
        ) ===
          String(
            inscription.officielId
          )
    );

  if (doublon) {
    erreurs.push(
      "Cet officiel est déjà inscrit au tournoi."
    );
  }

  return {
    valide:
      erreurs.length === 0,
    erreurs,
  };
}