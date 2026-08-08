export function libererAttributionChandail(
  attribution,
  {
    dateLiberation = new Date()
      .toISOString()
      .slice(0, 10),

    commentaire = "",
  } = {}
) {
  if (!attribution) {
    return {
      succes: false,
      attribution: null,
      erreurs: [
        "L'attribution est introuvable.",
      ],
    };
  }

  if (attribution.active !== true) {
    return {
      succes: false,
      attribution: null,
      erreurs: [
        "Cette attribution n'est plus active.",
      ],
    };
  }

  const attributionLiberee = {
    ...attribution,

    active: false,

    dateRetour:
      dateLiberation,

    commentaire:
      commentaire.trim() ||
      attribution.commentaire ||
      "",

    typeFin: "LIBERATION",
  };

  return {
    succes: true,
    attribution:
      attributionLiberee,
    erreurs: [],
  };
}