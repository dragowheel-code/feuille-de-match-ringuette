import { useState } from "react";

export function useSuppressionOfficiel() {
  const [officielASupprimer, setOfficielASupprimer] =
    useState("");

  function reinitialiser() {
    setOfficielASupprimer("");
  }

  return {
    officielASupprimer,
    setOfficielASupprimer,
    reinitialiser,
  };
}