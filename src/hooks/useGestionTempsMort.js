import {
  ajouterEvenementAuDebut,
  creerEvenementTempsMort,
} from "../domain/evenements";
import { TYPES_EVENEMENT, } from "../domain/evenements";

export function useGestionTempsMort({
  matchInfo,
  periode,
  evenements,
  setEvenements,
  tempsMort,
}) {
  function ouvrirFenetreTempsMort() {
    tempsMort.ouvrir();
  }

  function confirmerTempsMort() {
    const dejaUtilise = evenements.some(
      (event) =>
        event.type === TYPES_EVENEMENT.TEMPS_MORT &&
        event.equipe === tempsMort.equipeTempsMort &&
        event.periode === periode
    );

    if (dejaUtilise) {
      alert(
        "Cette équipe a déjà utilisé son temps mort pour cette période."
      );
      return;
    }

    const nouvelEvenement = creerEvenementTempsMort({
      equipe: tempsMort.equipeTempsMort,
      equipeNom:
        tempsMort.equipeTempsMort === "Local"
          ? matchInfo.equipeLocale
          : matchInfo.equipeVisiteuse,
      periode,
    });

    setEvenements((anciensEvenements) =>
      ajouterEvenementAuDebut(
        anciensEvenements,
        nouvelEvenement
      )
    );

    tempsMort.fermer();
  }

  return {
    ouvrirFenetreTempsMort,
    confirmerTempsMort,
  };
}