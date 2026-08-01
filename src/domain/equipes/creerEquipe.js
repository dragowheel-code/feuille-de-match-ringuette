export function creerEquipe({
  id = crypto.randomUUID(),

  saisonId = "",
  associationId = "",

  categorie = "",
  niveau = "",
  numeroEquipe = "",

  abreviation = "",
} = {}) {
  return {
    id,

    saisonId,
    associationId,

    categorie: categorie.trim(),
    niveau: niveau.trim().toUpperCase(),
    numeroEquipe: String(
      numeroEquipe ?? ""
    ).trim(),

    abreviation: abreviation
      .trim()
      .toUpperCase(),
  };
}