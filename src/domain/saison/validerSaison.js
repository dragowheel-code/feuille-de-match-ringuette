export function validerSaison(
  saison,
  saisonsExistantes = []
) {
  const erreurs = [];

  if (!saison.nom?.trim()) {
    erreurs.push(
      "Le nom de la saison est obligatoire."
    );
  }

  if (!saison.dateDebut) {
    erreurs.push(
      "La date de début est obligatoire."
    );
  }

  if (!saison.dateFin) {
    erreurs.push(
      "La date de fin est obligatoire."
    );
  }

  if (
    saison.dateDebut &&
    saison.dateFin &&
    saison.dateDebut > saison.dateFin
  ) {
    erreurs.push(
      "La date de début doit précéder la date de fin."
    );
  }

  const nomNormalise = saison.nom
    ?.trim()
    .toLowerCase();

  const nomExiste = saisonsExistantes.some(
    (saisonExistante) =>
      saisonExistante.id !== saison.id &&
      saisonExistante.nom
        ?.trim()
        .toLowerCase() === nomNormalise
  );

  if (nomExiste) {
    erreurs.push(
      "Une saison porte déjà ce nom."
    );
  }

  return {
    valide: erreurs.length === 0,
    erreurs,
  };
}