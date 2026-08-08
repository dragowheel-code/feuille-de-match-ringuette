import {
  creerPantalons,
  remplacerPantalons,
  supprimerPantalons as retirerPantalons,
  validerPantalons,
} from "../domain/equipements";

import { useEtatPersistant } from "./useEtatPersistant";
import { obtenirBaseDeDonnees } from "../services/baseDeDonneesV2";

export function useGestionPantalons() {
  const [
    pantalons,
    setPantalons,
  ] = useEtatPersistant(
    "ringuette-v2-pantalons",
    () => {
      const baseDeDonnees =
        obtenirBaseDeDonnees();

      return Array.isArray(
        baseDeDonnees.pantalons
      )
        ? baseDeDonnees.pantalons
        : [];
    }
  );

  function ajouterPantalons(formulaire) {
    const nouveauPantalon =
      creerPantalons(formulaire);

    const validation =
      validerPantalons(
        nouveauPantalon,
        pantalons
      );

    if (!validation.valide) {
      return {
        succes: false,
        pantalon: null,
        erreurs: validation.erreurs,
      };
    }

    setPantalons(
      (pantalonsActuels) => [
        ...pantalonsActuels,
        nouveauPantalon,
      ]
    );

    return {
      succes: true,
      pantalon: nouveauPantalon,
      erreurs: [],
    };
  }

  function modifierPantalons(formulaire) {
    const pantalonExistant =
      pantalons.find(
        (pantalon) =>
          String(pantalon.id) ===
          String(formulaire.id)
      );

    if (!pantalonExistant) {
      return {
        succes: false,
        pantalon: null,
        erreurs: [
          "Le pantalon est introuvable.",
        ],
      };
    }

    const pantalonModifie =
      creerPantalons({
        ...pantalonExistant,
        ...formulaire,
        id: pantalonExistant.id,
      });

    const validation =
      validerPantalons(
        pantalonModifie,
        pantalons
      );

    if (!validation.valide) {
      return {
        succes: false,
        pantalon: null,
        erreurs: validation.erreurs,
      };
    }

    setPantalons(
      (pantalonsActuels) =>
        remplacerPantalons(
          pantalonsActuels,
          pantalonExistant.id,
          pantalonModifie
        )
    );

    return {
      succes: true,
      pantalon: pantalonModifie,
      erreurs: [],
    };
  }

  function supprimerPantalons(
    idPantalon
  ) {
    const pantalonExistant =
      pantalons.find(
        (pantalon) =>
          String(pantalon.id) ===
          String(idPantalon)
      );

    if (!pantalonExistant) {
      return {
        succes: false,
        pantalon: null,
        erreurs: [
          "Le pantalon est introuvable.",
        ],
      };
    }

    setPantalons(
      (pantalonsActuels) =>
        retirerPantalons(
          pantalonsActuels,
          idPantalon
        )
    );

    return {
      succes: true,
      pantalon: pantalonExistant,
      erreurs: [],
    };
  }

  return {
    pantalons,
    ajouterPantalons,
    modifierPantalons,
    supprimerPantalons,
  };
}