function normaliser(valeur) {
  return String(valeur ?? "")
    .trim()
    .toLowerCase();
}

export function validerEquipe(
  equipe,
  equipes = []
) {
  const erreurs = [];

  if (!equipe.saisonId?.trim()) {
    erreurs.push(
      "La saison est obligatoire."
    );
  }

  if (!equipe.associationId?.trim()) {
    erreurs.push(
      "L'association est obligatoire."
    );
  }

  if (!equipe.categorie?.trim()) {
    erreurs.push(
      "La catégorie est obligatoire."
    );
  }

  if (!equipe.niveau?.trim()) {
    erreurs.push(
      "Le niveau est obligatoire."
    );
  }

  if (!equipe.abreviation?.trim()) {
    erreurs.push(
      "Le code SportPlus est obligatoire."
    );
  }

  const equipeIdentiqueExiste =
    equipes.some((equipeExistante) => {
      if (
        equipeExistante.id === equipe.id
      ) {
        return false;
      }

      return (
        equipeExistante.saisonId ===
          equipe.saisonId &&
        equipeExistante.associationId ===
          equipe.associationId &&
        normaliser(
          equipeExistante.categorie
        ) ===
          normaliser(equipe.categorie) &&
        normaliser(
          equipeExistante.niveau
        ) ===
          normaliser(equipe.niveau) &&
        normaliser(
          equipeExistante.numeroEquipe
        ) ===
          normaliser(equipe.numeroEquipe)
      );
    });

  if (equipeIdentiqueExiste) {
    erreurs.push(
      "Cette équipe existe déjà pour cette association et cette saison."
    );
  }

  return {
    valide: erreurs.length === 0,
    erreurs,
  };
}