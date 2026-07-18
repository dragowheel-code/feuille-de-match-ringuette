import { useState } from "react";

export function useSuppressionJoueuse() {
  const [
    equipeSuppressionJoueuse,
    setEquipeSuppressionJoueuse,
  ] = useState("");

  const [
    joueuseASupprimer,
    setJoueuseASupprimer,
  ] = useState("");

  function reinitialiser() {
    setEquipeSuppressionJoueuse("");
    setJoueuseASupprimer("");
  }

  return {
    equipeSuppressionJoueuse,
    setEquipeSuppressionJoueuse,

    joueuseASupprimer,
    setJoueuseASupprimer,

    reinitialiser,
  };
}