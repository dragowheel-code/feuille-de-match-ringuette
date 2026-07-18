import { creerId } from "../utils/ids";

import {
  ajouterMinutes,
  calculerTempsCorrige,
} from "../utils/temps";

import { trouverJoueuse } from "../utils/joueuses";
import { validerPunition } from "../utils/validations";
import { PENALITES } from "../constants/penalites";

import {
  ajouterEvenementAuDebut,
  creerEvenementPunition,
} from "../services/evenements";

export function useGestionPunitions({
  matchInfo,
  periode,
  dureePeriode,
  joueuses,
  setEvenements,
  punition,
}) {
  const equipeNomPourPunition =
    punition.equipePunition === "Local"
      ? matchInfo.equipeLocale
      : matchInfo.equipeVisiteuse;

  function ouvrirFenetrePunition() {
    punition.ouvrir();
  }

  function confirmerPunition() {
    if (!punition.tempsPunitionTableau.trim()) {
      alert("Entre le temps affiché au tableau.");
      return;
    }

    const tempsCorrige = calculerTempsCorrige(
      punition.tempsPunitionTableau,
      dureePeriode
    );

    if (!tempsCorrige) {
      alert("Le temps doit être valide. Exemple : 08:32");
      return;
    }

    if (!punition.joueusePunition) {
      alert("Choisis la joueuse punie.");
      return;
    }

    if (!punition.typePunition) {
      alert("Choisis une punition.");
      return;
    }

    const joueuse = trouverJoueuse(
      joueuses,
      punition.joueusePunition,
      equipeNomPourPunition
    );

    const erreur = validerPunition(
      joueuse,
      punition.joueusePunition,
      punition.joueusePurgeePar
    );

    if (erreur) {
      alert(erreur);
      return;
    }

    const penaliteSelectionnee = PENALITES.find(
      (penalite) =>
        penalite.valeur === punition.typePunition
    );

    if (!penaliteSelectionnee) {
      alert("La pénalité sélectionnée est invalide.");
      return;
    }

    const tempsSortie = tempsCorrige;

    const portions = Array.from(
      {
        length: punition.nombrePortionsPunition,
      },
      (_, index) => {
        const debutPortion = ajouterMinutes(
          tempsSortie,
          index * Number(punition.dureePunition)
        );

        const finPortion = ajouterMinutes(
          debutPortion,
          Number(punition.dureePunition)
        );

        return {
          id: creerId(),
          numero: index + 1,
          duree: Number(punition.dureePunition),
          tempsDebut: debutPortion,
          tempsFinPrevue: finPortion,
          tempsRetour: finPortion,
          annulableParBut:
            penaliteSelectionnee.annulableParBut === true,
          annuleeParBut: false,
        };
      }
    );

    const tempsFinPrevue =
      portions.length > 0
        ? portions[portions.length - 1].tempsFinPrevue
        : tempsSortie;

    const nouvelEvenement = creerEvenementPunition({
      equipe: punition.equipePunition,
      equipeNom: equipeNomPourPunition,
      periode,
      tempsTableau: punition.tempsPunitionTableau,
      tempsCorrige,

      joueuseNumero: punition.joueusePunition,
      joueuseNom: joueuse?.nom || "",
      purgeeParNumero: punition.joueusePurgeePar,

      punition: punition.typePunition,
      categorie: penaliteSelectionnee.categorie,

      nombrePortions: punition.nombrePortionsPunition,
      dureeParPortion: Number(punition.dureePunition),
      dureeTotale:
        Number(punition.dureePunition) *
        punition.nombrePortionsPunition,

      tempsSortie,
      tempsDebut: tempsSortie,
      tempsFinPrevue,
      tempsRetour: tempsFinPrevue,

      annulableParBut:
        penaliteSelectionnee.annulableParBut === true,
      annuleeParBut: false,

      portions,
    });

    setEvenements((anciensEvenements) =>
      ajouterEvenementAuDebut(
        anciensEvenements,
        nouvelEvenement
      )
    );

    punition.fermer();
    punition.reinitialiser();
  }

  return {
    equipeNomPourPunition,
    ouvrirFenetrePunition,
    confirmerPunition,
  };
}