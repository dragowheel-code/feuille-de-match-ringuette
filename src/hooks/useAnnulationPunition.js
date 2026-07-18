import { useState } from "react";

export function useAnnulationPunition() {
  const [
    fenetreAnnulationOuverte,
    setFenetreAnnulationOuverte,
  ] = useState(false);

  const [butEnAttente, setButEnAttente] =
    useState(null);

  const [
    punitionsAnnulables,
    setPunitionsAnnulables,
  ] = useState([]);

  const [
    punitionSelectionnee,
    setPunitionSelectionnee,
  ] = useState("");

  function ouvrir(but, punitions) {
    setButEnAttente(but);
    setPunitionsAnnulables(punitions);
    setPunitionSelectionnee("");
    setFenetreAnnulationOuverte(true);
  }

  function fermer() {
    setFenetreAnnulationOuverte(false);
  }

  function reinitialiser() {
    setButEnAttente(null);
    setPunitionsAnnulables([]);
    setPunitionSelectionnee("");
    setFenetreAnnulationOuverte(false);
  }

  return {
    fenetreAnnulationOuverte,
    butEnAttente,
    punitionsAnnulables,
    punitionSelectionnee,

    setButEnAttente,
    setPunitionsAnnulables,
    setPunitionSelectionnee,

    ouvrir,
    fermer,
    reinitialiser,
  };
}