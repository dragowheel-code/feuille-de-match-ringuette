export function creerEquipe({
  id = crypto.randomUUID(),

  associationId = "",

  nom = "",
  abreviation = "",

  calibre = "",
} = {}) {
  return {
    id,

    associationId,

    nom: nom.trim(),
    abreviation: abreviation.trim().toUpperCase(),

    calibre: calibre.trim(),
  };
}