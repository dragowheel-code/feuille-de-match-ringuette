import { creerId } from "../utils/ids";

export function creerEvenementBut(data) {
  return {
    id: creerId(),
    type: "But",
    ...data,
  };
}

export function creerEvenementPunition(data) {
  return {
    id: creerId(),
    type: "Punition",
    ...data,
  };
}

export function creerEvenementTempsMort(data) {
  return {
    id: creerId(),
    type: "Temps mort",
    ...data,
  };
}

export function creerEvenementGardienne(data) {
  return {
    id: creerId(),
    type: "Changement gardienne",
    ...data,
  };
}

export function creerEvenementTirBarrage(data) {
  return {
    id: creerId(),
    type: "Tir de barrage",
    ...data,
  };
}
export function ajouterEvenementAuDebut(
  anciensEvenements,
  nouvelEvenement
) {
  return [nouvelEvenement, ...anciensEvenements];
}