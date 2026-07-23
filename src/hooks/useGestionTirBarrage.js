import { trouverJoueuse } from "../utils/joueuses";

import {
  creerEvenementTirBarrage,
} from "../domain/evenements";

export function useGestionTirBarrage({
  matchInfo,
  joueuses,
  setEvenements,
  tirBarrage,
}) {
  const equipeNomPourTirBarrage =
    tirBarrage.equipeTirBarrage === "Local"
      ? matchInfo.equipeLocale
      : matchInfo.equipeVisiteuse;

  function ouvrirFenetreTirBarrage() {
    tirBarrage.ouvrir();
  }

  function confirmerTirBarrage() {
    if (!tirBarrage.joueuseTirBarrage) {
      alert("Choisis la joueuse du tir de barrage.");
      return;
    }

    const joueuse = trouverJoueuse(
      joueuses,
      tirBarrage.joueuseTirBarrage,
      equipeNomPourTirBarrage
    );

    if (joueuse?.suspendue) {
      alert(
        "Une joueuse suspendue ne peut pas effectuer un tir de barrage."
      );
      return;
    }

    const nouvelEvenement =
      creerEvenementTirBarrage({
        equipe: tirBarrage.equipeTirBarrage,
        equipeNom: equipeNomPourTirBarrage,
        periode: "T.B.",
        joueuseNumero:
          tirBarrage.joueuseTirBarrage,
        joueuseNom: joueuse?.nom || "",
        reussi: tirBarrage.tirBarrageReussi,
      });

    setEvenements((anciensEvenements) => [
      ...anciensEvenements,
      nouvelEvenement,
    ]);

    tirBarrage.fermer();
  }

  return {
    equipeNomPourTirBarrage,
    ouvrirFenetreTirBarrage,
    confirmerTirBarrage,
  };
}