import { creerEvenement } from "./creerEvenement";
import { TYPES_EVENEMENT } from "./typesEvenement";

export function creerEvenementGardienne(data) {
  return creerEvenement({
    type: TYPES_EVENEMENT.GARDIENNE,
    ...data,
  });
}