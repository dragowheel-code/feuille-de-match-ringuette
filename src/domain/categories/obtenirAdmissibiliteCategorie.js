import { categorieInferieure } from "./categorieInferieure";
import { categorieSuperieure } from "./categorieSuperieure";

export function obtenirAdmissibiliteCategorie(
  categorieEquipe,
  categorieJoueuse
) {
  if (categorieEquipe === categorieJoueuse) {
    return {
      type: "normale",
      peutAssigner: true,
      peutDerogationHaut: false,
      peutDerogationBas: false,
    };
  }

  /*
   * La joueuse provient de la catégorie inférieure
   * et monte dans l'équipe sélectionnée.
   *
   * Exemple :
   * joueuse Moustique → équipe Novice = D+
   */
  if (
    categorieInferieure(categorieEquipe)?.nom ===
    categorieJoueuse
  ) {
    return {
      type: "D+",
      peutAssigner: false,
      peutDerogationHaut: true,
      peutDerogationBas: false,
    };
  }

  /*
   * La joueuse provient de la catégorie supérieure
   * et descend dans l'équipe sélectionnée.
   *
   * Exemple :
   * joueuse Novice → équipe Moustique = D-
   */
  if (
    categorieSuperieure(categorieEquipe)?.nom ===
    categorieJoueuse
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