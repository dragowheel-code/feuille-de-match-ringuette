import { useState } from "react";
import { chargerDepuisStockage } from "../services/storage";
import { usePersistanceDonnees } from "./usePersistanceDonnees";

const MATCH_INFO_INITIAL = {
  numeroPartie: "",
  date: "",
  arena: "",
  calibre: "U12",
  equipeLocale: "",
  equipeVisiteuse: "",
  couleurLocaleChoisie: "primaire",
  couleurVisiteuseChoisie: "primaire",
  arbitrePrincipal: "",
  arbitreSecondaire: "",
  chronometreur: "",
  marqueur: "",
  operateur30s: "",
  heureDebut: "",
  heureFin: "",
  envoyerCourrielLocal: true,
  envoyerCourrielVisiteur: false,
  courrielPersonnalise: "",
};

export function useDonneesApplication() {
  const [officiels, setOfficiels] = useState(() =>
    chargerDepuisStockage("officiels", [])
  );

  const [matchInfo, setMatchInfo] = useState(() =>
    chargerDepuisStockage(
      "matchInfo",
      MATCH_INFO_INITIAL
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