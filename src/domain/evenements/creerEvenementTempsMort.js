import { creerEvenement } from "./creerEvenement";
import { TYPES_EVENEMENT } from "./typesEvenement";

export function creerEvenementTempsMort(data) {
  return creerEvenement({
    type: TYPES_EVENEMENT.TEMPS_MORT,
    ...data,
  });
}