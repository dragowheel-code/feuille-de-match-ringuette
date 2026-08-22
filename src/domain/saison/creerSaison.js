export function creerSaison({
  id = crypto.randomUUID(),

  associationId = "",

  nom = "",

  anneeReference = null,

  dateDebut = "",

  dateFin = "",

  active = false,

  verrouillee = false,

  notes = "",
} = {}) {
  return {
    id,

    associationId:
      String(
        associationId ?? ""
      ).trim(),

    nom:
      String(nom ?? "").trim(),

    anneeReference:
      anneeReference === null ||
      anneeReference === ""
        ? null
        : Number(anneeReference),

    dateDebut:
      dateDebut ?? "",

    dateFin:
      dateFin ?? "",

    active:
      Boolean(active),

    verrouillee:
      Boolean(verrouillee),

    notes:
      String(notes ?? "").trim(),
  };
}