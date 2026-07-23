import { creerEvenement } from "./creerEvenement";

export function creerEvenementPunition(data) {
  return creerEvenement({
    type: "Punition",
    ...data,
  });
}