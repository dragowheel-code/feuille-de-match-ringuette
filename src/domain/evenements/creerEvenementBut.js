import { creerEvenement } from "./creerEvenement";

export function creerEvenementBut(data) {
  return creerEvenement({
    type: "But",
    ...data,
  });
}