export function creerPantalons({
  id = crypto.randomUUID(),
  associationId = "",
  numero = "",
  taille = "",
  etat = "Bon",
  notes = "",
  } = {},

  actif = true,
) {
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

    etat: {
      etat: String(
        etat ?? "Bon"
      ).trim(),

      notes: String(
        notes ?? ""
      ).trim(),
    },

    actif: Boolean(actif),
  };
}