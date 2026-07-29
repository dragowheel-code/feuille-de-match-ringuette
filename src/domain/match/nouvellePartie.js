import { creerMatch } from "./creerMatch";

export function nouvellePartie(matchActuel) {
  return creerMatch({
    calibre: matchActuel.calibre,
    couleurLocaleChoisie:
      matchActuel.couleurLocaleChoisie,
    couleurVisiteuseChoisie:
      matchActuel.couleurVisiteuseChoisie,
    envoyerCourrielLocal:
      matchActuel.envoyerCourrielLocal,
    envoyerCourrielVisiteur:
      matchActuel.envoyerCourrielVisiteur,
    courrielPersonnalise:
      matchActuel.courrielPersonnalise,
  });
}