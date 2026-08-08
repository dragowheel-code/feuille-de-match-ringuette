import { creerAttributionChandail } from "./creerAttributionChandail";
import { validerAttributionChandail } from "./validerAttributionChandail";

export function attribuerEnsembleChandail(
  formulaire,
  attributionsExistantes = []
) {
  const attribution =
    creerAttributionChandail(
      formulaire
    );

  const validation =
    validerAttributionChandail(
      attribution,
      attributionsExistantes
    );

  if (!validation.valide) {
    return {
      succes: false,
      attribution: null,
      erreurs: validation.erreurs,
    };
  }

  return {
    succes: true,
    attribution,
    erreurs: [],
  };
}