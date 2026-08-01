import { useEtatPersistant } from "./useEtatPersistant";

import { obtenirBaseDeDonnees } from "../services/baseDeDonneesV2";

import { creerSaison } from "../domain/saison/creerSaison";
import { remplacerSaison } from "../domain/saison/remplacerSaison";
import { supprimerSaison as retirerSaison } from "../domain/saison/supprimerSaison";
import { validerSaison } from "../domain/saison/validerSaison";

export function useGestionSaisons() {
  const [saisons, setSaisons] =
  useEtatPersistant(
    "ringuette-v2-saisons",
    () => {
      const baseDeDonnees =
        obtenirBaseDeDonnees();

      return Array.isArray(
        baseDeDonnees.saisons
      )
        ? baseDeDonnees.saisons
        : [];
    }
  );

  function obtenirSaisonParId(idSaison) {
    return saisons.find(
      (saison) => saison.id === idSaison
    );
  }
  function obtenirSaisonActive() {
  return saisons.find(
    (saison) => saison.active === true
  );
}

  function ajouterSaison(formulaire) {
    const nouvelleSaison = creerSaison(formulaire);

    const validation = validerSaison(
      nouvelleSaison,
      saisons
    );

    if (!validation.valide) {
      return {
        succes: false,
        erreurs: validation.erreurs,
      };
    }

    setSaisons((saisonsActuelles) => {
      const saisonsMisesAJour =
        nouvelleSaison.active
          ? saisonsActuelles.map((saison) => ({
              ...saison,
              active: false,
            }))
          : saisonsActuelles;

      return [
        ...saisonsMisesAJour,
        nouvelleSaison,
      ];
    });

    return {
      succes: true,
      saison: nouvelleSaison,
      erreurs: [],
    };
  }

  function modifierSaison(formulaire) {
    const saisonExistante = obtenirSaisonParId(
      formulaire.id
    );

    if (!saisonExistante) {
      return {
        succes: false,
        erreurs: ["Saison introuvable."],
      };
    }

    if (saisonExistante.verrouillee) {
      return {
        succes: false,
        erreurs: [
          "Une saison verrouillée ne peut pas être modifiée.",
        ],
      };
    }

    const saisonModifiee = creerSaison({
      ...saisonExistante,
      ...formulaire,
      id: saisonExistante.id,
    });

    const validation = validerSaison(
      saisonModifiee,
      saisons
    );

    if (!validation.valide) {
      return {
        succes: false,
        erreurs: validation.erreurs,
      };
    }

    setSaisons((saisonsActuelles) => {
      const saisonsMisesAJour =
        saisonModifiee.active
          ? saisonsActuelles.map((saison) =>
              saison.id === saisonModifiee.id
                ? saison
                : {
                    ...saison,
                    active: false,
                  }
            )
          : saisonsActuelles;

      return remplacerSaison(
        saisonsMisesAJour,
        saisonModifiee
      );
    });

    return {
      succes: true,
      saison: saisonModifiee,
      erreurs: [],
    };
  }

  function supprimerSaison(idSaison) {
    const saisonExistante =
      obtenirSaisonParId(idSaison);

    if (!saisonExistante) {
      return {
        succes: false,
        erreur: "Saison introuvable.",
      };
    }

    if (saisonExistante.verrouillee) {
      return {
        succes: false,
        erreur:
          "Une saison verrouillée ne peut pas être supprimée.",
      };
    }

    setSaisons((saisonsActuelles) =>
      retirerSaison(
        saisonsActuelles,
        idSaison
      )
    );

    return {
      succes: true,
      saison: saisonExistante,
    };
  }

  return {
    saisons,
    ajouterSaison,
    modifierSaison,
    supprimerSaison,
    obtenirSaisonParId,
    obtenirSaisonActive,
  };
}