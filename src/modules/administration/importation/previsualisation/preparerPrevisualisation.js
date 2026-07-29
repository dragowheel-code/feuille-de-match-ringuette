import { STATUTS_COMPARAISON } from "../comparateurs/statuts";
import { determinerActionParDefaut } from "./determinerActionParDefaut";

export function preparerPrevisualisation(comparaison) {
  const lignes = comparaison.resultats.map((ligne) => ({
  ...ligne,
  action: determinerActionParDefaut(ligne.statut),
}));

  return {
    resume: comparaison.resume,

    lignes,

    groupes: {
      identiques: lignes.filter(
        (l) => l.statut === STATUTS_COMPARAISON.IDENTIQUE
      ),

      nouvelles: lignes.filter(
        (l) => l.statut === STATUTS_COMPARAISON.NOUVELLE
      ),

      misesAJour: lignes.filter(
        (l) => l.statut === STATUTS_COMPARAISON.MISE_A_JOUR
      ),

      correspondancesProbables: lignes.filter(
        (l) =>
          l.statut ===
          STATUTS_COMPARAISON.CORRESPONDANCE_PROBABLE
      ),

      doublons: lignes.filter(
        (l) => l.statut === STATUTS_COMPARAISON.DOUBLON
      ),
    },
  };
}