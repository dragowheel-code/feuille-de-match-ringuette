export function creerMatch(valeurs = {}) {
  return {
    numeroPartie: "",
    date: "",
    arena: "",
    calibre: "U12",
    equipeLocale: "",
    equipeVisiteuse: "",
    couleurLocaleChoisie: "primaire",
    couleurVisiteuseChoisie: "primaire",
    arbitrePrincipal: "",
    arbitreSecondaire: "",
    chronometreur: "",
    marqueur: "",
    operateur30s: "",
    heureDebut: "",
    heureFin: "",
    envoyerCourrielLocal: true,
    envoyerCourrielVisiteur: false,
    courrielPersonnalise: "",
    ...valeurs,
  };
}