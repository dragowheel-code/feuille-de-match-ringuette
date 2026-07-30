import { useState } from "react";

import { obtenirBaseDeDonnees } from "../services/baseDeDonneesV2";

import { creerEquipe } from "../domain/equipes/creerEquipe";
import { remplacerEquipe } from "../domain/equipes/remplacerEquipe";
import { supprimerEquipe as retirerEquipe } from "../domain/equipes/supprimerEquipe";
import { validerEquipe } from "../domain/equipes/validerEquipe";

export function useGestionEquipes() {
  const [equipes, setEquipes] = useState(() => {
    const baseDeDonnees = obtenirBaseDeDonnees();

    return Array.isArray(baseDeDonnees.equipes)
      ? baseDeDonnees.equipes
      : [];
  });

  function obtenirEquipeParId(idEquipe) {
    return equipes.find(
      (equipe) => equipe.id === idEquipe
    );
  }

  function ajouterEquipe(formulaire) {
    const nouvelleEquipe = creerEquipe(formulaire);

    const validation = validerEquipe(
      nouvelleEquipe,
      equipes
    );

    if (!validation.valide) {
      return {
        succes: false,
        erreurs: validation.erreurs,
      };
    }

    setEquipes((equipesActuelles) => [
      ...equipesActuelles,
      nouvelleEquipe,
    ]);

    return {
      succes: true,
      equipe: nouvelleEquipe,
      erreurs: [],
    };
  }

  function modifierEquipe(formulaire) {
    const equipeExistante = obtenirEquipeParId(
      formulaire.id
    );

    if (!equipeExistante) {
      return {
        succes: false,
        erreurs: ["Équipe introuvable."],
      };
    }

    const equipeModifiee = creerEquipe({
      ...equipeExistante,
      ...formulaire,
      id: equipeExistante.id,
    });

    const validation = validerEquipe(
      equipeModifiee,
      equipes
    );

    if (!validation.valide) {
      return {
        succes: false,
        erreurs: validation.erreurs,
      };
    }

    setEquipes((equipesActuelles) =>
      remplacerEquipe(
        equipesActuelles,
        equipeModifiee
      )
    );

    return {
      succes: true,
      equipe: equipeModifiee,
      erreurs: [],
    };
  }

  function supprimerEquipe(idEquipe) {
    const equipeExistante =
      obtenirEquipeParId(idEquipe);

    if (!equipeExistante) {
      return {
        succes: false,
        erreur: "Équipe introuvable.",
      };
    }

    setEquipes((equipesActuelles) =>
      retirerEquipe(
        equipesActuelles,
        idEquipe
      )
    );

    return {
      succes: true,
      equipe: equipeExistante,
    };
  }

  return {
    equipes,
    ajouterEquipe,
    modifierEquipe,
    supprimerEquipe,
    obtenirEquipeParId,
  };
}