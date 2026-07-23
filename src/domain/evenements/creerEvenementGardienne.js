import { creerEvenement } from "./creerEvenement";

export function creerEvenementGardienne(data) {
  return creerEvenement({
    type: "Changement gardienne",
    ...data,
  });
}