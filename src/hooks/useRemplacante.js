import { useState } from "react";

export function useRemplacante() {
  const [equipeRemplacante, setEquipeRemplacante] =
    useState("");

  const [numeroRemplacante, setNumeroRemplacante] =
    useState("");

  const [nomRemplacante, setNomRemplacante] =
    useState("");

  function ouvrir(equipeNom) {
    setEquipeRemplacante(equipeNom);
    setNumeroRemplacante("");
    setNomRemplacante("");
  }

  function reinitialiser() {
    setEquipeRemplacante("");
    setNumeroRemplacante("");
    setNomRemplacante("");
  }

  return {
    equipeRemplacante,
    numeroRemplacante,
    nomRemplacante,

    setEquipeRemplacante,
    setNumeroRemplacante,
    setNomRemplacante,

    ouvrir,
    reinitialiser,
  };
}