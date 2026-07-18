export function useGestionPartie({
  matchInfo,
  setMatchInfo,
  setPeriode,
  setEvenements,
  setJoueuses,
}) {
  function validerFeuilleMatch() {
    const erreurs = [];

    if (!matchInfo.numeroPartie) {
      erreurs.push("Numéro de partie manquant");
    }

    if (!matchInfo.date) {
      erreurs.push("Date manquante");
    }

    if (!matchInfo.equipeLocale) {
      erreurs.push("Équipe locale non sélectionnée");
    }

    if (!matchInfo.equipeVisiteuse) {
      erreurs.push("Équipe visiteuse non sélectionnée");
    }

    if (!matchInfo.arbitrePrincipal) {
      erreurs.push("Arbitre principal manquant");
    }

    return erreurs;
  }

  function supprimerEvenement(id) {
    setEvenements((anciensEvenements) =>
      anciensEvenements.filter(
        (event) => event.id !== id
      )
    );
  }

  function nouvellePartie() {
    setPeriode("1");
    setEvenements([]);
    setJoueuses((anciennesJoueuses) =>
  anciennesJoueuses.filter((joueuse) => !joueuse.remplacante)
);

    setMatchInfo((anciennesInformations) => ({
      ...anciennesInformations,
      numeroPartie: "",
      date: "",
      arena: "",
      equipeLocale: "",
      equipeVisiteuse: "",
      heureDebut: "",
      heureFin: "",
    }));
  }

  function effacerSauvegarde() {
    if (!confirm("Effacer toutes les données sauvegardées ?")) {
      return;
    }

    localStorage.removeItem("matchInfo");
    localStorage.removeItem("equipes");
    localStorage.removeItem("joueuses");
    localStorage.removeItem("evenements");
    localStorage.removeItem("officiels");

    window.location.reload();
  }

  return {
    validerFeuilleMatch,
    supprimerEvenement,
    nouvellePartie,
    effacerSauvegarde,
  };
}