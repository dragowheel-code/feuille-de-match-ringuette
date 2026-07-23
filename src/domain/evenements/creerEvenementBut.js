import { creerEvenement } from "./creerEvenement";
import { TYPES_EVENEMENT } from "./typesEvenement";

export function creerEvenementBut(data) {
  return creerEvenement({
    type: TYPES_EVENEMENT.BUT,
    ...data,
  });
}