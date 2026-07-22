import { calculerTempsFinPrevue } from "./calculs/calculerTempsFinPrevue";
import { calculerPortionActive } from "./calculs/calculerPortionActive";
import { calculerPunitionTerminee } from "./calculs/calculerPunitionTerminee";

export function reconstruirePunition(punition) {
  const portions = punition.portions ?? [];

  const portionActive =
    calculerPortionActive(portions);

  const punitionTerminee =
    calculerPunitionTerminee(portions);

  const tempsFinPrevue =
    calculerTempsFinPrevue(
      portions,
      punition.tempsSortie
    );

  return {
    ...punition,
    portions,

    tempsFinPrevue,

    tempsRetour:
      portionActive?.tempsRetour ??
      tempsFinPrevue,

    annuleeParBut:
      punitionTerminee &&
      portions.some(
        (portion) => portion.annuleeParBut
      ),
  };
}