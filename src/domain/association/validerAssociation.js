export function validerAssociation(association, associations = []) {
  const erreurs = [];

  // Nom
  if (!association.nom?.trim()) {
    erreurs.push("Le nom de l'association est obligatoire.");
  }

  // Code
  if (!association.code?.trim()) {
    erreurs.push("Le code est obligatoire.");
  }

  // Abréviation
  if (!association.abreviation?.trim()) {
    erreurs.push("L'abréviation est obligatoire.");
  }

  // Ville
  if (!association.ville?.trim()) {
    erreurs.push("La ville est obligatoire.");
  }

  // Nom des équipes
  if (!association.nomEquipes?.trim()) {
    erreurs.push("Le nom des équipes est obligatoire.");
  }

  // Couleur Fonce
  if (!association.couleurFonce) {
    erreurs.push("La couleur principale est obligatoire.");
  }

  // Couleur Clair
  if (!association.couleurClair) {
    erreurs.push("La couleur secondaire est obligatoire.");
  }

  // Nom unique
  const nomExiste = associations.some(
    (a) =>
      a.id !== association.id &&
      a.nom.trim().toLowerCase() ===
        association.nom.trim().toLowerCase()
  );

  if (nomExiste) {
    erreurs.push("Une association porte déjà ce nom.");
  }

  // Code unique
  const codeExiste = associations.some(
    (a) =>
      a.id !== association.id &&
      a.code.trim().toUpperCase() ===
        association.code.trim().toUpperCase()
  );

  if (codeExiste) {
    erreurs.push("Ce code est déjà utilisé.");
  }

  // Abréviation unique
  const abreviationExiste = associations.some(
    (a) =>
      a.id !== association.id &&
      a.abreviation.trim().toUpperCase() ===
        association.abreviation.trim().toUpperCase()
  );

  if (abreviationExiste) {
    erreurs.push("Cette abréviation est déjà utilisée.");
  }

  return {
    valide: erreurs.length === 0,
    erreurs,
  };
}