import { categorieInferieure } from "./categorieInferieure";
import { categorieSuperieure } from "./categorieSuperieure";
import { normaliserCategorie } from "./normaliserCategorie";

export function obtenirAdmissibiliteCategorie(
  categorieEquipe,
  categorieJoueuse
) {
  const categorieEquipeNormalisee =
    normaliserCategorie(categorieEquipe);

  const categorieJoueuseNormalisee =
    normaliserCategorie(categorieJoueuse);

  if (
    categorieEquipeNormalisee ===
    categorieJoueuseNormalisee
  ) {
    return {
      type: "normale",
      peutAssigner: true,
      peutDerogationHaut: false,
      peutDerogationBas: false,
    };
  }

  if (
    categorieInferieure(
      categorieEquipeNormalisee
    )?.nom === categorieJoueuseNormalisee
  ) {
    return {
      type: "D+",
      peutAssigner: false,
      peutDerogationHaut: true,
      peutDerogationBas: false,
    };
  }

  if (
    categorieSuperieure(
      categorieEquipeNormalisee
    )?.nom === categorieJoueuseNormalisee
  ) {
    return {
      type: "D-",
      peutAssigner: false,
      peutDerogationHaut: false,
      peutDerogationBas: true,
    };
  }

  return {
    type: null,
    peutAssigner: false,
    peutDerogationHaut: false,
    peutDerogationBas: false,
  };
}