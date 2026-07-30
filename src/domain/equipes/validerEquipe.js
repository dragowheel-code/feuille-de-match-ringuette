export function validerEquipe(equipe, equipes = []) {
  const erreurs = [];

  // Association
  if (!equipe.associationId?.trim()) {
    erreurs.push("L'association est obligatoire.");
  }

  // Nom
  if (!equipe.nom?.trim()) {
    erreurs.push("Le nom de l'équipe est obligatoire.");
  }

  // Abréviation
  if (!equipe.abreviation?.trim()) {
    erreurs.push("L'abréviation est obligatoire.");
  }

  // Calibre
  if (!equipe.calibre?.trim()) {
    erreurs.push("Le calibre est obligatoire.");
  }

  // Nom unique dans la même association et le même calibre
  const nomExiste = equipes.some(
    (e) =>
      e.id !== equipe.id &&
      e.associationId === equipe.associationId &&
      e.calibre.trim().toLowerCase() ===
        equipe.calibre.trim().toLowerCase() &&
      e.nom.trim().toLowerCase() ===
        equipe.nom.trim().toLowerCase()
  );

  if (nomExiste) {
    erreurs.push(
      "Une équipe porte déjà ce nom pour cette association et ce calibre."
    );
  }

  // Abréviation unique dans la même association et le même calibre
  const abreviationExiste = equipes.some(
    (e) =>
      e.id !== equipe.id &&
      e.associationId === equipe.associationId &&
      e.calibre.trim().toLowerCase() ===
        equipe.calibre.trim().toLowerCase() &&
      e.abreviation.trim().toUpperCase() ===
        equipe.abreviation.trim().toUpperCase()
  );

  if (abreviationExiste) {
    erreurs.push(
      "Cette abréviation est déjà utilisée pour cette association et ce calibre."
    );
  }

  return {
    valide: erreurs.length === 0,
    erreurs,
  };
}