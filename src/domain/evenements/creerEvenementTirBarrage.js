import { creerEvenement } from "./creerEvenement";
import { TYPES_EVENEMENT } from "./typesEvenement";

export function creerEvenementTirBarrage(data) {
  return creerEvenement({
    type: TYPES_EVENEMENT.TIR_BARRAGE,
    ...data,
  });
}