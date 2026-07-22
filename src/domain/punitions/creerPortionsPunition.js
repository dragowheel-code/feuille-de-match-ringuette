import { ajouterMinutes } from "../../utils/temps";
import { creerPortion } from "./portion";

export function creerPortionsPunition(
  tempsSortie,
  penalites
) {
  let tempsDebutPortion = tempsSortie;

  return penalites.map((penalite, index) => {
    const duree = Number(penalite.duree || 0);

    const tempsFinPrevue = ajouterMinutes(
      tempsDebutPortion,
      duree
    );

    const portion = {
  ...creerPortion(
    index + 1,
    duree,
    tempsDebutPortion,
    tempsFinPrevue,
    penalite.annulableParBut === true
  ),

  type: penalite.type,
  code: penalite.code,
  categorie: penalite.categorie,
};

    tempsDebutPortion = tempsFinPrevue;

    return portion;
  });
}