import { creerCleParticipante } from "./creerCleParticipante";

export function detecterDoublonsParticipantes(participantes) {
  const vus = new Map();
  const doublons = new Set();

  for (const participante of participantes) {
    const cle = creerCleParticipante(participante);

    if (vus.has(cle)) {
      doublons.add(cle);
    } else {
      vus.set(cle, participante);
    }
  }

  return doublons;
}