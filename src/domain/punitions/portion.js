import { creerId } from "../../utils/ids";

export function creerPortion(
  numero,
  duree,
  tempsDebut,
  tempsFin,
  annulableParBut
) {
return {
  id: creerId(),
  numero,

  etat: numero === 1 ? "active" : "en_attente",

  duree,

  tempsDebut,
  tempsFinPrevue: tempsFin,
  tempsRetour: tempsFin,

  annulableParBut,
  annuleeParBut: false,
};
}