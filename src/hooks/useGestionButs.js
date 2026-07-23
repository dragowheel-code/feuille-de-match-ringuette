import { creerEvenementBut, ajouterEvenementAuDebut } from "../domain/evenements";
import { trouverJoueuse } from "../utils/joueuses";
import { calculerTempsCorrige } from "../utils/temps";
import { validerBut } from "../utils/validations";
import { mettreAJourPunitionApresBut, trouverPortionActive, } from "../domain/punitions";

export function useGestionButs({
  matchInfo,
  periode,
  dureePeriode,
  joueuses,
  evenements,
  setEvenements,
  buts,
  annulationPunition,
}) {
  function ouvrirFenetreBut(equipe) {
    if (!matchInfo.equipeLocale || !matchInfo.equipeVisiteuse) {
      alert("Configure ou importe les équipes avant d'ajouter un but.");
      return;
    }

    buts.ouvrir(equipe);
  }

  function trouverPunitionsActives(
  equipeQuiMarque,
  tempsButCorrige
) {
  const equipeAdverse =
    equipeQuiMarque === "Local" ? "Visiteur" : "Local";

  return evenements.filter((event) => {
    if (event.type !== "Punition") {
      return false;
    }

    if (event.equipe !== equipeAdverse) {
      return false;
    }
   
    const portionActive = trouverPortionActive(
      event.portions ?? []
    );

    if (!portionActive) {
      return false;
    }

    if (!portionActive.annulableParBut) {
      return false;
    }

    return (
      portionActive.tempsRetour &&
      portionActive.tempsRetour > tempsButCorrige
    );
  });
}

  function confirmerBut() {
    if (!buts.tempsTableau.trim()) {
      alert("Entre le temps affiché au tableau.");
      return;
    }

    const tempsCorrige = calculerTempsCorrige(
      buts.tempsTableau,
      dureePeriode
    );

    if (!tempsCorrige) {
      alert("Le temps doit être valide. Exemple : 08:32");
      return;
    }

    if (!buts.numeroButeuse) {
      alert("Choisis la joueuse qui a compté.");
      return;
    }

    const erreur = validerBut(
      buts.numeroButeuse,
      buts.assistante1,
      buts.assistante2
    );

    if (erreur) {
      alert(erreur);
      return;
    }

    const equipeNom =
      buts.equipeBut === "Local"
        ? matchInfo.equipeLocale
        : matchInfo.equipeVisiteuse;

    const buteuse = trouverJoueuse(
      joueuses,
      buts.numeroButeuse,
      equipeNom
    );

    if (buteuse?.suspendue) {
      alert("Une joueuse suspendue ne peut pas marquer un but.");
      return;
    }

    const assistante1 = buts.assistante1
      ? trouverJoueuse(
          joueuses,
          buts.assistante1,
          equipeNom
        )
      : null;

    const assistante2 = buts.assistante2
      ? trouverJoueuse(
          joueuses,
          buts.assistante2,
          equipeNom
        )
      : null;

    if (
      assistante1?.suspendue ||
      assistante2?.suspendue
    ) {
      alert(
        "Une joueuse suspendue ne peut pas recevoir une assistance."
      );
      return;
    }

    const nouvelEvenement = creerEvenementBut({
      equipe: buts.equipeBut,
      equipeNom,
      periode,
      tempsTableau: buts.tempsTableau,
      tempsCorrige,
      buteuseNumero: buts.numeroButeuse,
      buteuseNom: buteuse?.nom || "",
      assistante1Numero: buts.assistante1,
      assistante1Nom: assistante1?.nom || "",
      assistante2Numero: buts.assistante2,
      assistante2Nom: assistante2?.nom || "",
    });

    const punitionsActives = trouverPunitionsActives(
      buts.equipeBut,
      tempsCorrige
    );

    if (punitionsActives.length > 0) {
      buts.fermer();

      annulationPunition.ouvrir(
        nouvelEvenement,
        punitionsActives
      );

      return;
    }

    setEvenements((anciensEvenements) =>
      ajouterEvenementAuDebut(
        anciensEvenements,
        nouvelEvenement
      )
    );

    buts.fermer();
  }

  function confirmerButSansAnnulation() {
    if (!annulationPunition.butEnAttente) {
      return;
    }

    setEvenements((anciensEvenements) =>
      ajouterEvenementAuDebut(
        anciensEvenements,
        annulationPunition.butEnAttente
      )
    );

    annulationPunition.reinitialiser();
  }

  function confirmerAnnulationPunition() {
    if (!annulationPunition.punitionSelectionnee) {
      alert("Choisis une punition à annuler.");
      return;
    }

    if (!annulationPunition.butEnAttente) {
      return;
    }

    const idPunition = String(
      annulationPunition.punitionSelectionnee
    );

    setEvenements((anciensEvenements) => {
  const evenementsMisAJour = anciensEvenements.map(
    (event) =>
      String(event.id) === idPunition
        ? mettreAJourPunitionApresBut(
            event,
            annulationPunition.butEnAttente
              .tempsCorrige
          )
        : event
  );

  return ajouterEvenementAuDebut(
    evenementsMisAJour,
    annulationPunition.butEnAttente
  );
});

    annulationPunition.reinitialiser();
  }

  function retirerDernierBut(equipe) {
    const dernierBut = evenements.find(
      (event) =>
        event.type === "But" &&
        event.equipe === equipe
    );

    if (!dernierBut) {
      return;
    }

    setEvenements((anciensEvenements) =>
      anciensEvenements.filter(
        (event) => event.id !== dernierBut.id
      )
    );
  }

  return {
    ouvrirFenetreBut,
    confirmerBut,
    confirmerButSansAnnulation,
    confirmerAnnulationPunition,
    retirerDernierBut,
  };
}