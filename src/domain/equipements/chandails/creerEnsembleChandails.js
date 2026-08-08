export function creerEnsembleChandails({
  id = crypto.randomUUID(),
  associationId = "",
  numero = "",
  taille = "",

  clair: {
    etat: etatClair = "Bon",
    notes: notesClair = "",
  } = {},

  fonce: {
    etat: etatFonce = "Bon",
    notes: notesFonce = "",
  } = {},

  actif = true,
} = {}) {
  return {
    id,

    associationId: String(
      associationId ?? ""
    ).trim(),

    numero: String(
      numero ?? ""
    ).trim(),

    taille: String(
      taille ?? ""
    )
      .trim()
      .toUpperCase(),

    clair: {
      etat: String(
        etatClair ?? "Bon"
      ).trim(),

      notes: String(
        notesClair ?? ""
      ).trim(),
    },

    fonce: {
      etat: String(
        etatFonce ?? "Bon"
      ).trim(),

      notes: String(
        notesFonce ?? ""
      ).trim(),
    },

    actif: Boolean(actif),
  };
}