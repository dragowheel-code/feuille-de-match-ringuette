export function validerTournoi(
  tournoi,
  tournoisExistants = []
) {
  const erreurs = [];

  if (!tournoi.nom) {
    erreurs.push(
      "Le nom du tournoi est obligatoire."
    );
  }

  if (!tournoi.saisonId) {
    erreurs.push(
      "La saison du tournoi est obligatoire."
    );
  }

  if (
    !tournoi.associationOrganisatriceId
  ) {
    erreurs.push(
      "L'association organisatrice est obligatoire."
    );
  }

  if (!tournoi.dateDebut) {
    erreurs.push(
      "La date de début est obligatoire."
    );
  }

  if (!tournoi.dateFin) {
    erreurs.push(
      "La date de fin est obligatoire."
    );
  }

  if (
    tournoi.dateDebut &&
    tournoi.dateFin &&
    tournoi.dateFin <
      tournoi.dateDebut
  ) {
    erreurs.push(
      "La date de fin ne peut pas précéder la date de début."
    );
  }

  const doublon =
    tournoisExistants.some(
      (tournoiExistant) =>
        String(
          tournoiExistant.id
        ) !== String(tournoi.id) &&
        String(
          tournoiExistant.saisonId
        ) ===
          String(
            tournoi.saisonId
          ) &&
        String(
          tournoiExistant.associationOrganisatriceId
        ) ===
          String(
            tournoi.associationOrganisatriceId
          ) &&
        tournoiExistant.nom
          .trim()
          .toLocaleLowerCase(
            "fr-CA"
          ) ===
          tournoi.nom
            .trim()
            .toLocaleLowerCase(
              "fr-CA"
            )
    );

  if (doublon) {
    erreurs.push(
      "Un tournoi portant ce nom existe déjà pour cette association et cette saison."
    );
  }

  return {
    valide:
      erreurs.length === 0,
    erreurs,
  };
}