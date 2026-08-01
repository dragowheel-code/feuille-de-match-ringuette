import { categorieInferieure } from "./categorieInferieure";
import { categorieSuperieure } from "./categorieSuperieure";

export function estCategorieAdmissible(
  categorieEquipe,
  categorieJoueuse
) {
  if (categorieEquipe === categorieJoueuse) {
    return "normale";
  }

  if (
    categorieSuperieure(categorieEquipe)?.nom ===
    categorieJoueuse
  ) {
    return "D+";
  }

  if (
    categorieInferieure(categorieEquipe)?.nom ===
    categorieJoueuse
  ) {
    return "D-";
  }

  return null;
}