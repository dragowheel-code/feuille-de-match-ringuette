export function creerPantalonJoueuse({
  id = crypto.randomUUID(),

  joueuseId = "",
  pantalonId = "",

  quantite = 1,

  dateRemise = new Date()
    .toISOString()
    .slice(0, 10),

  remplacement = false,

  commentaire = "",
} = {}) {
  return {
    id,

    joueuseId: String(
      joueuseId ?? ""
    ).trim(),

    pantalonId: String(
      pantalonId ?? ""
    ).trim(),

    quantite: Number(
      quantite ?? 1
    ),

    dateRemise: String(
      dateRemise ?? ""
    ).trim(),

    remplacement:
      Boolean(remplacement),

    commentaire: String(
      commentaire ?? ""
    ).trim(),
  };
}