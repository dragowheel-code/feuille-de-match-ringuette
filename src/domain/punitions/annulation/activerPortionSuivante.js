export function activerPortionSuivante(portions) {
  const indexPortionAnnulee = portions.findIndex(
    (portion) => portion.etat === "annulee"
  );

  if (indexPortionAnnulee === -1) {
    return portions;
  }

  return portions.map((portion, index) => {
    if (
      index === indexPortionAnnulee + 1 &&
      portion.etat === "en_attente"
    ) {
      return {
        ...portion,
        etat: "active",
      };
    }

    return portion;
  });
}