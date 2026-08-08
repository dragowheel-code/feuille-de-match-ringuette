import { creerAttributionChandail } from "./creerAttributionChandail";

export function terminerAttributionChandail(
  attribution,
  {
    dateRetour = new Date()
      .toISOString()
      .slice(0, 10),

    commentaire,
  } = {}
) {
  return creerAttributionChandail({
    ...attribution,

    active: false,

    dateRetour,

    commentaire:
      commentaire ??
      attribution.commentaire,
  });
}