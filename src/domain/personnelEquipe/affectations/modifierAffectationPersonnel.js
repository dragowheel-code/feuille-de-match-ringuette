import { creerAffectationPersonnel } from "./creerAffectationPersonnel";
import { validerAffectationPersonnel } from "./validerAffectationPersonnel";

export function modifierAffectationPersonnel(
  affectationsExistantes = [],
  formulaire = {}
) {
  const affectationExistante =
    affectationsExistantes.find(
      (affectation) =>
        String(affectation.id) ===
        String(formulaire.id)
    );

  if (!affectationExistante) {
    return {
      succes: false,
      affectation: null,
      affectations: affectationsExistantes,
      erreurs: [
        "L'affectation du personnel est introuvable.",
      ],
    };
  }

  const affectationModifiee =
    creerAffectationPersonnel({
      ...affectationExistante,
      ...formulaire,
      id: affectationExistante.id,
    });

  const validation =
    validerAffectationPersonnel(
      affectationModifiee,
      affectationsExistantes
    );

  if (!validation.valide) {
    return {
      succes: false,
      affectation: null,
      affectations: affectationsExistantes,
      erreurs: validation.erreurs,
    };
  }

  const nouvelleListe =
    affectationsExistantes.map(
      (affectation) =>
        String(affectation.id) ===
        String(affectationExistante.id)
          ? affectationModifiee
          : affectation
    );

  return {
    succes: true,
    affectation: affectationModifiee,
    affectations: nouvelleListe,
    erreurs: [],
  };
}