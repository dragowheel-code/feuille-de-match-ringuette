import { useState } from "react";

import { chargerDepuisStockage } from "../services/storage";
import { usePersistanceDonnees } from "./usePersistanceDonnees";
import { creerMatch } from "../domain/match";

import baseDeDonnees from "../data/baseDeDonnees.json";

function normaliserTexte(valeur) {
  return String(valeur ?? "")
    .trim()
    .toLocaleLowerCase("fr-CA");
}

function fusionnerDonnees({
  donneesBase,
  donneesLocales,
  trouverCorrespondance,
}) {
  const base = Array.isArray(donneesBase)
    ? donneesBase
    : [];

  const locales = Array.isArray(donneesLocales)
    ? donneesLocales
    : [];

  /*
   * On conserve d'abord les données locales.
   * Cela permet de garder les éléments ajoutés par l'utilisateur.
   */
  const resultat = locales.map((element) => ({
    ...element,
  }));

  /*
   * La base intégrée est ensuite appliquée.
   * Lorsqu'un élément existe déjà, les valeurs de la base
   * sont prioritaires afin de distribuer les mises à jour.
   */
  base.forEach((elementBase) => {
    const indexExistant = resultat.findIndex(
      (elementLocal) =>
        trouverCorrespondance(
          elementLocal,
          elementBase
        )
    );

    if (indexExistant >= 0) {
      resultat[indexExistant] = {
        ...resultat[indexExistant],
        ...elementBase,
      };
    } else {
      resultat.push({
        ...elementBase,
      });
    }
  });

  return resultat;
}

function fusionnerEquipes(
  equipesBase,
  equipesLocales
) {
  return fusionnerDonnees({
    donneesBase: equipesBase,
    donneesLocales: equipesLocales,

    trouverCorrespondance: (
      equipeLocale,
      equipeBase
    ) => {
      const memeId =
        equipeLocale.id != null &&
        equipeBase.id != null &&
        String(equipeLocale.id) ===
          String(equipeBase.id);

      const memeNom =
        normaliserTexte(equipeLocale.nom) ===
        normaliserTexte(equipeBase.nom);

      return memeId || memeNom;
    },
  });
}

function fusionnerJoueuses(
  joueusesBase,
  joueusesLocales
) {
  return fusionnerDonnees({
    donneesBase: joueusesBase,
    donneesLocales: joueusesLocales,

    trouverCorrespondance: (
      joueuseLocale,
      joueuseBase
    ) => {
      const memeId =
        joueuseLocale.id != null &&
        joueuseBase.id != null &&
        String(joueuseLocale.id) ===
          String(joueuseBase.id);

      const memeEquipe =
        normaliserTexte(joueuseLocale.equipe) ===
        normaliserTexte(joueuseBase.equipe);

      const memeNumero =
        normaliserTexte(joueuseLocale.numero) ===
        normaliserTexte(joueuseBase.numero);

      /*
       * Une joueuse est considérée identique si elle possède
       * le même identifiant ou le même numéro dans la même équipe.
       */
      return (
        memeId ||
        (memeEquipe && memeNumero)
      );
    },
  });
}

function fusionnerOfficiels(
  officielsBase,
  officielsLocaux
) {
  return fusionnerDonnees({
    donneesBase: officielsBase,
    donneesLocales: officielsLocaux,

    trouverCorrespondance: (
      officielLocal,
      officielBase
    ) => {
      const memeId =
        officielLocal.id != null &&
        officielBase.id != null &&
        String(officielLocal.id) ===
          String(officielBase.id);

      const memeNom =
        normaliserTexte(officielLocal.nom) ===
        normaliserTexte(officielBase.nom);

      return memeId || memeNom;
    },
  });
}

export function useDonneesApplication() {
  const [matchInfo, setMatchInfo] = useState(() =>
    chargerDepuisStockage(
      "matchInfo",
      creerMatch()
    )
  );

  const [equipes, setEquipes] = useState(() => {
    const equipesSauvegardees =
      chargerDepuisStockage("equipes", []);

    return fusionnerEquipes(
      baseDeDonnees.equipes,
      equipesSauvegardees
    );
  });

  const [joueuses, setJoueuses] = useState(() => {
    const joueusesSauvegardees =
      chargerDepuisStockage("joueuses", []);

    return fusionnerJoueuses(
      baseDeDonnees.joueuses,
      joueusesSauvegardees
    );
  });

  const [evenements, setEvenements] = useState(() => {
    const evenementsSauvegardes =
      chargerDepuisStockage("evenements", []);

    return Array.isArray(evenementsSauvegardes)
      ? evenementsSauvegardes
      : [];
  });

  const [officiels, setOfficiels] = useState(() => {
    const officielsSauvegardes =
      chargerDepuisStockage("officiels", []);

    return fusionnerOfficiels(
      baseDeDonnees.officiels,
      officielsSauvegardes
    );
  });

  usePersistanceDonnees({
    matchInfo,
    equipes,
    joueuses,
    evenements,
    officiels,
  });

  return {
    matchInfo,
    setMatchInfo,

    equipes,
    setEquipes,

    joueuses,
    setJoueuses,

    evenements,
    setEvenements,

    officiels,
    setOfficiels,
  };
}