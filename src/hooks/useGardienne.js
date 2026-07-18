import { useState } from "react";

export function useGardienne() {
  const [fenetreGardienneOuverte, setFenetreGardienneOuverte] =
    useState(false);

  const [equipeGardienne, setEquipeGardienne] =
    useState("Local");

  const [tempsGardienneTableau, setTempsGardienneTableau] =
    useState("");

  function ouvrir() {
    setEquipeGardienne("Local");
    setTempsGardienneTableau("");
    setFenetreGardienneOuverte(true);
  }

  function fermer() {
    setFenetreGardienneOuverte(false);
  }

  return {
    fenetreGardienneOuverte,
    equipeGardienne,
    setEquipeGardienne,
    tempsGardienneTableau,
    setTempsGardienneTableau,
    ouvrir,
    fermer,
  };
}