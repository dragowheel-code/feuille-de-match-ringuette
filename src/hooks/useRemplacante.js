import { useState } from "react";

export function useRemplacante() {
  const [equipeProvenance, setEquipeProvenance] =
    useState("");

  const [equipeRemplacante, setEquipeRemplacante] =
    useState("");

  const [modeRemplacante, setModeRemplacante] =
    useState("existante");

  const [joueuseSelectionnee, setJoueuseSelectionnee] =
    useState("");

  const [numeroRemplacante, setNumeroRemplacante] =
    useState("");

  const [nomRemplacante, setNomRemplacante] =
    useState("");

  function ouvrir(equipeNom) {
    setEquipeRemplacante(equipeNom);
    setEquipeProvenance("");
    setJoueuseSelectionnee("");
    setModeRemplacante("existante");
    setNumeroRemplacante("");
    setNomRemplacante("");
  }

  function reinitialiser() {
    setEquipeProvenance("");
    setEquipeRemplacante("");
    setModeRemplacante("existante");
    setJoueuseSelectionnee("");
    setNumeroRemplacante("");
    setNomRemplacante("");
  }

  return {
    equipeProvenance,
    setEquipeProvenance,

    equipeRemplacante,
    setEquipeRemplacante,

    modeRemplacante,
    setModeRemplacante,

    joueuseSelectionnee,
    setJoueuseSelectionnee,

    numeroRemplacante,
    setNumeroRemplacante,

    nomRemplacante,
    setNomRemplacante,

    ouvrir,
    reinitialiser,
  };
}