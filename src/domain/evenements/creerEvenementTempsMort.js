import { creerEvenement } from "./creerEvenement";

export function creerEvenementTempsMort(data) {
  return creerEvenement({
    type: "Temps mort",
    ...data,
  });
}