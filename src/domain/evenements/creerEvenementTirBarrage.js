import { creerEvenement } from "./creerEvenement";

export function creerEvenementTirBarrage(data) {
  return creerEvenement({
    type: "Tir de barrage",
    ...data,
  });
}