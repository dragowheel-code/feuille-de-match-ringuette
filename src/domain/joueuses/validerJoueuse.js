export function validerJoueuse(
  joueuse,
  joueuses = []
) {
  const erreurs = [];

  // Association
  if (!joueuse.associationId?.trim()) {
    erreurs.push("L'association est obligatoire.");
  }

  // Équipe
  if (!joueuse.equipeId?.trim()) {
    erreurs.push("L'équipe est obligatoire.");
  }

  // Nom
  if (!joueuse.nomComplet?.trim()) {
    erreurs.push("Le nom complet est obligatoire.");
  }

  // Numéro d'inscription
  if (!joueuse.numeroInscription?.trim()) {
    erreurs.push(
      "Le numéro d'inscription est obligatoire."
    );
  }

  // Nom unique dans la même équipe
  const nomExiste = joueuses.some(
    (j) =>
      j.id !== joueuse.id &&
      j.equipeId === joueuse.equipeId &&
      j.nomComplet.trim().toLowerCase() ===
        joueuse.nomComplet.trim().toLowerCase()
  );

  if (nomExiste) {
    erreurs.push(
      "Une joueuse porte déjà ce nom dans cette équipe."
    );
  }

  // Numéro d'inscription unique
  const numeroExiste = joueuses.some(
    (j) =>
      j.id !== joueuse.id &&
      j.numeroInscription.trim() ===
        joueuse.numeroInscription.trim()
  );

  if (numeroExiste) {
    erreurs.push(
      "Ce numéro d'inscription est déjà utilisé."
    );
  }

  return {
    valide: erreurs.length === 0,
    erreurs,
  };
}