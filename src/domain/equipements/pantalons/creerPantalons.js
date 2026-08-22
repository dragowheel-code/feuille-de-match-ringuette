export function creerPantalons({
  id = crypto.randomUUID(),

  associationId = "",

  taille = "",

  quantiteStock = 0,

  actif = true,
} = {}) {
  return {
    id,

    associationId: String(
      associationId ?? ""
    ).trim(),

    taille: String(
      taille ?? ""
    )
      .trim()
      .toUpperCase(),

    quantiteStock:
      Number(
        quantiteStock ?? 0
      ),

    actif:
      Boolean(actif),
  };
}