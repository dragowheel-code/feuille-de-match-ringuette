import { trouverCorrespondanceEquipe } from "./trouverCorrespondanceEquipe";
import { determinerStatut } from "./determinerStatut";
import { detecterDoublonsParticipantes } from "./detecterDoublonsParticipantes";
import { creerCleParticipante } from "./creerCleParticipante";
import { STATUTS_COMPARAISON } from "./statuts";

export function comparerParticipantes({
  participantes,
  joueuses,
}) {
    const doublons = detecterDoublonsParticipantes(
  participantes
);
  const resultats = [];

  for (const participante of participantes) {
    const joueusesDisponibles = Array.isArray(joueuses)
  ? joueuses
  : [];

    const cle = creerCleParticipante(participante);

if (doublons.has(cle)) {
  resultats.push({
    participante,
    joueuse: null,
    confiance: 100,
    statut: STATUTS_COMPARAISON.DOUBLON,
    raison: "La participante apparaît plusieurs fois dans le fichier.",
  });

  continue;
}

    const correspondance =
      trouverCorrespondanceEquipe(
  participante,
  joueusesDisponibles
);

   const decision = determinerStatut({
  participante,
  correspondance,
});

resultats.push({
  participante,
  joueuse: correspondance.joueuse,
  confiance: correspondance.confiance,
  ...decision,
});
  }

  const resume = {
  total: resultats.length,

  identiques: resultats.filter(
    (r) => r.statut === STATUTS_COMPARAISON.IDENTIQUE
  ).length,

  nouvelles: resultats.filter(
    (r) => r.statut === STATUTS_COMPARAISON.NOUVELLE
  ).length,

  misesAJour: resultats.filter(
    (r) => r.statut === STATUTS_COMPARAISON.MISE_A_JOUR
  ).length,

  correspondancesProbables: resultats.filter(
    (r) => r.statut === STATUTS_COMPARAISON.CORRESPONDANCE_PROBABLE
  ).length,

  doublons: resultats.filter(
    (r) => r.statut === STATUTS_COMPARAISON.DOUBLON
  ).length,
};

  return {
    resume,
    resultats,
  };
}