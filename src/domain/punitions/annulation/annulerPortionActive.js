export function annulerPortionActive(portions, tempsBut) {
  return portions.map((portion) => {
    if (portion.etat !== "active") {
      return portion;
    }

    if (!portion.annulableParBut) {
      return portion;
    }

    return {
      ...portion,
      etat: "annulee",
      annuleeParBut: true,
      tempsRetour: tempsBut,
    };
  });
}