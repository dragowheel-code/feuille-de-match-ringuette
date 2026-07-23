import {
  ajouterEvenementAuDebut,
  creerEvenementGardienne,
} from "../domain/evenements";

import { calculerTempsCorrige } from "../utils/temps";

export function useGestionGardienne({
  matchInfo,
  periode,
  dureePeriode,
  evenements,
  setEvenements,
  gardienne,
}) {
  const equipeNomPourGardienne =
    gardienne.equipeGardienne === "Local"
      ? matchInfo.equipeLocale
      : matchInfo.equipeVisiteuse;

  function ouvrirFenetreGardienne() {
    gardienne.ouvrir();
  }

  function confirmerChangementGardienne() {
    const changementExiste = evenements.some(
      (event) =>
        event.type === "Changement gardienne" &&
        event.equipe === gardienne.equipeGardienne
    );

    if (changementExiste) {
      alert(
        "Cette équipe a déjà utilisé son changement de gardienne."
      );
      return;
    }

    if (!gardienne.tempsGardienneTableau.trim()) {
      alert("Entre le temps affiché au tableau.");
      return;
    }

    const tempsCorrige = calculerTempsCorrige(
      gardienne.tempsGardienneTableau,
      dureePeriode
    );

    if (!tempsCorrige) {
      alert("Le temps doit être valide. Exemple : 08:32");
      return;
    }

    const nouvelEvenement = creerEvenementGardienne({
      equipe: gardienne.equipeGardienne,
      equipeNom: equipeNomPourGardienne,
      periode,
      tempsTableau: gardienne.tempsGardienneTableau,
      tempsCorrige,
    });

    setEvenements((anciensEvenements) =>
      ajouterEvenementAuDebut(
        anciensEvenements,
        nouvelEvenement
      )
    );

    gardienne.fermer();
  }

  return {
    equipeNomPourGardienne,
    ouvrirFenetreGardienne,
    confirmerChangementGardienne,
  };
}