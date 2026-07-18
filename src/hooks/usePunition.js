import { useState } from "react";

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

  const [typePunition, setTypePunition] =
    useState("ACCROCHER / HOOKING");

  const [dureePunition, setDureePunition] =
    useState("2");

  const [
    nombrePortionsPunition,
    setNombrePortionsPunition,
  ] = useState(1);

  function ouvrir() {
    setEquipePunition("Local");
    setTempsPunitionTableau("");
    setJoueusePunition("");
    setJoueusePurgeePar("");
    setTypePunition("ACCROCHER / HOOKING");
    setDureePunition("2");
    setNombrePortionsPunition(1);
    setFenetrePunitionOuverte(true);
  }

  function fermer() {
    setFenetrePunitionOuverte(false);
  }

  function reinitialiser() {
    setTempsPunitionTableau("");
    setJoueusePunition("");
    setJoueusePurgeePar("");
    setNombrePortionsPunition(1);
  }

  return {
    fenetrePunitionOuverte,
    equipePunition,
    tempsPunitionTableau,
    joueusePunition,
    joueusePurgeePar,
    typePunition,
    dureePunition,
    nombrePortionsPunition,

    setEquipePunition,
    setTempsPunitionTableau,
    setJoueusePunition,
    setJoueusePurgeePar,
    setTypePunition,
    setDureePunition,
    setNombrePortionsPunition,

    ouvrir,
    fermer,
    reinitialiser,
  };
}