export function creerPersonnelEquipe({
  id = crypto.randomUUID(),

  associationId = "",

  nomComplet = "",
  courriel = "",
  telephone = "",

  pnce = {},

  actif = true,
} = {}) {
  return {
    id,

    associationId:
      String(associationId).trim(),

    nomComplet:
      String(nomComplet).trim(),

    courriel:
      String(courriel).trim(),

    telephone:
      String(telephone).trim(),

    pnce: {
      numero:
        String(
          pnce.numero ?? ""
        ).trim(),

      introduction:
        Boolean(
          pnce.introduction
        ),

      ethiqueSportive:
        Boolean(
          pnce.ethiqueSportive
        ),

      competition:
        Boolean(
          pnce.competition
        ),
    },

    actif:
      Boolean(actif),
  };
}