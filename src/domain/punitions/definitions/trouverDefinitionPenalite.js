import { PENALITES } from "../../../constants/penalites";

export function trouverDefinitionPenalite(libelle) {
  return PENALITES.find(
    (penalite) => penalite.libelle === libelle
  );
}