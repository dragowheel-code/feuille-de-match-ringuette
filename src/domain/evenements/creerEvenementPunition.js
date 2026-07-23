import { creerEvenement } from "./creerEvenement";
import { TYPES_EVENEMENT } from "./typesEvenement";

export function creerEvenementPunition(data) {
  return creerEvenement({
    type: TYPES_EVENEMENT.PUNITION,
    ...data,
  });
}