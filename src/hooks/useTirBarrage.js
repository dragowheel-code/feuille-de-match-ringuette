import { useState } from "react";

export function useTirBarrage() {
  const [fenetreTirBarrageOuverte, setFenetreTirBarrageOuverte] =
    useState(false);
  const [equipeTirBarrage, setEquipeTirBarrage] = useState("Local");
  const [joueuseTirBarrage, setJoueuseTirBarrage] = useState("");
  const [tirBarrageReussi, setTirBarrageReussi] = useState(false);

  function ouvrir() {
    setEquipeTirBarrage("Local");
    setJoueuseTirBarrage("");
    setTirBarrageReussi(false);
    setFenetreTirBarrageOuverte(true);
  }

  function fermer() {
    setFenetreTirBarrageOuverte(false);
  }

  return {
    fenetreTirBarrageOuverte,
    equipeTirBarrage,
    joueuseTirBarrage,
    tirBarrageReussi,

    setEquipeTirBarrage,
    setJoueuseTirBarrage,
    setTirBarrageReussi,

    ouvrir,
    fermer,
  };
}