import { useState } from "react";

export function useButs() {
  const [fenetreButOuverte, setFenetreButOuverte] = useState(false);
  const [equipeBut, setEquipeBut] = useState("");
  const [tempsTableau, setTempsTableau] = useState("");
  const [numeroButeuse, setNumeroButeuse] = useState("");
  const [assistante1, setAssistante1] = useState("");
  const [assistante2, setAssistante2] = useState("");

  function ouvrir(equipe) {
    setEquipeBut(equipe);
    setTempsTableau("");
    setNumeroButeuse("");
    setAssistante1("");
    setAssistante2("");
    setFenetreButOuverte(true);
  }

  function fermer() {
    setFenetreButOuverte(false);
  }

  return {
    fenetreButOuverte,
    equipeBut,
    tempsTableau,
    numeroButeuse,
    assistante1,
    assistante2,

    setTempsTableau,
    setNumeroButeuse,
    setAssistante1,
    setAssistante2,
    setEquipeBut,

    ouvrir,
    fermer,
  };
}