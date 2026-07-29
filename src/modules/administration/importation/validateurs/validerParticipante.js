function estVide(valeur) {
  return valeur === null ||
         valeur === undefined ||
         String(valeur).trim() === "";
}

export function validerParticipante(participante, index = 0) {
  const erreurs = [];
  const avertissements = [];

  if (estVide(participante.nomComplet)) {
    erreurs.push({
      index,
      participante,
      champ: "nomComplet",
      message: "Nom complet manquant",
    });
  }

  if (estVide(participante.numeroInscription)) {
    erreurs.push({
      index,
      participante,
      champ: "numeroInscription",
      message: "Numéro d'inscription manquant",
    });
  }

  if (estVide(participante.categorie)) {
    erreurs.push({
      index,
      participante,
      champ: "categorie",
      message: "Catégorie manquante",
    });
  }

  if (estVide(participante.saison)) {
    erreurs.push({
      index,
      participante,
      champ: "saison",
      message: "Saison manquante",
    });
  }

  if (estVide(participante.telephone)) {
    avertissements.push({
      index,
      participante,
      champ: "telephone",
      message: "Téléphone manquant",
    });
  }

  return {
    estValide: erreurs.length === 0,
    erreurs,
    avertissements,
  };
}