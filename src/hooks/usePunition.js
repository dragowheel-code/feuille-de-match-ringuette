import { useState } from "react";

const PENALITE_INITIALE = {
  type: "ACCROCHER / HOOKING",
  duree: 2,
};

export function usePunition() {
  const [fenetrePunitionOuverte, setFenetrePunitionOuverte] =
    useState(false);

  const [equipePunition, setEquipePunition] =
    useState("Local");

  const [tempsPunitionTableau, setTempsPunitionTableau] =
    useState("");

  const [joueusePunition, setJoueusePunition] =
    useState("");

  const [joueusePurgeePar, setJoueusePurgeePar] =
    useState("");

  const [penalites, setPenalites] = useState([
    { ...PENALITE_INITIALE },
  ]);

  const [nombrePenalites, setNombrePenalites] =
    useState(1);

  function reinitialiserChamps() {
    setTempsPunitionTableau("");
    setJoueusePunition("");
    setJoueusePurgeePar("");
    setNombrePenalites(1);
    setPenalites([{ ...PENALITE_INITIALE }]);
  }

  function ouvrir() {
    setEquipePunition("Local");
    reinitialiserChamps();
    setFenetrePunitionOuverte(true);
  }

  function fermer() {
    setFenetrePunitionOuverte(false);
  }

  function reinitialiser() {
    reinitialiserChamps();
  }

  return {
    fenetrePunitionOuverte,
    equipePunition,
    tempsPunitionTableau,
    joueusePunition,
    joueusePurgeePar,

    penalites,
    setPenalites,

    nombrePenalites,
    setNombrePenalites,

    setEquipePunition,
    setTempsPunitionTableau,
    setJoueusePunition,
    setJoueusePurgeePar,

    ouvrir,
    fermer,
    reinitialiser,
  };
}