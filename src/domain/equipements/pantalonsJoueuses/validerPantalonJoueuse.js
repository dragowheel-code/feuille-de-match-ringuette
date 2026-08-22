export function validerPantalonJoueuse(
  remise
) {
  const erreurs = [];

  if (!remise.joueuseId) {
  erreurs.push(
    "La joueuse est obligatoire."
  );
}

  if (!remise.pantalonId) {
    erreurs.push(
      "La taille de pantalon est obligatoire."
    );
  }

  if (
    !Number.isInteger(
      remise.quantite
    ) ||
    remise.quantite <= 0
  ) {
    erreurs.push(
      "La quantité doit être un nombre entier supérieur à zéro."
    );
  }

  if (!remise.dateRemise) {
    erreurs.push(
      "La date de remise est obligatoire."
    );
  }

  return {
    valide:
      erreurs.length === 0,

    erreurs,
  };
}