import { useState } from "react";

import {
  chargerDepuisStockage,
} from "../services/storage";

import {
  usePersistanceDonnees,
} from "./usePersistanceDonnees";

import {
  creerMatch,
} from "../domain/match";

export function useDonneesApplication() {
  const [
    matchInfo,
    setMatchInfo,
  ] = useState(() =>
    chargerDepuisStockage(
      "matchInfo",
      creerMatch()
    )
  );

  const [
    joueusesMatch,
    setJoueusesMatch,
  ] = useState(() => {
    const donnees =
      chargerDepuisStockage(
        "joueusesMatch",
        []
      );

    return Array.isArray(donnees)
      ? donnees
      : [];
  });

  const [
    evenements,
    setEvenements,
  ] = useState(() => {
    const evenementsSauvegardes =
      chargerDepuisStockage(
        "evenements",
        []
      );

    return Array.isArray(
      evenementsSauvegardes
    )
      ? evenementsSauvegardes
      : [];
  });

  usePersistanceDonnees({
    matchInfo,
    evenements,
    joueusesMatch,
  });

  return {
    matchInfo,
    setMatchInfo,

    evenements,
    setEvenements,

    joueusesMatch,
    setJoueusesMatch,
  };
}