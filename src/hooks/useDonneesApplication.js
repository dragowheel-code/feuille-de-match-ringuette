import { useState } from "react";
import { chargerDepuisStockage } from "../services/storage";
import { usePersistanceDonnees } from "./usePersistanceDonnees";
import { creerMatch } from "../domain/match";

export function useDonneesApplication() {
  const [officiels, setOfficiels] = useState(() =>
    chargerDepuisStockage("officiels", [])
  );

  const [matchInfo, setMatchInfo] = useState(() =>
    chargerDepuisStockage(
  "matchInfo",
  creerMatch()
)
  );

  const [equipes, setEquipes] = useState(() =>
    chargerDepuisStockage("equipes", [])
  );

  const [joueuses, setJoueuses] = useState(() =>
    chargerDepuisStockage("joueuses", [])
  );

  const [evenements, setEvenements] = useState(() =>
    chargerDepuisStockage("evenements", [])
  );

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