import { useState } from "react";

export function useSuppressionEquipe() {
  const [equipeASupprimer, setEquipeASupprimer] =
    useState("");

  function reinitialiser() {
    setEquipeASupprimer("");
  }

  return {
    equipeASupprimer,
    setEquipeASupprimer,
    reinitialiser,
  };
}