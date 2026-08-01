import { useEtatPersistant } from "./useEtatPersistant";

import { obtenirBaseDeDonnees } from "../services/baseDeDonneesV2";

import { creerAffectation } from "../domain/affectation/creerAffectation";
import { remplacerAffectation } from "../domain/affectation/remplacerAffectation";
import { supprimerAffectation as retirerAffectation } from "../domain/affectation/supprimerAffectation";
import { validerAffectation } from "../domain/affectation/validerAffectation";

export function useGestionAffectations() {
  const [affectations, setAffectations] =
  useEtatPersistant(
    "ringuette-v2-affectations",
    () => {
      const baseDeDonnees =
        obtenirBaseDeDonnees();

      return Array.isArray(
        baseDeDonnees.affectations
      )
        ? baseDeDonnees.affectations
        : [];
    }
  );

  function obtenirAffectationParId(idAffectation) {
    return affectations.find(
      (affectation) =>
        affectation.id === idAffectation
    );
  }
    function ajouterAffectation(formulaire) {
    const nouvelleAffectation =
      creerAffectation(formulaire);

    const validation =
      validerAffectation(
        nouvelleAffectation,
        affectations
      );

    if (!validation.valide) {
      return {
        succes: false,
        erreurs: validation.erreurs,
      };
    }

    setAffectations(
      (affectationsActuelles) => [
        ...affectationsActuelles,
        nouvelleAffectation,
      ]
    );

    return {
      succes: true,
      affectation: nouvelleAffectation,
      erreurs: [],
    };
  }
  function modifierAffectation(formulaire) {
  const affectationExistante =
    obtenirAffectationParId(formulaire.id);

  if (!affectationExistante) {
    return {
      succes: false,
      erreurs: ["Affectation introuvable."],
    };
  }

  const affectationModifiee =
    creerAffectation({
      ...affectationExistante,
      ...formulaire,
      id: affectationExistante.id,
    });

  const validation =
    validerAffectation(
      affectationModifiee,
      affectations
    );

  if (!validation.valide) {
    return {
      succes: false,
      erreurs: validation.erreurs,
    };
  }

  setAffectations(
    (affectationsActuelles) =>
      remplacerAffectation(
        affectationsActuelles,
        affectationModifiee
      )
  );

  return {
    succes: true,
    affectation: affectationModifiee,
    erreurs: [],
  };
}
function supprimerAffectation(idAffectation) {
  const affectationExistante =
    obtenirAffectationParId(idAffectation);

  if (!affectationExistante) {
    return {
      succes: false,
      erreur: "Affectation introuvable.",
    };
  }

  setAffectations(
    (affectationsActuelles) =>
      retirerAffectation(
        affectationsActuelles,
        idAffectation
      )
  );

  return {
    succes: true,
    affectation: affectationExistante,
  };
}

function remplacerAffectationsEquipe(
  equipeId,
  nouvellesAffectations
) {
  setAffectations((affectationsActuelles) => {
    const autresAffectations =
      affectationsActuelles.filter(
        (affectation) =>
          String(affectation.equipeId) !==
          String(equipeId)
      );

    return [
      ...autresAffectations,
      ...nouvellesAffectations,
    ];
  });

  return {
    succes: true,
  };
}

return {
  affectations,
  ajouterAffectation,
  modifierAffectation,
  supprimerAffectation,
  remplacerAffectationsEquipe,
  obtenirAffectationParId,
};
}