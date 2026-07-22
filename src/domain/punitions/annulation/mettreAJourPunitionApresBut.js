import { traiterAnnulationParBut } from "./traiterAnnulationParBut";
import { reconstruirePunition } from "../reconstruirePunition";

export function mettreAJourPunitionApresBut(
  punition,
  tempsBut
) {
  const portions =
    traiterAnnulationParBut(
      punition.portions,
      tempsBut
    );

  return reconstruirePunition({
    ...punition,
    portions,
  });
}