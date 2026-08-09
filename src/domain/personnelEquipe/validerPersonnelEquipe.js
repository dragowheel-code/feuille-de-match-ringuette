export function validerPersonnelEquipe(
  personnel,
  personnelExistants = []
) {
  const erreurs = [];

  if (!personnel.associationId) {
    erreurs.push(
      "L'association est obligatoire."
    );
  }

  if (!personnel.nomComplet) {
    erreurs.push(
      "Le nom est obligatoire."
    );
  }

  if (
    personnel.courriel &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      personnel.courriel
    )
  ) {
    erreurs.push(
      "Le courriel est invalide."
    );
  }

  const doublonNom =
    personnelExistants.some(
      (existant) =>
        String(existant.id) !==
          String(personnel.id) &&
        String(
          existant.associationId
        ) ===
          String(
            personnel.associationId
          ) &&
        existant.nomComplet
          ?.trim()
          .toLowerCase() ===
          personnel.nomComplet
            .trim()
            .toLowerCase()
    );

  if (doublonNom) {
    erreurs.push(
      "Une personne portant ce nom existe déjà dans cette association."
    );
  }

  return {
    valide: erreurs.length === 0,
    erreurs,
  };
}