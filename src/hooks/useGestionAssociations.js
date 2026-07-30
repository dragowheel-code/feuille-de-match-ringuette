import { useState } from "react";

import { obtenirBaseDeDonnees } from "../services/baseDeDonneesV2";

import { creerAssociation } from "../domain/association/creerAssociation";
import { remplacerAssociation } from "../domain/association/remplacerAssociation";
import { supprimerAssociation as retirerAssociation } from "../domain/association/supprimerAssociation";
import { validerAssociation } from "../domain/association/validerAssociation";

export function useGestionAssociations() {
  const [associations, setAssociations] = useState(() => {
    const baseDeDonnees = obtenirBaseDeDonnees();

    return Array.isArray(baseDeDonnees.associations)
      ? baseDeDonnees.associations
      : [];
  });

  function obtenirAssociationParId(idAssociation) {
    return associations.find(
      (association) => association.id === idAssociation
    );
  }

  function ajouterAssociation(formulaire) {
  const nouvelleAssociation = creerAssociation(formulaire);

  const validation = validerAssociation(
    nouvelleAssociation,
    associations
  );

  if (!validation.valide) {
    return {
      succes: false,
      erreurs: validation.erreurs,
    };
  }

  setAssociations((associationsActuelles) => [
    ...associationsActuelles,
    nouvelleAssociation,
  ]);

  return {
    succes: true,
    association: nouvelleAssociation,
    erreurs: [],
  };
}

  function modifierAssociation(formulaire) {
  const associationExistante = obtenirAssociationParId(
    formulaire.id
  );

  if (!associationExistante) {
    return {
      succes: false,
      erreurs: ["Association introuvable."],
    };
  }

  const associationModifiee = creerAssociation({
    ...associationExistante,
    ...formulaire,
    id: associationExistante.id,
  });

  const validation = validerAssociation(
    associationModifiee,
    associations
  );

  if (!validation.valide) {
    return {
      succes: false,
      erreurs: validation.erreurs,
    };
  }

  setAssociations((associationsActuelles) =>
    remplacerAssociation(
      associationsActuelles,
      associationModifiee
    )
  );

  return {
    succes: true,
    association: associationModifiee,
    erreurs: [],
  };
}

  function supprimerAssociation(idAssociation) {
    const associationExistante =
      obtenirAssociationParId(idAssociation);

    if (!associationExistante) {
      return {
        succes: false,
        erreur: "Association introuvable.",
      };
    }

    setAssociations((associationsActuelles) =>
      retirerAssociation(
        associationsActuelles,
        idAssociation
      )
    );

    return {
      succes: true,
      association: associationExistante,
    };
  }

  return {
    associations,
    ajouterAssociation,
    modifierAssociation,
    supprimerAssociation,
    obtenirAssociationParId,
  };
}