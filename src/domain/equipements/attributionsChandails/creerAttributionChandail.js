export function creerAttributionChandail({
  id = crypto.randomUUID(),

  ensembleId = "",
  joueuseId = "",
  saisonId = "",
  affectationId = null,

  dateAttribution = new Date()
    .toISOString()
    .slice(0, 10),

  dateRetour = null,

  active = true,
  commentaire = "",
} = {}) {
  return {
    id,

    ensembleId: String(
      ensembleId ?? ""
    ).trim(),

    joueuseId: String(
      joueuseId ?? ""
    ).trim(),

    saisonId: String(
      saisonId ?? ""
    ).trim(),

    affectationId:
      affectationId
        ? String(affectationId).trim()
        : null,

    dateAttribution,

    dateRetour,

    active: Boolean(active),

    commentaire: String(
      commentaire ?? ""
    ).trim(),
  };
}