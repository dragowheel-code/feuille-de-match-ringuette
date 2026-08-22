export function validerJoueuse(
  joueuse,
  joueuses = [],
  { verifierDoublon = true } = {}
) {
  const erreurs = [];

  if (
    !joueuse.associationId?.trim()
  ) {
    erreurs.push(
      "L'association est obligatoire."
    );
  }

  if (
    !joueuse.nomComplet?.trim()
  ) {
    erreurs.push(
      "Le nom complet est obligatoire."
    );
  }

  if (
    !joueuse.numeroInscription?.trim()
  ) {
    erreurs.push(
      "Le numéro d'inscription est obligatoire."
    );
  }

  if (
    !joueuse.dateNaissance?.trim()
  ) {
    erreurs.push(
      "La date de naissance est obligatoire."
    );
  }

  if (
    !joueuse.sexe?.trim()
  ) {
    erreurs.push(
      "Le sexe est obligatoire."
    );
  }

  if (verifierDoublon) {
  const doublonPotentiel =
    joueuses.some(
      (existante) =>
        String(existante.id) !==
          String(joueuse.id) &&
        String(
          existante.associationId
        ) ===
          String(
            joueuse.associationId
          ) &&
        existante.nomComplet
          ?.trim()
          .toLowerCase() ===
          joueuse.nomComplet
            ?.trim()
            .toLowerCase() &&
        existante.dateNaissance ===
          joueuse.dateNaissance
    );

  if (doublonPotentiel) {
    erreurs.push(
      "Une joueuse ayant le même nom et la même date de naissance existe déjà dans cette association."
    );
  }
}

  return {
    valide:
      erreurs.length === 0,

    erreurs,
  };
}