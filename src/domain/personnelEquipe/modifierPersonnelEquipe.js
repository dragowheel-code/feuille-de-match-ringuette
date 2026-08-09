import { creerPersonnelEquipe } from "./creerPersonnelEquipe";
import { validerPersonnelEquipe } from "./validerPersonnelEquipe";

export function modifierPersonnelEquipe(
  personnelExistants = [],
  formulaire = {}
) {
  const personnelExistant =
    personnelExistants.find(
      (personnel) =>
        String(personnel.id) ===
        String(formulaire.id)
    );

  if (!personnelExistant) {
    return {
      succes: false,
      personnel: null,
      erreurs: [
        "Le membre du personnel est introuvable.",
      ],
    };
  }

  const personnelModifie =
    creerPersonnelEquipe({
      ...personnelExistant,
      ...formulaire,

      pnce: {
        ...personnelExistant.pnce,
        ...formulaire.pnce,
      },

      id: personnelExistant.id,
    });

  const validation =
    validerPersonnelEquipe(
      personnelModifie,
      personnelExistants
    );

  if (!validation.valide) {
    return {
      succes: false,
      personnel: null,
      erreurs: validation.erreurs,
    };
  }

  const nouvelleListe =
    personnelExistants.map(
      (personnel) =>
        String(personnel.id) ===
        String(personnelExistant.id)
          ? personnelModifie
          : personnel
    );

  return {
    succes: true,
    personnel: personnelModifie,
    personnelEquipe: nouvelleListe,
    erreurs: [],
  };
}