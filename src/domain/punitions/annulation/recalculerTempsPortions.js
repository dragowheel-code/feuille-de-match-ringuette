import { ajouterMinutes } from "../../../utils/temps";

export function recalculerTempsPortions(
  portions,
  tempsBut
) {
  const indexPortionActive = portions.findIndex(
    (portion) => portion.etat === "active"
  );

  if (indexPortionActive === -1) {
    return portions;
  }

  let prochainTempsDebut = tempsBut;

  return portions.map((portion, index) => {
    if (index < indexPortionActive) {
      return portion;
    }

    if (
      portion.etat !== "active" &&
      portion.etat !== "en_attente"
    ) {
      return portion;
    }

    const tempsFinPrevue = ajouterMinutes(
      prochainTempsDebut,
      Number(portion.duree || 0)
    );

    const portionMiseAJour = {
      ...portion,
      tempsDebut: prochainTempsDebut,
      tempsFinPrevue,
      tempsRetour: tempsFinPrevue,
    };

    prochainTempsDebut = tempsFinPrevue;

    return portionMiseAJour;
  });
}