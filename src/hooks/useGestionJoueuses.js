import { useEtatPersistant } from "./useEtatPersistant";

import { obtenirBaseDeDonnees } from "../services/baseDeDonneesV2";

import { creerJoueuse } from "../domain/joueuses/creerJoueuse";
import { remplacerJoueuse } from "../domain/joueuses/remplacerJoueuse";
import { supprimerJoueuse as retirerJoueuse } from "../domain/joueuses/supprimerJoueuse";
import { validerJoueuse } from "../domain/joueuses/validerJoueuse";

export function useGestionJoueuses() {
  const [joueuses, setJoueuses] =
  useEtatPersistant(
    "ringuette-v2-joueuses",
    () => {
      const baseDeDonnees =
        obtenirBaseDeDonnees();

      return Array.isArray(
        baseDeDonnees.joueuses
      )
        ? baseDeDonnees.joueuses
        : [];
    }
  );

  function obtenirJoueuseParId(idJoueuse) {
    return joueuses.find(
      (joueuse) => joueuse.id === idJoueuse
    );
  }

  function ajouterJoueuse(formulaire) {
    const nouvelleJoueuse = creerJoueuse(formulaire);

    const validation = validerJoueuse(
      nouvelleJoueuse,
      joueuses
    );

    if (!validation.valide) {
      return {
        succes: false,
        erreurs: validation.erreurs,
      };
    }

    setJoueuses((joueusesActuelles) => [
      ...joueusesActuelles,
      nouvelleJoueuse,
    ]);

    return {
      succes: true,
      joueuse: nouvelleJoueuse,
      erreurs: [],
    };
  }

  function modifierJoueuse(formulaire) {
    const joueuseExistante =
      obtenirJoueuseParId(formulaire.id);

    if (!joueuseExistante) {
      return {
        succes: false,
        erreurs: ["Joueuse introuvable."],
      };
    }

    const joueuseModifiee = creerJoueuse({
      ...joueuseExistante,
      ...formulaire,
      id: joueuseExistante.id,
    });

    const validation = validerJoueuse(
      joueuseModifiee,
      joueuses
    );

    if (!validation.valide) {
      return {
        succes: false,
        erreurs: validation.erreurs,
      };
    }

    setJoueuses((joueusesActuelles) =>
      remplacerJoueuse(
        joueusesActuelles,
        joueuseModifiee
      )
    );

    return {
      succes: true,
      joueuse: joueuseModifiee,
      erreurs: [],
    };
  }

  function supprimerJoueuse(idJoueuse) {
    const joueuseExistante =
      obtenirJoueuseParId(idJoueuse);

    if (!joueuseExistante) {
      return {
        succes: false,
        erreur: "Joueuse introuvable.",
      };
    }

    setJoueuses((joueusesActuelles) =>
      retirerJoueuse(
        joueusesActuelles,
        idJoueuse
      )
    );

    return {
      succes: true,
      joueuse: joueuseExistante,
    };
  }

  return {
  joueuses,
  setJoueuses,
  obtenirJoueuseParId,
  ajouterJoueuse,
  modifierJoueuse,
  supprimerJoueuse,
};
}