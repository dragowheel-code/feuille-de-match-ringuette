import { appliquerActionsImportation } from "./appliquerActionsImportation";
import { ajouterJoueuses } from "./ajouterJoueuses";
import { mettreAJourJoueuses } from "./mettreAJourJoueuses";
import { creerRapportImportation } from "./creerRapportImportation";
import { validerImportation } from "./validerImportation";

export function importerJoueuses({
  previsualisation,
  joueuses,
}) {
  const actions = appliquerActionsImportation(
    previsualisation.lignes
  );
  const validation = validerImportation(
  previsualisation.lignes
);

if (!validation.valide) {
  return {
    joueuses,
    actions,
    validation,
    rapport: null,
  };
}

let nouvellesJoueuses = ajouterJoueuses(
  joueuses,
  actions.ajouter
);

nouvellesJoueuses = mettreAJourJoueuses(
  nouvellesJoueuses,
  actions.mettreAJour
);
const rapport = creerRapportImportation(actions);

return {
  joueuses: nouvellesJoueuses,
  actions,
  rapport,
  validation,
};
}