import { useState } from "react";

export function useTempsMort() {
  const [fenetreTempsMortOuverte, setFenetreTempsMortOuverte] =
    useState(false);

  const [equipeTempsMort, setEquipeTempsMort] =
    useState("Local");

  function ouvrir() {
    setEquipeTempsMort("Local");
    setFenetreTempsMortOuverte(true);
  }

  function fermer() {
    setFenetreTempsMortOuverte(false);
  }

  return {
    fenetreTempsMortOuverte,
    equipeTempsMort,
    setEquipeTempsMort,
    ouvrir,
    fermer,
  };
}