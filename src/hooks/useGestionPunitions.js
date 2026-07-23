import {
  creerPunition,
  creerPenalite,
  trouverDefinitionPenalite,
} from "../domain/punitions";
import { calculerTempsCorrige, } from "../utils/temps";
import { trouverJoueuse } from "../utils/joueuses";
import { validerPunition } from "../utils/validations";
import {
  ajouterEvenementAuDebut,
  creerEvenementPunition,
} from "../domain/evenements";

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
const penalitesActives =
  (punition.penalites ?? []).slice(
    0,
    punition.nombrePenalites
  );

if (
  penalitesActives.length === 0 ||
  penalitesActives.some(
    (penalite) => !penalite.libelle
  )
) {
  alert("Choisis toutes les pénalités.");
  return;
}

const penalitesValidees = penalitesActives.map(
  (penalite) => {
    const definition =
  trouverDefinitionPenalite(
    penalite.libelle
  );

    if (!definition) {
      return null;
    }

   return creerPenalite({
  libelle: penalite.libelle,
  code: definition.code,
  lettre: definition.lettre ?? null,
  duree: penalite.duree,
  categorie: definition.categorie,
  annulableParBut:
    definition.annulableParBut === true,
});
  }
);

if (
  penalitesValidees.some(
    (penalite) => penalite === null
  )
) {
  alert(
    "Une des pénalités sélectionnées est invalide."
  );
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
 const donneesPunition = creerPunition({
  equipe: punition.equipePunition,
  equipeNom: equipeNomPourPunition,
  periode,
  tempsTableau:
    punition.tempsPunitionTableau,
  tempsCorrige,

  joueuseNumero:
    punition.joueusePunition,

  joueuseNom: joueuses?.nom || "",

  purgeeParNumero:
    punition.joueusePurgeePar,

  penalites: penalitesValidees,
});

const nouvelEvenement =
  creerEvenementPunition(donneesPunition);

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
