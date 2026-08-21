export function creerMatch(valeurs = {}) {
  return {
    numeroPartie: "",
    date: "",
    arena: "",
    calibre: "U12",

    typeConfiguration: "local",
    associationLocaleId: "",
    associationVisiteuseId: "",
    tournoiId: "",

    equipeLocaleId: "",
    equipeVisiteuseId: "",

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