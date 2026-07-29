import { validerParticipante } from "./validerParticipante";

export function validerParticipantes(participantes = []) {
  const erreurs = [];
  const avertissements = [];

  participantes.forEach((participante, index) => {
    const resultat = validerParticipante(participante, index);

    erreurs.push(...resultat.erreurs);
    avertissements.push(...resultat.avertissements);
  });

  const indexInvalides = new Set(
    erreurs.map((erreur) => erreur.index)
  );

  const invalides = indexInvalides.size;
  const total = participantes.length;
  const valides = total - invalides;

  return {
    estValide: erreurs.length === 0,

    resume: {
      total,
      valides,
      invalides,
      avertissements: avertissements.length,
    },

    erreurs,
    avertissements,
  };
}