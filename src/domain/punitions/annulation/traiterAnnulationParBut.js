import { trouverPortionActive } from "./trouverPortionActive";
import { annulerPortionActive } from "./annulerPortionActive";
import { activerPortionSuivante } from "./activerPortionSuivante";
import { recalculerTempsPortions } from "./recalculerTempsPortions";

export function traiterAnnulationParBut(
  portions,
  tempsBut
) {
  const portionActive =
    trouverPortionActive(portions);

  if (!portionActive) {
    return portions;
  }

  if (!portionActive.annulableParBut) {
    return portions;
  }

  const portionsAnnulees =
    annulerPortionActive(
      portions,
      tempsBut
    );

  const portionsActivees =
    activerPortionSuivante(
      portionsAnnulees
    );

  return recalculerTempsPortions(
    portionsActivees,
    tempsBut
  );
}