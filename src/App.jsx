import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logoRingette from "./assets/logo-ringette.png";
import "./App.css";

const couleurs = {
  Bleu: "#003DA5",
  Blanc: "#FFFFFF",
  Noir: "#000000",
  Rouge: "#C8102E",
  Jaune: "#F7D117",
  Vert: "#00843D",
  Orange: "#FF8200",
  Rose: "#FF69B4",
  Mauve: "#7B2CBF",
  Gris: "#808080",
  Marine: "#001F5B",
  Turquoise: "#00B5E2",
};
function chargerDepuisStockage(cle, valeurDefaut) {
  const donnees = localStorage.getItem(cle);

  if (!donnees) {
    return valeurDefaut;
  }

  try {
    return JSON.parse(donnees);
  } catch {
    return valeurDefaut;
  }
}

function App() {
  const [pageActive, setPageActive] = useState("match");
  const [fenetreTirBarrageOuverte, setFenetreTirBarrageOuverte] = useState(false);
  const [equipeTirBarrage, setEquipeTirBarrage] = useState("Local");
  const [joueuseTirBarrage, setJoueuseTirBarrage] = useState("");
  const [tirBarrageReussi, setTirBarrageReussi] = useState(false);
  const [periode, setPeriode] = useState("1");
  const [dureePeriode, setDureePeriode] = useState(12);
  const [fenetreConfigOuverte, setFenetreConfigOuverte] = useState(false);
  const [fenetreImportOuverte, setFenetreImportOuverte] = useState(false);
  const [fenetreRemplacanteOuverte, setFenetreRemplacanteOuverte] = useState(false);
  const [equipeRemplacante, setEquipeRemplacante] = useState("");
  const [numeroRemplacante, setNumeroRemplacante] = useState("");
  const [nomRemplacante, setNomRemplacante] = useState("");
  const [fenetreSuppressionEquipeOuverte, setFenetreSuppressionEquipeOuverte] = useState(false);
  const [equipeASupprimer, setEquipeASupprimer] = useState("");
  const [fenetreListeOfficielsOuverte, setFenetreListeOfficielsOuverte] = useState(false);
  const [fenetreSuppressionOfficielOuverte, setFenetreSuppressionOfficielOuverte] = useState(false);
  const [officielASupprimer, setOfficielASupprimer] = useState("");
  const [fenetreSuppressionJoueuseOuverte, setFenetreSuppressionJoueuseOuverte] = useState(false);
  const [equipeSuppressionJoueuse, setEquipeSuppressionJoueuse] = useState("");
  const [joueuseASupprimer, setJoueuseASupprimer] = useState("");
  const [fenetreGardienneOuverte, setFenetreGardienneOuverte] = useState(false);
  const [equipeGardienne, setEquipeGardienne] = useState("Local");
  const [tempsGardienneTableau, setTempsGardienneTableau] = useState("");
  const [gardienneSortante, setGardienneSortante] = useState("");
  const [gardienneEntrante, setGardienneEntrante] = useState("");
  const [fenetreTempsMortOuverte, setFenetreTempsMortOuverte] = useState(false);
  const [equipeTempsMort, setEquipeTempsMort] = useState("Local");
  const [officiels, setOfficiels] = useState(() =>chargerDepuisStockage("officiels", []));
  const [matchInfo, setMatchInfo] = useState(() =>  chargerDepuisStockage("matchInfo", {
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
  }));
  function ouvrirFenetreTempsMort() {
  setEquipeTempsMort("Local");
  setFenetreTempsMortOuverte(true);
}

function confirmerTempsMort() {
  const dejaUtilise = evenements.some(
    (event) =>
      event.type === "Temps mort" &&
      event.equipe === equipeTempsMort &&
      event.periode === periode
  );

  if (dejaUtilise) {
    alert("Cette équipe a déjà utilisé son temps mort pour cette période.");
    return;
  }

  const nouvelEvenement = {
    id: Date.now(),
    type: "Temps mort",
    equipe: equipeTempsMort,
    equipeNom:
      equipeTempsMort === "Local"
        ? matchInfo.equipeLocale
        : matchInfo.equipeVisiteuse,
    periode,
  };

  setEvenements([nouvelEvenement, ...evenements]);
  setFenetreTempsMortOuverte(false);
}
  function validerFeuilleMatch() {
  const erreurs = [];

  if (!matchInfo.numeroPartie)
    erreurs.push("Numéro de partie manquant");

  if (!matchInfo.date)
    erreurs.push("Date manquante");

  if (!matchInfo.equipeLocale)
    erreurs.push("Équipe locale non sélectionnée");

  if (!matchInfo.equipeVisiteuse)
    erreurs.push("Équipe visiteuse non sélectionnée");

  if (!matchInfo.arbitrePrincipal)
    erreurs.push("Arbitre principal manquant");

if (destinataires.length === 0) {
    alert("Aucun destinataire sélectionné.");
    return;
  }
  return erreurs;
}
  function exporterBaseDeDonnees() {
  const donnees = {
    version: "1.0",
    dateExport: new Date().toISOString(),
    equipes,
    joueuses,
  };

  const blob = new Blob(
    [JSON.stringify(donnees, null, 2)],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(blob);

  const lien = document.createElement("a");
  lien.href = url;
  lien.download = `RinguetteDB-${new Date()
    .toISOString()
    .slice(0, 10)}.json`;

  lien.click();

  URL.revokeObjectURL(url);
}
function importerBaseDeDonnees(event) {
  const fichier = event.target.files[0];

  if (!fichier) return;

  const lecteur = new FileReader();

  lecteur.onload = (e) => {
    try {
      const donnees = JSON.parse(e.target.result);

      if (!donnees.equipes || !donnees.joueuses) {
        alert("Fichier invalide.");
        return;
      }

      if (
        !confirm(
          "Cette opération remplacera les équipes et joueuses actuelles. Continuer ?"
        )
      ) {
        return;
      }

      setEquipes(donnees.equipes);
      setJoueuses(donnees.joueuses);

      alert("Base de données importée.");
    } catch {
      alert("Impossible de lire ce fichier.");
    }
  };

  lecteur.readAsText(fichier);
}
  function ouvrirFenetreRemplacante(equipeNom) {
  setEquipeRemplacante(equipeNom);
  setNumeroRemplacante("");
  setNomRemplacante("");
  setFenetreRemplacanteOuverte(true);
}

function confirmerRemplacante() {
  if (!equipeRemplacante) return;

  if (!numeroRemplacante.trim() || !nomRemplacante.trim()) {
    alert("Entre le numéro et le nom de la remplaçante.");
    return;
  }
const numeroExiste = joueuses.some(
  (joueuse) =>
    joueuse.equipe === equipeRemplacante &&
    joueuse.numero === numeroRemplacante.trim()
);

if (numeroExiste) {
  alert("Ce numéro existe déjà dans cette équipe.");
  return;
}
  const nouvelleJoueuse = {
    id: Date.now(),
    equipe: equipeRemplacante,
    numero: numeroRemplacante.trim(),
    nom: nomRemplacante.trim(),
    gardienne: false,
    capitaine: false,
    assistanteCapitaine: false,
    absente: false,
    suspendue: false,
    remplacante: true,
  };

   setJoueuses([...joueuses, nouvelleJoueuse]);

  setFenetreRemplacanteOuverte(false);
  setNumeroRemplacante("");
  setNomRemplacante("");

}
  function effacerSauvegarde() {
  if (!confirm("Effacer toutes les données sauvegardées ?")) {
    return;
  }

  localStorage.removeItem("matchInfo");
  localStorage.removeItem("equipes");
  localStorage.removeItem("joueuses");
  localStorage.removeItem("evenements");

  window.location.reload();
}
function supprimerEquipe() {
  if (!equipeASupprimer) {
    alert("Choisis une équipe à supprimer.");
    return;
  }

  if (
    !confirm(
      `Supprimer ${equipeASupprimer} et toutes ses joueuses ?`
    )
  ) {
    return;
  }

  setEquipes(equipes.filter((equipe) => equipe.nom !== equipeASupprimer));

  setJoueuses(
    joueuses.filter((joueuse) => joueuse.equipe !== equipeASupprimer)
  );

  setMatchInfo({...matchInfo,
     equipeLocale:
      matchInfo.equipeLocale === equipeASupprimer ? "" : matchInfo.equipeLocale,
    equipeVisiteuse:
      matchInfo.equipeVisiteuse === equipeASupprimer
        ? ""
        : matchInfo.equipeVisiteuse,
  });

  setEquipeASupprimer("");
  setFenetreSuppressionEquipeOuverte(false);
}
  function CouleurApercu({ nom, code }) {
  return (
    <div className="color-preview-row">
      <span
        className="color-preview-box"
        style={{ backgroundColor: code }}
      ></span>
      <span>{nom}</span>
    </div>
  );
}
function changerSuspension(id) {
  setJoueuses(
    joueuses.map((joueuse) =>
      joueuse.id === id
        ? { ...joueuse, suspendue: !joueuse.suspendue }
        : joueuse
    )
  );
}
const [heureActuelle, setHeureActuelle] = useState(new Date());
  const [equipes, setEquipes] = useState(() =>
  chargerDepuisStockage("equipes", [])
);
  const equipeLocaleData = equipes.find(
  (equipe) => equipe.nom === matchInfo.equipeLocale
);

const equipeVisiteuseData = equipes.find(
  (equipe) => equipe.nom === matchInfo.equipeVisiteuse
);

  const [joueuses, setJoueuses] = useState(() =>
  chargerDepuisStockage("joueuses", [])
);


  const [evenements, setEvenements] = useState(() =>
  chargerDepuisStockage("evenements", [])
);

  const [fenetreButOuverte, setFenetreButOuverte] = useState(false);
  const [equipeBut, setEquipeBut] = useState("");
  const [tempsTableau, setTempsTableau] = useState("");
  const [numeroButeuse, setNumeroButeuse] = useState("");
  const [assistante1, setAssistante1] = useState("");
  const [assistante2, setAssistante2] = useState("");
  const [fenetrePunitionOuverte, setFenetrePunitionOuverte] = useState(false);
  const [equipePunition, setEquipePunition] = useState("Local");
  const [tempsPunitionTableau, setTempsPunitionTableau] = useState("");
  const [joueusePunition, setJoueusePunition] = useState("");
  const [joueusePurgeePar, setJoueusePurgeePar] = useState("");
  const [typePunition, setTypePunition] = useState("ACCROCHER / HOOKING");
  const [dureePunition, setDureePunition] = useState("2");
  const [fenetreAnnulationOuverte, setFenetreAnnulationOuverte] = useState(false);
  const [butEnAttente, setButEnAttente] = useState(null);
  const [punitionsAnnulables, setPunitionsAnnulables] = useState([]);
  const [punitionSelectionnee, setPunitionSelectionnee] = useState("");
  const [fenetreParametresOuverte, setFenetreParametresOuverte] = useState(false);
  const [localOuvert, setLocalOuvert] = useState(true);
  const [visiteurOuvert, setVisiteurOuvert] = useState(false);
  
  useEffect(() => {localStorage.setItem("matchInfo", JSON.stringify(matchInfo));}, [matchInfo]);
  useEffect(() => {localStorage.setItem("equipes", JSON.stringify(equipes));}, [equipes]);
  useEffect(() => {localStorage.setItem("joueuses", JSON.stringify(joueuses));}, [joueuses]);
  useEffect(() => {localStorage.setItem("evenements", JSON.stringify(evenements));}, [evenements]);
  useEffect(() => {localStorage.setItem("officiels", JSON.stringify(officiels));}, [officiels]);
  useEffect(() => {
  const interval = setInterval(() => {
    setHeureActuelle(new Date());
  }, 1000);

  return () => clearInterval(interval);
}, []);
  const equipeNomPourBut =
    equipeBut === "Local" ? matchInfo.equipeLocale : matchInfo.equipeVisiteuse;

  const joueusesDisponibles = joueuses.filter(
    (joueuse) => joueuse.equipe === equipeNomPourBut && !joueuse.absente
  );

  const scoreLocal = evenements.filter(
    (event) => event.type === "But" && event.equipe === "Local"
  ).length;

  const scoreVisiteur = evenements.filter(
    (event) => event.type === "But" && event.equipe === "Visiteur"
  ).length;

function obtenirHeureActuelle() {
  return heureActuelle.toLocaleTimeString("en-CA", {
    hour12: false,
  });
}
  function importerEquipesExcel(event) {
  const fichier = event.target.files[0];

  if (!fichier) return;

  const lecteur = new FileReader();

  lecteur.onload = (e) => {
    const donnees = new Uint8Array(e.target.result);
    const classeur = XLSX.read(donnees, { type: "array" });
    const premiereFeuille = classeur.SheetNames[0];
    const feuille = classeur.Sheets[premiereFeuille];

    const lignes = XLSX.utils.sheet_to_json(feuille);

    const equipesImportees = lignes
  .map((ligne, index) => ({
    id: Date.now() + index,
    nom: String(ligne.Nom || "").trim(),
    ville: String(ligne.Ville || "").trim(),
    calibre: String(ligne.Calibre || "").trim(),
   nomCouleurPrimaire: String(  ligne.NomCouleurPrimaire || "Bleu").trim(),
   nomCouleurSecondaire: String(ligne.NomCouleurSecondaire || "Blanc").trim(),
   couleurPrimaire:couleurs[String(ligne.NomCouleurPrimaire || "Bleu").trim()] ||"#003DA5",
   couleurSecondaire:couleurs[String(ligne.NomCouleurSecondaire || "Blanc").trim()] ||"#FFFFFF",
   entraineurChef: String(ligne.EntraineurChef || "").trim(),
   assistant1: String(ligne.Assistant1 || "").trim(),
   assistant2: String(ligne.Assistant2 || "").trim(),
   gerante: String(ligne.Gerante || "").trim(),
   logo: String(ligne.Logo || "").trim(),
   courriel: String(ligne.Courriel || "").trim(),
   }))

  .filter((equipe) => equipe.nom);
    if (equipesImportees.length === 0) {
      alert(
        "Aucune équipe valide trouvée. Les colonnes doivent être : Nom, Ville, Calibre, Couleur."
      );
      return;
    }

    setEquipes((anciennesEquipes) => {
  const equipesFusionnees = [...anciennesEquipes];

  equipesImportees.forEach((nouvelleEquipe) => {
    const indexExistant = equipesFusionnees.findIndex(
      (equipe) => equipe.nom === nouvelleEquipe.nom
    );

    if (indexExistant >= 0) {
      equipesFusionnees[indexExistant] = {
        ...equipesFusionnees[indexExistant],
        ...nouvelleEquipe,
      };
    } else {
      equipesFusionnees.push(nouvelleEquipe);
    }
  });

  return equipesFusionnees;
});

    setMatchInfo((ancienMatchInfo) => ({
      ...ancienMatchInfo,
      equipeLocale: equipesImportees[0]?.nom || "",
      equipeVisiteuse: equipesImportees[1]?.nom || "",
      calibre: equipesImportees[0]?.calibre || ancienMatchInfo.calibre,
    }));

    setFenetreImportOuverte(false);

    alert(`${equipesImportees.length} équipes importées.`);

    event.target.value = "";
  };

  lecteur.readAsArrayBuffer(fichier);
}

  function importerJoueusesExcel(event) {
    const fichier = event.target.files[0];

    if (!fichier) return;

    const lecteur = new FileReader();

    lecteur.onload = (e) => {
      const donnees = new Uint8Array(e.target.result);
      const classeur = XLSX.read(donnees, { type: "array" });
      const premiereFeuille = classeur.SheetNames[0];
      const feuille = classeur.Sheets[premiereFeuille];

      const lignes = XLSX.utils.sheet_to_json(feuille);

      const joueusesImportees = lignes
        .map((ligne, index) => ({
          id: Date.now() + index,
          equipe: String(ligne.Equipe || "").trim(),
          numero: String(ligne.Numero || "").trim(),
          nom: String(ligne.Nom || "").trim(),
          gardienne: String(ligne.Gardienne || "").trim().toUpperCase() === "OUI",
          capitaine: String(ligne.Capitaine || "").trim().toUpperCase() === "OUI",
          assistanteCapitaine: String(ligne.AssistanteCapitaine || "").trim().toUpperCase() === "OUI",
          absente: false,suspendue: false,
        }))
        .filter((joueuse) => joueuse.equipe && joueuse.numero && joueuse.nom);

      if (joueusesImportees.length === 0) {
        alert(
          "Aucune joueuse valide trouvée. Les colonnes doivent être : Equipe, Numero, Nom, Gardienne, Capitaine."
        );
        return;
      }

      const nomsEquipes = [
        ...new Set(joueusesImportees.map((joueuse) => joueuse.equipe)),
      ];

      

     setJoueuses((anciennesJoueuses) => {
  const joueusesFusionnees = [...anciennesJoueuses];

  joueusesImportees.forEach((nouvelleJoueuse) => {
    const indexExistant = joueusesFusionnees.findIndex(
      (joueuse) =>
        joueuse.equipe === nouvelleJoueuse.equipe &&
        joueuse.numero === nouvelleJoueuse.numero
    );

    if (indexExistant >= 0) {
      joueusesFusionnees[indexExistant] = {
        ...joueusesFusionnees[indexExistant],
        nom: nouvelleJoueuse.nom,
        gardienne: nouvelleJoueuse.gardienne,
        capitaine: nouvelleJoueuse.capitaine,
        assistanteCapitaine: nouvelleJoueuse.assistanteCapitaine,
      };
    } else {
      joueusesFusionnees.push(nouvelleJoueuse);
    }
  });

  return joueusesFusionnees;
});



      setEquipes((anciennesEquipes) => {
  const equipesExistantes = [...anciennesEquipes];

  nomsEquipes.forEach((nomEquipe) => {
    const existeDeja = equipesExistantes.some(
      (equipe) => equipe.nom === nomEquipe
    );

    if (!existeDeja) {
      equipesExistantes.push({
        id: Date.now() + Math.random(),
        nom: nomEquipe,
        ville: "",
        calibre: matchInfo.calibre || "",
        courriel: "",
        nomCouleurPrimaire: "Bleu",
        nomCouleurSecondaire: "Blanc",
        couleurPrimaire: couleurs.Bleu,
        couleurSecondaire: couleurs.Blanc,
        logo: "",
      });
    }
  });

  return equipesExistantes;
});

      setMatchInfo((ancienMatchInfo) => ({
        ...ancienMatchInfo,
        equipeLocale: nomsEquipes[0] || "",
        equipeVisiteuse: nomsEquipes[1] || "",
      }));

      setPageActive("alignements");
setFenetreImportOuverte(false);
      alert(
        `${joueusesImportees.length} joueuses importées.\nÉquipes détectées : ${nomsEquipes.join(
          ", "
        )}`
      );

      event.target.value = "";
    };

    lecteur.readAsArrayBuffer(fichier);
  }
function importerOfficielsExcel(event) {
  const fichier = event.target.files[0];

  if (!fichier) return;

  const lecteur = new FileReader();

  lecteur.onload = (e) => {
    const donnees = new Uint8Array(e.target.result);
    const classeur = XLSX.read(donnees, { type: "array" });
    const feuille = classeur.Sheets[classeur.SheetNames[0]];
    const lignes = XLSX.utils.sheet_to_json(feuille);

    const officielsImportes = lignes
      .map((ligne, index) => ({
        id: Date.now() + index,
        nom: String(ligne.Nom || "").trim(),
        arbitre: String(ligne.Arbitre || "").trim().toUpperCase() === "OUI",
        chronometreur:
          String(ligne.Chronometreur || "").trim().toUpperCase() === "OUI",
        marqueur: String(ligne.Marqueur || "").trim().toUpperCase() === "OUI",
        operateur30s:
          String(ligne.Operateur30s || "").trim().toUpperCase() === "OUI",
      }))
      .filter((officiel) => officiel.nom);

    setOfficiels((anciensOfficiels) => {
      const officielsFusionnes = [...anciensOfficiels];

      officielsImportes.forEach((nouvelOfficiel) => {
        const indexExistant = officielsFusionnes.findIndex(
          (officiel) => officiel.nom === nouvelOfficiel.nom
        );

        if (indexExistant >= 0) {
          officielsFusionnes[indexExistant] = {
            ...officielsFusionnes[indexExistant],
            ...nouvelOfficiel,
          };
        } else {
          officielsFusionnes.push(nouvelOfficiel);
        }
      });

      return officielsFusionnes;
    });

    alert(`${officielsImportes.length} officiels importés.`);
    event.target.value = "";
  };
    lecteur.readAsArrayBuffer(fichier);
}

  function changerPresence(id) {
    setJoueuses(
      joueuses.map((joueuse) =>
        joueuse.id === id ? { ...joueuse, absente: !joueuse.absente } : joueuse
      )
    );
  }
  function importerAlignementTournoiExcel(event) {
  const fichier = event.target.files[0];
  if (!fichier) return;

  const nomEquipe = fichier.name.replace(/\.[^/.]+$/, "").trim();
  const lecteur = new FileReader();

  lecteur.onload = (e) => {
    const donnees = new Uint8Array(e.target.result);
    const classeur = XLSX.read(donnees, { type: "array" });
    const feuille = classeur.Sheets[classeur.SheetNames[0]];
    const lignes = XLSX.utils.sheet_to_json(feuille);
        
    let entraineurChef = "";
    const assistants = [];
    let gerante = "";

    const joueusesImportees = lignes
      .map((ligne, index) => {
        const nom = String(ligne.Nom || "").trim();
        const prenom = String(ligne.Prénom || ligne.Prenom || "").trim();
        const numero = String(ligne.Numero || ligne.Numéro || "").trim();
        const type = String(ligne.Type || "").trim();
       const fonction = String(
  ligne.Fonction ||
  ligne["Type "] ||
  ligne["Type"] ||
  ""
)
  .trim()
  .toLowerCase();
  
        const nomComplet = `${prenom} ${nom}`.trim();

        if (fonction.includes("entraineur chef") || fonction.includes("entraîneur chef")) {
          entraineurChef = nomComplet;
          return null;
        }

        if (fonction.includes("assistant")) {
          assistants.push(nomComplet);
          return null;
        }

        if (fonction.includes("gérante") || fonction.includes("gerante")) {
          gerante = nomComplet;
          return null;
        }

        return {
          id: Date.now() + index,
          equipe: nomEquipe,
          numero,
          nom: nomComplet,
          gardienne: type.toLowerCase().includes("gardienne"),
          capitaine: false,
          assistanteCapitaine: false,
          absente: false,
          suspendue: false,
          remplacante: false,
        };
      })
      .filter((joueuse) => joueuse && joueuse.numero && joueuse.nom);

    setEquipes((anciennesEquipes) => {
      const equipesFusionnees = [...anciennesEquipes];
      const indexExistant = equipesFusionnees.findIndex(
        (equipe) => equipe.nom === nomEquipe
      );

      const equipeImportee = {
        id: Date.now(),
        nom: nomEquipe,
        ville: "",
        calibre: matchInfo.calibre || "",
        courriel: "",
        nomCouleurPrimaire: "Bleu",
        nomCouleurSecondaire: "Blanc",
        couleurPrimaire: couleurs.Bleu,
        couleurSecondaire: couleurs.Blanc,
        logo: "",
        entraineurChef,
        assistant1: assistants[0] || "",
        assistant2: assistants[1] || "",
        gerante,
      };

      if (indexExistant >= 0) {
        equipesFusionnees[indexExistant] = {
          ...equipesFusionnees[indexExistant],
          entraineurChef,
          assistant1: assistants[0] || "",
          assistant2: assistants[1] || "",
          gerante,
        };
      } else {
        equipesFusionnees.push(equipeImportee);
      }

      return equipesFusionnees;
    });

    setJoueuses((anciennesJoueuses) => {
      const fusion = [...anciennesJoueuses];

      joueusesImportees.forEach((nouvelleJoueuse) => {
        const indexExistant = fusion.findIndex(
          (joueuse) =>
            joueuse.equipe === nouvelleJoueuse.equipe &&
            joueuse.numero === nouvelleJoueuse.numero
        );

        if (indexExistant >= 0) {
          fusion[indexExistant] = {
            ...fusion[indexExistant],
            nom: nouvelleJoueuse.nom,
            gardienne: nouvelleJoueuse.gardienne,
          };
        } else {
          fusion.push(nouvelleJoueuse);
        }
      });

      return fusion;
    });

    alert(
  `${joueusesImportees.length} joueuses importées pour ${nomEquipe}.` +
    ([
      entraineurChef,
      assistants[0],
      assistants[1],
      gerante,
    ].filter(Boolean).length > 0
      ? `\nPersonnel importé : ${[
          entraineurChef,
          assistants[0],
          assistants[1],
          gerante,
        ]
          .filter(Boolean)
          .join(", ")}`
      : "")
);

    event.target.value = "";
  };

  lecteur.readAsArrayBuffer(fichier);
}

  function calculerTempsCorrige(temps) {
    if (!temps.includes(":")) return "";

    const [minutesTexte, secondesTexte] = temps.split(":");
    const minutes = Number(minutesTexte);
    const secondes = Number(secondesTexte);

    if (Number.isNaN(minutes) || Number.isNaN(secondes)) return "";
    if (minutes < 0 || secondes < 0 || secondes > 59) return "";

    const totalSecondesPeriode = dureePeriode * 60;
    const totalSecondesTableau = minutes * 60 + secondes;
    const totalSecondesCorrige = totalSecondesPeriode - totalSecondesTableau;

    if (totalSecondesCorrige < 0) return "";

    const minutesCorrigees = Math.floor(totalSecondesCorrige / 60);
    const secondesCorrigees = totalSecondesCorrige % 60;

    return `${String(minutesCorrigees).padStart(2, "0")}:${String(
      secondesCorrigees
    ).padStart(2, "0")}`;
  }
  function ajouterMinutes(temps, minutesAAjouter) {
  const [min, sec] = temps.split(":").map(Number);

  const total = min * 60 + sec + minutesAAjouter * 60;

  const nouvellesMinutes = Math.floor(total / 60);
  const nouvellesSecondes = total % 60;

  return `${String(nouvellesMinutes).padStart(2, "0")}:${String(
    nouvellesSecondes
  ).padStart(2, "0")}`;
}

  function trouverJoueuse(numero, equipeNom) {
    return joueuses.find(
      (joueuse) => joueuse.numero === numero && joueuse.equipe === equipeNom
    );
  }

  function ouvrirFenetreBut(equipe) {
    if (!matchInfo.equipeLocale || !matchInfo.equipeVisiteuse) {
      alert("Configure ou importe les équipes avant d'ajouter un but.");
      return;
    }

    setEquipeBut(equipe);
    setTempsTableau("");
    setNumeroButeuse("");
    setAssistante1("");
    setAssistante2("");
    setFenetreButOuverte(true);
  }
  function validerBut() {
  if (assistante1 && assistante1 === numeroButeuse) {
    alert("La marqueuse ne peut pas être aussi assistante 1.");
    return false;
  }

  if (assistante2 && assistante2 === numeroButeuse) {
    alert("La marqueuse ne peut pas être aussi assistante 2.");
    return false;
  }

  if (assistante1 && assistante2 && assistante1 === assistante2) {
    alert("L'assistante 1 et l'assistante 2 ne peuvent pas être la même joueuse.");
    return false;
  }

  return true;
}

  function confirmerBut() {
    if (!tempsTableau.trim()) {
      alert("Entre le temps affiché au tableau.");
      return;
    }

    const tempsCorrige = calculerTempsCorrige(tempsTableau);

    if (!tempsCorrige) {
      alert("Le temps doit être valide. Exemple : 08:32");
      return;
    }

    if (!numeroButeuse) {
      alert("Choisis la joueuse qui a compté.");
      return;
    }
    if (!validerBut()) {
  return;
}

    const equipeNom =
      equipeBut === "Local" ? matchInfo.equipeLocale : matchInfo.equipeVisiteuse;

    const buteuse = trouverJoueuse(numeroButeuse, equipeNom);

if (buteuse?.suspendue) {
  alert("Une joueuse suspendue ne peut pas marquer un but.");
  return;
}
    const a1 = assistante1
  ? trouverJoueuse(assistante1, equipeNom)
  : null;

const a2 = assistante2
  ? trouverJoueuse(assistante2, equipeNom)
  : null;

if (a1?.suspendue || a2?.suspendue) {
  alert("Une joueuse suspendue ne peut pas recevoir une assistance.");
  return;
}

    const nouvelEvenement = {
      id: Date.now(),
      type: "But",
      equipe: equipeBut,
      equipeNom,
      periode,
      tempsTableau,
      tempsCorrige,
      buteuseNumero: numeroButeuse,
      buteuseNom: buteuse?.nom || "",
      assistante1Numero: assistante1,
      assistante1Nom: a1?.nom || "",
      assistante2Numero: assistante2,
      assistante2Nom: a2?.nom || "",
    };

    const punitionsActives = trouverPunitionsActives(equipeBut, tempsCorrige);

    if (punitionsActives.length > 0) {
      setButEnAttente(nouvelEvenement);
      setPunitionsAnnulables(punitionsActives);
      setPunitionSelectionnee("");
      setFenetreButOuverte(false);
      setFenetreAnnulationOuverte(true);
      return;
    }

    setEvenements([nouvelEvenement, ...evenements]);
    setFenetreButOuverte(false);
  }

  function confirmerButSansAnnulation() {
    if (!butEnAttente) return;

    setEvenements([butEnAttente, ...evenements]);
    setButEnAttente(null);
    setPunitionSelectionnee("");
    setFenetreAnnulationOuverte(false);
  }

  function confirmerAnnulationPunition() {
    if (!punitionSelectionnee) {
      alert("Choisis une punition à annuler.");
      return;
    }

    if (!butEnAttente) return;

    const idPunition = Number(punitionSelectionnee);

    const evenementsMisAJour = evenements.map((event) =>
      event.id === idPunition
        ? {
            ...event,
            tempsRetour: butEnAttente.tempsCorrige,
            annuleeParBut: true,
          }
        : event
    );

    setEvenements([butEnAttente, ...evenementsMisAJour]);
    setButEnAttente(null);
    setPunitionSelectionnee("");
    setFenetreAnnulationOuverte(false);
  }

  function supprimerEvenement(id) {
    setEvenements(evenements.filter((event) => event.id !== id));
  }

  function retirerDernierBut(equipe) {
    const dernierBut = evenements.find(
      (event) => event.type === "But" && event.equipe === equipe
    );

    if (dernierBut) {
      supprimerEvenement(dernierBut.id);
    }
  }

  function nouvellePartie() {
  setPeriode("1");
  setEvenements([]);

  setMatchInfo({
    ...matchInfo,
    numeroPartie: "",
    date: "",
    arena: "",
    equipeLocale: "",
    equipeVisiteuse: "",
    heureDebut: "",
    heureFin: "",
  });
}
  const equipeNomPourPunition =
  equipePunition === "Local" ? matchInfo.equipeLocale : matchInfo.equipeVisiteuse;

const joueusesPunitionDisponibles = joueuses.filter(
  (joueuse) => joueuse.equipe === equipeNomPourPunition && !joueuse.absente
);
const equipeNomPourTirBarrage =
  equipeTirBarrage === "Local"
    ? matchInfo.equipeLocale
    : matchInfo.equipeVisiteuse;

const joueusesTirBarrageDisponibles = joueuses.filter(
  (joueuse) => joueuse.equipe === equipeNomPourTirBarrage && !joueuse.absente
);

function ouvrirFenetreTirBarrage() {
  setEquipeTirBarrage("Local");
  setJoueuseTirBarrage("");
  setTirBarrageReussi(false);
  setFenetreTirBarrageOuverte(true);
}

function confirmerTirBarrage() {
  if (!joueuseTirBarrage) {
    alert("Choisis la joueuse du tir de barrage.");
    return;
  }

  const joueuse = trouverJoueuse(
  joueuseTirBarrage,
  equipeNomPourTirBarrage
);

if (joueuse?.suspendue) {
  alert("Une joueuse suspendue ne peut pas effectuer un tir de barrage.");
  return;
}

  const nouvelEvenement = {
    id: Date.now(),
    type: "Tir de barrage",
    equipe: equipeTirBarrage,
    equipeNom: equipeNomPourTirBarrage,
    periode: "T.B.",
    joueuseNumero: joueuseTirBarrage,
    joueuseNom: joueuse?.nom || "",
    reussi: tirBarrageReussi,
  };

  setEvenements([...evenements, nouvelEvenement]);
  setFenetreTirBarrageOuverte(false);
}

function ouvrirFenetrePunition() {
  setEquipePunition("Local");
  setTempsPunitionTableau("");
  setJoueusePunition("");
  setJoueusePurgeePar("");
  setTypePunition("ACCROCHER / HOOKING");
  setDureePunition("2");
  setFenetrePunitionOuverte(true);
}
function validerPunition() {
  const joueuse = trouverJoueuse(joueusePunition, equipeNomPourPunition);

  if (joueuse?.suspendue) {
    alert("Cette joueuse est suspendue. Vérifie avant d'ajouter la punition.");
    return false;
  }

  if (joueusePurgeePar && joueusePurgeePar === joueusePunition) {
    alert("La joueuse qui purge ne doit être inscrite que si elle remplace une autre joueuse.");
    return false;
  }

  return true;
}
function confirmerPunition() {
  if (!tempsPunitionTableau.trim()) {
    alert("Entre le temps affiché au tableau.");
    return;
  }

  const tempsCorrige = calculerTempsCorrige(tempsPunitionTableau);

  if (!tempsCorrige) {
    alert("Le temps doit être valide. Exemple : 08:32");
    return;
  }

  if (!joueusePunition) {
    alert("Choisis la joueuse punie.");
    return;
  }

  if (!validerPunition()) {
    return;
  }

  const joueuse = trouverJoueuse(joueusePunition, equipeNomPourPunition);
const tempsSortie = tempsCorrige;

const tempsFinPrevue = ajouterMinutes(
  tempsSortie,
  Number(dureePunition)
);

const tempsRetour = tempsFinPrevue;
  const nouvelEvenement = {
  id: Date.now(),
  type: "Punition",
  equipe: equipePunition,
  equipeNom: equipeNomPourPunition,
  periode,
  tempsTableau: tempsPunitionTableau,
  tempsCorrige,
  joueuseNumero: joueusePunition,
  joueuseNom: joueuse?.nom || "",
  purgeeParNumero: joueusePurgeePar,
  punition: typePunition,
  duree: dureePunition,
  tempsSortie,
tempsDebut: tempsSortie,
tempsFinPrevue,
 tempsRetour,
  annuleeParBut: false,
};


  setEvenements([nouvelEvenement, ...evenements]);
  setFenetrePunitionOuverte(false);
}
function trouverPunitionsActives(equipeQuiMarque, tempsButCorrige) {
  const equipeAdverse = equipeQuiMarque === "Local" ? "Visiteur" : "Local";

  return evenements.filter((event) => {
    if (event.type !== "Punition") return false;
    if (event.equipe !== equipeAdverse) return false;
    if (event.annuleeParBut) return false;

    return event.tempsRetour && event.tempsRetour > tempsButCorrige;
  });
}

function creerPDF({ sauvegarder = true } = {}) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "legal",
  });

  const pageWidth = 216;
  const margin = 7;
  const contentWidth = pageWidth - margin * 2;
  const rowH = 4.2;

  const buts = evenements.filter((event) => event.type === "But");
  const punitions = evenements.filter((event) => event.type === "Punition");
  const tirsBarrage = evenements.filter((event) => event.type === "Tir de barrage");
  const tirsBarrageLocal = tirsBarrage.filter((event) => event.equipe === "Local" && event.reussi);
  const tirsBarrageVisiteur = tirsBarrage.filter((event) => event.equipe === "Visiteur" && event.reussi);
  const butsLocal = buts.filter((event) => event.equipe === "Local").reverse();
  const butsVisiteur = buts.filter((event) => event.equipe === "Visiteur").reverse();
  const punitionsLocal = punitions.filter((event) => event.equipe === "Local").reverse();
  const punitionsVisiteur = punitions.filter((event) => event.equipe === "Visiteur").reverse();
  const joueusesLocales = joueuses.filter((joueuse) => joueuse.equipe === matchInfo.equipeLocale && !joueuse.absente);
  const joueusesVisiteuses = joueuses.filter((joueuse) => joueuse.equipe === matchInfo.equipeVisiteuse && !joueuse.absente);
  const absentesLocales = joueuses.filter((joueuse) => joueuse.equipe === matchInfo.equipeLocale && joueuse.absente);
  const absentesVisiteuses = joueuses.filter((joueuse) => joueuse.equipe === matchInfo.equipeVisiteuse && joueuse.absente);
  const changementsGardienne = evenements.filter((event) => event.type === "Changement gardienne");
  const changementGardienneLocal = changementsGardienne.find((event) => event.equipe === "Local");
  const changementGardienneVisiteur = changementsGardienne.find((event) => event.equipe === "Visiteur");
  const chandailLocal = matchInfo.couleurLocaleChoisie === "primaire" ? equipeLocaleData?.nomCouleurPrimaire : equipeLocaleData?.nomCouleurSecondaire;
  const chandailVisiteur = matchInfo.couleurVisiteuseChoisie === "primaire" ? equipeVisiteuseData?.nomCouleurPrimaire : equipeVisiteuseData?.nomCouleurSecondaire;
  const tempsMortsLocal = evenements.filter((event) => event.type === "Temps mort" && event.equipe === "Local").length;
  const tempsMortsVisiteur = evenements.filter((event) => event.type === "Temps mort" && event.equipe === "Visiteur").length;

  function txt(value) {return String(value || "");
  }
  function lineText(text, x, y, size = 7, style = "normal") {
    doc.setFont("helvetica", style);
    doc.setFontSize(size);
    doc.text(txt(text), x, y);
  }

  function centerText(text, x, y, w, size = 7, style = "normal") {
    doc.setFont("helvetica", style);
    doc.setFontSize(size);
    doc.text(txt(text), x + w / 2, y, { align: "center" });
  }

  function box(x, y, w, h) {
    doc.rect(x, y, w, h);
  }

  function blackBar(text, y) {
    doc.setFillColor(0, 0, 0);
    doc.rect(margin, y, contentWidth, 5, "F");
    doc.setTextColor(255, 255, 255);
    centerText(text, margin, y + 3.6, contentWidth, 7, "bold");
    doc.setTextColor(0, 0, 0);
  }

  function drawHeader() {
    const y = 8;
    box(margin, y, contentWidth, 23);
    box(margin, y, 54, 23);
    doc.addImage(logoRingette,"PNG",margin + 2, 9, 18, 18
);

    const x = margin + 84;
    box(x, y, 96, 23);
    box(x, y, 20, 6);
    box(x + 20, y, 25, 6);
    box(x + 45, y, 20, 6);
    box(x + 65, y, 31, 6);
    centerText("No du", x, y + 4, 20, 6);
    centerText("Date", x + 45, y + 4, 20, 6);
    lineText(matchInfo.numeroPartie || "", x + 21, y + 4.2, 7);
    lineText(matchInfo.date || "", x + 66, y + 4.2, 7);
  
    box(x, y + 6, 35, 6);
    box(x + 35, y + 6, 30, 6);
    box(x + 65, y + 6, 31, 6);
    centerText("Categorie", x, y + 10, 35, 6);
    lineText(matchInfo.calibre || "", x + 37, y + 10.2, 7);
    centerText("Classe", x + 65, y + 10, 31, 6);

    box(x, y + 12, 35, 6);
    box(x + 35, y + 12, 30, 6);
    box(x + 65, y + 12, 31, 6);
    centerText("Ligue/Tournoi", x, y + 16, 35, 6);
    centerText("Temps", x + 65, y + 16, 31, 6);

    box(x, y + 18, 35, 5);
    box(x + 35, y + 18, 30, 5);
    box(x + 65, y + 18, 31, 5);
    centerText("Endroit/Arena", x, y + 21.5, 35, 6);
    lineText(matchInfo.arena || "", x + 37, y + 21.5, 6.5);
    lineText(`${dureePeriode} min`, x + 67, y + 21.5, 7);
  }
  const resumeLocal = {
  p1: butsLocal.filter((but) => but.periode === "1").length,
  p2: butsLocal.filter((but) => but.periode === "2").length,
  prol: butsLocal.filter((but) => but.periode === "PROL").length,
  tb: tirsBarrageLocal.length
};

resumeLocal.total =resumeLocal.p1 + resumeLocal.p2 + resumeLocal.prol + resumeLocal.tb;

const resumeVisiteur = {
  p1: butsVisiteur.filter((but) => but.periode === "1").length,
  p2: butsVisiteur.filter((but) => but.periode === "2").length,
  prol: butsVisiteur.filter((but) => but.periode === "PROL").length,
  tb: tirsBarrageVisiteur.length
};
resumeVisiteur.total =resumeVisiteur.p1 + resumeVisiteur.p2 + resumeVisiteur.prol + resumeVisiteur.tb;


  const codesPunition = {
      "ACCROCHER / HOOKING": "1",
      "ASSAUT / CHARGE": "2",
      "BATON ELEVE / HIGH STICKING": "3",
      "CINGLER / SLASHING": "4",
      "DONNER DU COUDE / ELBOWING": "5",
      "DOUBLE ECHEC / CROSS CHECKING": "6",
      "FAIRE TREBUCHER / TRIPPING": "7",
      "MISE EN ECHEC / BODY CONTACT": "8",
      "OBSTRUCTION / INTERFERENCE": "9",
      "PLAQUAGE CONTRE LA BANDE / BOARDING": "10",
      "RETARDER LA PARTIE / DELAY OF GAME": "11",
      "RETENUE / HOLDING": "12",
      "SUBSTITUTION ILLEGALE / ILLEGAL SUBSTITUTION": "13",
      "CONDUITE NON SPORTIVE / UNSPORTSMANLIKE CONDUCT  2 MIN.": "14",
      "PENALITE MAJEURE / MAJOR PENALTY  4 MIN.": "15",
      "MAUVAISE CONDUITE / MISCONDUCT  2 MIN.": "16",
      "PENALITE DE MATCH / MATCH PENALTY  4 MIN.": "17",
      "LANCER DE PUNITION / PENALTY SHOT": "18",
      "RUDESSE / ROUGH PLAY  4 MIN.": "19",
      "ATHLETE EXPULSE POUR AVOIR ACCUMULE 10 MINUTES DE PENALITE": "20"
};

 function drawTeamBlock(y, role, teamName, score, players, goals, penalties, chandail, equipeData, resume, changementGardienne, tempsMorts) {
    blackBar("SOMMAIRE - SUMMARY", y);
    y += 5;

    const x0 = margin;
    const roleW = 13;
    const playerW = 50;
    const scoreW = 31;
    const penW = contentWidth - roleW - playerW - scoreW;
    const tableH = 86;

    box(x0, y, roleW, tableH);
    centerText(role, x0, y + 6, roleW, 6, "bold");
    centerText(teamName || "", x0, y + 12, roleW, 5.5);
    centerText(`Chandail: ${chandail || "---"}`, x0, y + tableH - 4, roleW, 4.5);

    box(x0 + roleW, y, playerW, tableH);
    box(x0 + roleW, y, playerW, rowH);
    centerText("NO.", x0 + roleW, y + 3.1, 10, 6);
    centerText("NOM", x0 + roleW + 10, y + 3.1, playerW - 10, 6);
    doc.line(x0 + roleW + 10, y, x0 + roleW + 10, y + tableH);

    const playerRows = 19;
    for (let i = 0; i <= playerRows; i++) {
      const yy = y + rowH + i * rowH;
      doc.line(x0 + roleW, yy, x0 + roleW + playerW, yy);
    }
    players.slice(0, playerRows).forEach((joueuse, i) => {
      const yy = y + rowH + i * rowH + 3.1;
      centerText(joueuse.numero, x0 + roleW, yy, 10, 6);
      lineText(`${joueuse.nom}${joueuse.gardienne ? " G" : ""}${joueuse.capitaine ? " C" : ""}${joueuse.assistanteCapitaine ? " A" : ""}${joueuse.suspendue ? " SUSP." : ""}${joueuse.remplacante ? " REMPL." : ""}`, x0 + roleW + 11, yy, 5.5);
    });

    const sx = x0 + roleW + playerW;
    box(sx, y, scoreW, tableH);
    box(sx, y, scoreW, rowH);
    centerText("POINTAGE / SCORE", sx, y + 3.1, scoreW, 6, "bold");
    const scCols = [7, 7, 7, 10];
    let cx = sx;
    ["PTS.", "ASS.", "ASS.", "TEMPS"].forEach((h, i) => {
      box(cx, y + rowH, scCols[i], rowH);
      centerText(h, cx, y + rowH + 3.1, scCols[i], 5.5);
      cx += scCols[i];
    });
    for (let i = 0; i <= playerRows - 1; i++) {
      const yy = y + rowH * 2 + i * rowH;
      doc.line(sx, yy, sx + scoreW, yy);
    }
    cx = sx;
    for (let i = 0; i < scCols.length - 1; i++) {
      cx += scCols[i];
      doc.line(cx, y + rowH, cx, y + tableH);
    }
    goals.slice(0, 12).forEach((goal, i) => {
      const yy = y + rowH * 2 + i * rowH + 3.1;
      centerText(goal.buteuseNumero, sx, yy, scCols[0], 5.5);
      centerText(goal.assistante1Numero || "", sx + scCols[0], yy, scCols[1], 5.5);
      centerText(goal.assistante2Numero || "", sx + scCols[0] + scCols[1], yy, scCols[2], 5.5);
      centerText(goal.tempsCorrige || "", sx + scCols[0] + scCols[1] + scCols[2], yy, scCols[3], 5.2);
    });

    const px = sx + scoreW;
    box(px, y, penW, tableH);
    box(px, y, penW, rowH);
    centerText("PUNITIONS / PENALTIES", px, y + 3.1, penW, 6, "bold");
    const penCols = [8, 18, 8, 8, 10, 14, 12, 12, penW - 90];
    const penHeads = [ "NO.", "PURGEE PAR", "MIN.", "CODE", "LETTRE", "SORTIE", "DEBUT", "FIN", "RETOUR",];
    cx = px;
    penHeads.forEach((h, i) => {
      box(cx, y + rowH, penCols[i], rowH);
      centerText(h, cx, y + rowH + 3.1, penCols[i], 5);
      cx += penCols[i];
    });
    for (let i = 0; i <= playerRows - 1; i++) {
      const yy = y + rowH * 2 + i * rowH;
      doc.line(px, yy, px + penW, yy);
    }
    cx = px;
    for (let i = 0; i < penCols.length - 1; i++) {
      cx += penCols[i];
      doc.line(cx, y + rowH, cx, y + tableH);
    }
    penalties.slice(0, 12).forEach((pen, i) => {
      const yy = y + rowH * 2 + i * rowH + 3.1;
      let x = px;
      const vals = [ pen.joueuseNumero, pen.purgeeParNumero || "", pen.duree, codesPunition[pen.punition] || "", "", pen.tempsSortie || "", pen.tempsDebut || "", pen.tempsFinPrevue || "", pen.tempsRetour || "",
];
      vals.forEach((v, idx) => {
  if (idx === 1) {
    lineText(v || "", x + 1, yy, 4.5);
  } else {
    centerText(v || "", x, yy, penCols[idx], 5);
  }

  x += penCols[idx];
});
    });

    const footY = y + tableH;

box(x0, footY, 52, 8);
centerText("ENTRAINEUR / COACH", x0, footY + 2.8, 52, 5.2);
lineText(equipeData?.entraineurChef || "", x0 + 2, footY + 6.4, 5.2);

box(x0 + 52, footY, 32, 8);

const resumeX = x0 + 52;
const resumeW = 32;
const colW = resumeW / 4;

centerText("RESUME / SUMMARY", resumeX, footY + 2, resumeW, 5, "bold");

doc.line(resumeX, footY + 3, resumeX + resumeW, footY + 3);

centerText("1re/1st", resumeX, footY + 5, colW, 4.2);
centerText("2e/2nd", resumeX + colW, footY + 5, colW, 4.2);
centerText("P/O", resumeX + colW * 2, footY + 5, colW, 4.2);
centerText("T.B./S.O.", resumeX + colW * 3, footY + 5, colW, 4.2);

centerText(String(resume.p1), resumeX, footY + 7.4, colW, 4.5, "bold");
centerText(String(resume.p2), resumeX + colW, footY + 7.4, colW, 4.5, "bold");
centerText(String(resume.prol), resumeX + colW * 2, footY + 7.4, colW, 4.5, "bold");
centerText(String(resume.total), resumeX + colW * 3, footY + 7.4, colW, 4.5, "bold");

doc.line(resumeX + colW, footY + 3, resumeX + colW, footY + 8);
doc.line(resumeX + colW * 2, footY + 3, resumeX + colW * 2, footY + 8);
doc.line(resumeX + colW * 3, footY + 3, resumeX + colW * 3, footY + 8);

box(x0 + 84, footY, 58, 8);
centerText("CHANGEMENT DE GARDIENNE", x0 + 84, footY + 3.2, 58, 5.5);
centerText("GOALKEEPER CHANGE", x0 + 84, footY + 6.2, 58, 5.2);

const goalieX = x0 + 142;
const goalieW = contentWidth - 142;
const goalieColW = goalieW / 2;

box(goalieX, footY, goalieW, 8);
doc.line(goalieX + goalieColW, footY, goalieX + goalieColW, footY + 8);

centerText("PERIODE / PERIOD", goalieX, footY + 2.8, goalieColW, 4.5);
centerText("TEMPS / TIME", goalieX + goalieColW, footY + 2.8, goalieColW, 4.5);

if (changementGardienne) {
  centerText(
    String(changementGardienne.periode || ""),
    goalieX,
    footY + 6.6,
    goalieColW,
    5.5,
    "bold"
  );

  centerText(
    changementGardienne.tempsCorrige || "",
    goalieX + goalieColW,
    footY + 6.6,
    goalieColW,
    5.5,
    "bold"
  );
}
const footY2 = footY + 8;

box(x0, footY2, 42, 8);
centerText("ASSISTANT 1", x0, footY2 + 2.8, 42, 5);
lineText(equipeData?.assistant1 || "", x0 + 2, footY2 + 6.3, 5);

box(x0 + 42, footY2, 42, 8);
centerText("ASSISTANT 2", x0 + 42, footY2 + 2.8, 42, 5);
lineText(equipeData?.assistant2 || "", x0 + 44, footY2 + 6.3, 5);

box(x0 + 84, footY2, 36, 8);
centerText("GERANTE", x0 + 84, footY2 + 2.8, 36, 5);
lineText(equipeData?.gerante || "", x0 + 86, footY2 + 6.3, 5);

box(x0 + 120, footY2, 42, 8);
centerText("TEMPS D'ARRET", x0 + 120, footY2 + 3.2, 42, 5.2);
centerText("TIME OUT", x0 + 120, footY2 + 6.2, 42, 5);
centerText(String(tempsMorts || ""), x0 + 135, footY2 + 5, 42, 5.5, "bold");

box(x0 + 162, footY2, contentWidth - 162, 8);

return footY2 + 8;
  }

  function drawPenaltyCodes(y) {
    box(margin, y, contentWidth, 36);
    doc.line(margin + contentWidth * 0.55, y, margin + contentWidth * 0.55, y + 36);
    lineText("PUNITIONS - 2 MIN. - PENALTIES (1-13)", margin + 1, y + 4, 6.5, "bold");
    const left = [
      "1. ACCROCHER / HOOKING",
      "2. ASSAUT / CHARGE",
      "3. BATON ELEVE / HIGH STICKING",
      "4. CINGLER / SLASHING",
      "5. DONNER DU COUDE / ELBOWING",
      "6. DOUBLE ECHEC / CROSS CHECKING",
      "7. FAIRE TREBUCHER / TRIPPING",
      "8. MISE EN ECHEC / BODY CONTACT",
      "9. OBSTRUCTION / INTERFERENCE",
      "10. PLAQUAGE CONTRE LA BANDE / BOARDING",
      "11. RETARDER LA PARTIE / DELAY OF GAME",
      "12. RETENUE / HOLDING",
      "13. SUBSTITUTION ILLEGALE / ILLEGAL SUBSTITUTION",
    ];
    left.forEach((item, i) => lineText(item, margin + 1 + (i > 8 ? 54 : 0), y + 8 + (i % 9) * 3, 5.2));

    const rx = margin + contentWidth * 0.55 + 1;
    lineText("PUNITIONS A PURGER ENTIEREMENT / FULLY SERVED PENALTIES", rx, y + 4, 6.2, "bold");
    const right = [
      "14. CONDUITE NON SPORTIVE / UNSPORTSMANLIKE CONDUCT  2 MIN.",
      "15. PENALITE MAJEURE / MAJOR PENALTY  4 MIN.",
      "16. MAUVAISE CONDUITE / MISCONDUCT  2 MIN.",
      "17. PENALITE DE MATCH / MATCH PENALTY  4 MIN.",
      "18. LANCER DE PUNITION / PENALTY SHOT",
      "19. RUDESSE / ROUGH PLAY  4 MIN.",
      "20. ATHLETE EXPULSE POUR AVOIR ACCUMULE 10 MINUTES DE PENALITE",
    ];
    right.forEach((item, i) => lineText(item, rx, y + 8 + i * 3.6, 5.2));
    return y + 36;
  }

  function drawOfficials(y) {
  box(margin, y, contentWidth, 30);

  lineText("OFFICIELS - OFFICIALS", margin + 1, y + 5, 6.5, "bold");

  const titres = [
    "OFFICIEL MAJEUR / REFEREE",
    "OFFICIEL MAJEUR / REFEREE",
    "CHRONOMETRE DE DECOMPTE / SHOTCLOCK",
    "MARQUEUR / SCORER",
    "CHRONOMETREUR / TIMEKEEPER",
  ];

  const valeurs = [
    matchInfo.arbitrePrincipal,
    matchInfo.arbitreSecondaire,
    matchInfo.operateur30s,
    matchInfo.marqueur,
    matchInfo.chronometreur,
  ];

  titres.forEach((titre, i) => {
    const yy = y + 10 + i * 4;

    lineText(titre, margin + 2, yy, 5.5);
    doc.line(margin + 65, yy + 0.5, margin + 130, yy + 0.5);
    lineText(valeurs[i] || "", margin + 67, yy, 5.5);
  });

  lineText(
    "NOM (MAJUSCULES) - NAME (PRINT CONFIRMATION)",
    margin + 132,
    y + 10,
    5
  );
}

  drawHeader();
  let y = 34;
 y = drawTeamBlock(
  y,
  "VISITEUR",
  matchInfo.equipeVisiteuse,
  scoreVisiteur,
  joueusesVisiteuses,
  butsVisiteur,
  punitionsVisiteur,
  chandailVisiteur,
  equipeVisiteuseData,
  resumeVisiteur,
  changementGardienneVisiteur,
  tempsMortsVisiteur
);
  y = drawPenaltyCodes(y + 2);
  y = drawTeamBlock(
  y + 2,
  "LOCAL",
  matchInfo.equipeLocale,
  scoreLocal,
  joueusesLocales,
  butsLocal,
  punitionsLocal,
  chandailLocal,
  equipeLocaleData,
  resumeLocal,
  changementGardienneLocal,
  tempsMortsLocal
);
  drawOfficials(y + 3);

  const absentes = [...absentesVisiteuses, ...absentesLocales];
  if (absentes.length > 0) {
    doc.setFontSize(6);
    const texteAbsentes = absentes
      .map((joueuse) => `#${joueuse.numero} ${joueuse.nom} (${joueuse.equipe})`)
      .join(", ");
    lineText(`Absentes: ${texteAbsentes}`, margin, 344, 5.5);
  }

  const nomFichier = `Feuille_match_${matchInfo.numeroPartie || "partie"}_${
    matchInfo.equipeLocale || "local"
  }_vs_${matchInfo.equipeVisiteuse || "visiteur"}.pdf`
    .replaceAll(" ", "_")
    .replaceAll("/", "-");

  if (sauvegarder) {
  doc.save(nomFichier);
}

return {
  doc,
  nomFichier,
};
}
function exporterPDF() {
  creerPDF({ sauvegarder: true });
}
async function envoyerPDF() {
  const erreurs = validerFeuilleMatch();

if (erreurs.length > 0) {
  alert(
    "Impossible de générer la feuille :\n\n" +
    erreurs.join("\n")
  );
  return;
}
  const { doc, nomFichier } = creerPDF({ sauvegarder: false });

  const blob = doc.output("blob");

  const fichier = new File([blob], nomFichier, {
    type: "application/pdf",
  });

  const sujet = `Feuille de match #${matchInfo.numeroPartie || ""} - ${
    matchInfo.equipeLocale || "Local"
  } vs ${matchInfo.equipeVisiteuse || "Visiteur"}`;

  const texte = `Bonjour,

Vous trouverez ci-joint la feuille de match.

Partie : ${matchInfo.numeroPartie || ""}
${matchInfo.equipeLocale || "Local"} vs ${
    matchInfo.equipeVisiteuse || "Visiteur"
  }

Merci.`;

  if (destinataires.length === 0) {
    alert("Aucun destinataire sélectionné.");
    return;
  }

  try {
    if (navigator.canShare && navigator.canShare({ files: [fichier] })) {
      await navigator.share({
        title: sujet,
        text: texte,
        files: [fichier],
      });
      return;
    }
  } catch (error) {
    console.error(error);
  }

  doc.save(nomFichier);

  const mailto = `mailto:${destinataires.join(",")}?subject=${encodeURIComponent(
    sujet
  )}&body=${encodeURIComponent(
    texte +
      "\n\nLe PDF a été téléchargé. Ajoute-le en pièce jointe avant d'envoyer le courriel."
  )}`;

  window.location.href = mailto;
}
const arbitresDisponibles = officiels.filter(
  (officiel) => officiel.arbitre
);

const chronometreursDisponibles = officiels.filter(
  (officiel) => officiel.chronometreur
);

const marqueursDisponibles = officiels.filter(
  (officiel) => officiel.marqueur
);

const operateurs30sDisponibles = officiels.filter(
  (officiel) => officiel.operateur30s
);
function supprimerOfficiel() {
  if (!officielASupprimer) {
    alert("Choisis un officiel à supprimer.");
    return;
  }

  if (!confirm(`Supprimer ${officielASupprimer} ?`)) {
    return;
  }

  setOfficiels(
    officiels.filter((officiel) => officiel.nom !== officielASupprimer)
  );

  setMatchInfo({
    ...matchInfo,
    arbitrePrincipal:
      matchInfo.arbitrePrincipal === officielASupprimer
        ? ""
        : matchInfo.arbitrePrincipal,
    arbitreSecondaire:
      matchInfo.arbitreSecondaire === officielASupprimer
        ? ""
        : matchInfo.arbitreSecondaire,
    chronometreur:
      matchInfo.chronometreur === officielASupprimer
        ? ""
        : matchInfo.chronometreur,
    marqueur:
      matchInfo.marqueur === officielASupprimer ? "" : matchInfo.marqueur,
    operateur30s:
      matchInfo.operateur30s === officielASupprimer
        ? ""
        : matchInfo.operateur30s,
  });

  setOfficielASupprimer("");
  setFenetreSuppressionOfficielOuverte(false);
}
function supprimerJoueuse() {
  if (!joueuseASupprimer) {
    alert("Choisis une joueuse.");
    return;
  }

  if (!confirm("Supprimer cette joueuse ?")) {
    return;
  }

  setJoueuses(
    joueuses.filter(
      (joueuse) => String(joueuse.id) !== joueuseASupprimer
    )
  );

  setJoueuseASupprimer("");
  setEquipeSuppressionJoueuse("");
  setFenetreSuppressionJoueuseOuverte(false);
}

    const destinataires = [
  matchInfo.envoyerCourrielLocal ? equipeLocaleData?.courriel : null,
  matchInfo.envoyerCourrielVisiteur ? equipeVisiteuseData?.courriel : null,
  ...String(matchInfo.courrielPersonnalise || "")
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean),
].filter(Boolean);

const equipeNomPourGardienne =
  equipeGardienne === "Local"
    ? matchInfo.equipeLocale
    : matchInfo.equipeVisiteuse;

const gardiennesDisponibles = joueuses.filter(
  (joueuse) =>
    joueuse.equipe === equipeNomPourGardienne &&
    joueuse.gardienne &&
    !joueuse.absente
);
function ouvrirFenetreGardienne() {
  setEquipeGardienne("Local");
  setTempsGardienneTableau("");
  setGardienneSortante("");
  setGardienneEntrante("");
  setFenetreGardienneOuverte(true);
}

function confirmerChangementGardienne() {
  const changementExiste = evenements.some(
    (event) =>
      event.type === "Changement gardienne" &&
      event.equipe === equipeGardienne
  );

  if (changementExiste) {
    alert("Cette équipe a déjà utilisé son changement de gardienne.");
    return;
  }

  if (!tempsGardienneTableau.trim()) {
    alert("Entre le temps affiché au tableau.");
    return;
  }

  const tempsCorrige = calculerTempsCorrige(tempsGardienneTableau);

  if (!tempsCorrige) {
    alert("Le temps doit être valide. Exemple : 08:32");
    return;
  }

  const nouvelEvenement = {
    id: Date.now(),
    type: "Changement gardienne",
    equipe: equipeGardienne,
    equipeNom: equipeNomPourGardienne,
    periode,
    tempsTableau: tempsGardienneTableau,
    tempsCorrige,
  };

  setEvenements([nouvelEvenement, ...evenements]);
  setFenetreGardienneOuverte(false);
}
function changerRoleJoueuse(id, role) {
  setJoueuses(
    joueuses.map((joueuse) =>
      joueuse.id === id
        ? { ...joueuse, [role]: !joueuse[role] }
        : joueuse
    )
  );
}
function changerRoleJoueuse(id, role) {
  setJoueuses((anciennesJoueuses) => {
    const joueuseCible = anciennesJoueuses.find((j) => j.id === id);
    if (!joueuseCible) return anciennesJoueuses;

    const equipe = joueuseCible.equipe;
    const valeurActuelle = joueuseCible[role] || false;

    if (role === "gardienne" && !valeurActuelle) {
      const nbGardiennes = anciennesJoueuses.filter(
        (j) => j.equipe === equipe && j.gardienne
      ).length;

      if (nbGardiennes >= 2) {
        alert("Maximum 2 gardiennes par équipe.");
        return anciennesJoueuses;
      }
    }

    if (role === "capitaine" && !valeurActuelle) {
      return anciennesJoueuses.map((j) =>
        j.equipe === equipe
          ? { ...j, capitaine: j.id === id }
          : j
      );
    }

    if (role === "assistanteCapitaine" && !valeurActuelle) {
      const nbAssistantes = anciennesJoueuses.filter(
        (j) => j.equipe === equipe && j.assistanteCapitaine
      ).length;

      if (nbAssistantes >= 2) {
        alert("Maximum 2 assistantes par équipe.");
        return anciennesJoueuses;
      }
    }

    return anciennesJoueuses.map((j) =>
      j.id === id ? { ...j, [role]: !valeurActuelle } : j
    );
  });
}
  return (
    <main className="app">
      <header className="header">
        <h1>Feuille de match</h1>
        <p>Centre de Contrôle</p>
        <p>
          Partie #{matchInfo.numeroPartie || "---"} —{" "}
          {matchInfo.date || "Date à déterminer"} — {matchInfo.calibre}
        </p>
        <button className="settings-button" onClick={() => setFenetreParametresOuverte(true)}>
  <span>⚙️</span>
</button>
      </header>
      <nav className="tabs">
        <button onClick={() => setPageActive("match")}>Match</button>
        <button onClick={() => setPageActive("alignements")}>Alignements</button>
      </nav>

      {pageActive === "match" && (
        <>
          <section className="actions">
            <button onClick={nouvellePartie}>Nouvelle partie</button>
            <button onClick={() => setFenetreConfigOuverte(true)}>Configuration du match</button>
            <button onClick={ouvrirFenetrePunition}>Ajouter punition</button>
            <button onClick={ouvrirFenetreTempsMort}>Temps mort</button>
            <button onClick={ouvrirFenetreTirBarrage}>Ajouter tir de barrage</button>
            <button onClick={ouvrirFenetreGardienne}>Changement gardienne</button>
            <button onClick={exporterPDF}>Exporter PDF</button>
            <button onClick={envoyerPDF}>Envoyer PDF</button>
          </section>

          <section className="game-clock">
  <div>
    <strong>Heure actuelle</strong>
    <div className="digital-clock">{obtenirHeureActuelle()}</div>
  </div>

  <div>
    <button onClick={() => setMatchInfo({ ...matchInfo, heureDebut: obtenirHeureActuelle(), }) } > Début
    </button>

    <button onClick={() => setMatchInfo({ ...matchInfo, heureFin: obtenirHeureActuelle(), }) } > Fin
    </button>
  </div>

  <div>
    Début : <strong>{matchInfo.heureDebut || "--:--"}</strong>
    {" | "}
    Fin : <strong>{matchInfo.heureFin || "--:--"}</strong>
  </div>
</section>

          <section className="scoreboard">
            <div className="team-card">
              <h2>{matchInfo.equipeLocale || "Équipe locale"}</h2>
              <div className="score">{scoreLocal}</div>
              <button onClick={() => ouvrirFenetreBut("Local")}>+ But local</button>
              <button onClick={() => retirerDernierBut("Local")}>- But local</button>
            </div>

            <div className="period-card">
              <label>Période</label>
              <select value={periode} onChange={(e) => setPeriode(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="PROL">Prolongation</option>
              </select>

              <label>Durée</label>
              <select
                value={dureePeriode}
                onChange={(e) => setDureePeriode(Number(e.target.value))}
              >
                <option value="10">10 min</option>
                <option value="11">11 min</option>
                <option value="12">12 min</option>
                <option value="13">13 min</option>
                <option value="14">14 min</option>
                <option value="15">15 min</option>
              </select>
            </div>

            <div className="team-card">
              <h2>{matchInfo.equipeVisiteuse || "Équipe visiteuse"}</h2>
              <div className="score">{scoreVisiteur}</div>
              <button onClick={() => ouvrirFenetreBut("Visiteur")}>
                + But visiteur
              </button>
              <button onClick={() => retirerDernierBut("Visiteur")}>
                - But visiteur
              </button>
            </div>
          </section>

          <section className="events">
            <h2>Événements</h2>

            {evenements.length === 0 ? (
              <p>Aucun événement pour le moment.</p>
            ) : (
              <ul>
                {evenements.map((event) => (
                  <li key={event.id}>
                    <span>
                      {event.type} — {event.equipeNom} — Période {event.periode} —{" "}
                      Tableau {event.tempsTableau} — Corrigé {event.tempsCorrige}
                      {event.type === "But" && (
                        <>
                          {" "}
                          — But #{event.buteuseNumero} {event.buteuseNom}
                          {event.assistante1Numero &&
                            ` — A1 #${event.assistante1Numero} ${event.assistante1Nom}`}
                          {event.assistante2Numero &&
                            ` — A2 #${event.assistante2Numero} ${event.assistante2Nom}`}
                        </>
                      )}
                      {event.type === "Punition" && (
  <>
    {" "}
    — #{event.joueuseNumero} {event.joueuseNom}
    — {event.punition}
    — {event.duree} min
  </>
)}
{event.type === "Tir de barrage" && (
  <>
    {" "}
    — #{event.joueuseNumero} {event.joueuseNom}
    — {event.reussi ? "Réussi" : "Raté"}
  </>
)}
{event.type === "Changement gardienne" && (
  <>
    {" "}
    — Période {event.periode}
    — Temps {event.tempsCorrige}
  </>
)}
{event.type === "Temps mort" && (
  <>
    {" "}
    — Temps mort utilisé
  </>
)}
                    </span>

                    <button className="delete-button"onClick={() => supprimerEvenement(event.id)}>Supprimer</button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}

      {pageActive === "alignements" && (
        <section className="events">
          <h2>Alignements</h2>

          {joueuses.length === 0 ? (
            <p>Importe un fichier Excel pour afficher les alignements.</p>
          ) : (
            <div className="rosters">
              <div>
                <label>Couleur du chandail</label>
                <select
  value={matchInfo.couleurLocaleChoisie}
  onChange={(e) =>
    setMatchInfo({
      ...matchInfo,
      couleurLocaleChoisie: e.target.value,
    })
  }
>
  <option value="primaire">
    {equipeLocaleData?.nomCouleurPrimaire || "Primaire"}
  </option>

  <option value="secondaire">
    {equipeLocaleData?.nomCouleurSecondaire || "Secondaire"}
  </option>
</select>
  <button
  className="accordion-title"
  onClick={() => setLocalOuvert(!localOuvert)}
>
  {localOuvert ? "▼" : "▶"} {matchInfo.equipeLocale || "Équipe locale"} — Local
</button>
{localOuvert && (
  <> 
<button onClick={() => ouvrirFenetreRemplacante(matchInfo.equipeLocale)}>Ajouter remplaçante</button>
                

{equipeLocaleData && (
  <div>
    <CouleurApercu
      nom={equipeLocaleData.nomCouleurPrimaire}
      code={equipeLocaleData.couleurPrimaire}
    />
    <CouleurApercu
      nom={equipeLocaleData.nomCouleurSecondaire}
      code={equipeLocaleData.couleurSecondaire}
    />
  </div>
)}
{joueuses
  .filter((joueuse) => joueuse.equipe === matchInfo.equipeLocale)
  .map((joueuse) => (
    <div className="roster-row" key={joueuse.id}>
  <div className="roster-player">
    #{joueuse.numero} {joueuse.nom}
    {joueuse.remplacante && " — Remplaçante"}
  </div>

  <div className="roster-options">
    <label>
      <input
        type="checkbox"
        checked={joueuse.absente}
        onChange={() => changerPresence(joueuse.id)}
      />
      Abs.
    </label>

    <label>
      <input
        type="checkbox"
        checked={joueuse.suspendue || false}
        onChange={() => changerSuspension(joueuse.id)}
      />
      Susp.
    </label>

    <label>
      <input
        type="checkbox"
        checked={joueuse.gardienne || false}
        onChange={() => changerRoleJoueuse(joueuse.id, "gardienne")}
      />
      Gard.
    </label>

    <label>
      <input
        type="checkbox"
        checked={joueuse.capitaine || false}
        onChange={() => changerRoleJoueuse(joueuse.id, "capitaine")}
      />
      Cap.
    </label>

    <label>
      <input
        type="checkbox"
        checked={joueuse.assistanteCapitaine || false}
        onChange={() =>
          changerRoleJoueuse(joueuse.id, "assistanteCapitaine")
        }
      />
      Ass.
    </label>
  </div>
</div>
  ))}
</>
)}
              </div>

              <div>
                <label>Couleur du chandail</label>
      <select
        value={matchInfo.couleurVisiteuseChoisie}
        onChange={(e) =>
          setMatchInfo({
            ...matchInfo,
            couleurVisiteuseChoisie: e.target.value,
          })
        }
      >
        <option value="primaire">
          {equipeVisiteuseData?.nomCouleurPrimaire || "Primaire"}
        </option>

        <option value="secondaire">
          {equipeVisiteuseData?.nomCouleurSecondaire || "Secondaire"}
        </option>
      </select>
  <button
    className="accordion-title"
    onClick={() => setVisiteurOuvert(!visiteurOuvert)}
  >
    {visiteurOuvert ? "▼" : "▶"}{" "}
    {matchInfo.equipeVisiteuse || "Équipe visiteuse"} — Visiteur
  </button>

  {visiteurOuvert && (
    <>
      <button
        onClick={() =>
          ouvrirFenetreRemplacante(matchInfo.equipeVisiteuse)
        }
      >
        Ajouter remplaçante
      </button>

      {equipeVisiteuseData && (
        <div>
          <CouleurApercu
            nom={equipeVisiteuseData.nomCouleurPrimaire}
            code={equipeVisiteuseData.couleurPrimaire}
          />
          <CouleurApercu
            nom={equipeVisiteuseData.nomCouleurSecondaire}
            code={equipeVisiteuseData.couleurSecondaire}
          />
        </div>
      )}

      {joueuses
        .filter((joueuse) => joueuse.equipe === matchInfo.equipeVisiteuse)
        .map((joueuse) => (
    <div className="roster-row" key={joueuse.id}>
  <div className="roster-player">
    #{joueuse.numero} {joueuse.nom}
    {joueuse.remplacante && " — Remplaçante"}
  </div>

  <div className="roster-options">
    <label>
      <input
        type="checkbox"
        checked={joueuse.absente}
        onChange={() => changerPresence(joueuse.id)}
      />
      Abs.
    </label>

    <label>
      <input
        type="checkbox"
        checked={joueuse.suspendue || false}
        onChange={() => changerSuspension(joueuse.id)}
      />
      Susp.
    </label>

    <label>
      <input
        type="checkbox"
        checked={joueuse.gardienne || false}
        onChange={() => changerRoleJoueuse(joueuse.id, "gardienne")}
      />
      Gard.
    </label>

    <label>
      <input
        type="checkbox"
        checked={joueuse.capitaine || false}
        onChange={() => changerRoleJoueuse(joueuse.id, "capitaine")}
      />
      Cap.
    </label>

    <label>
      <input
        type="checkbox"
        checked={joueuse.assistanteCapitaine || false}
        onChange={() =>
          changerRoleJoueuse(joueuse.id, "assistanteCapitaine")
        }
      />
      Ass.
    </label>
  </div>
</div>
  ))}
    </>
  )}
</div>
            </div>
          )}
        </section>
      )}

      {fenetreConfigOuverte && (
        <div className="modal-backdrop">
          <div className="modal config-modal">
            <h2>Configuration du match</h2>

            <div className="config-section">
              <h3>Informations du match</h3>

              <label>Numéro de partie</label>
              <input
                value={matchInfo.numeroPartie}
                onChange={(e) =>
                  setMatchInfo({ ...matchInfo, numeroPartie: e.target.value })
                }
                placeholder="Exemple : 104"
              />

              <label>Date</label>
              <input
                type="date"
                value={matchInfo.date}
                onChange={(e) =>
                  setMatchInfo({ ...matchInfo, date: e.target.value })
                }
              />
              <label>Aréna</label>
              <input value={matchInfo.arena} onChange={(e) => setMatchInfo({...matchInfo, arena: e.target.value})} placeholder="Exemple : Aréna Guy Carbonneau"/>
              
              <label>Calibre</label>
              <select
                value={matchInfo.calibre}
                onChange={(e) =>
                  setMatchInfo({ ...matchInfo, calibre: e.target.value })
                }
              >
                <option value="U10">U10</option>
                <option value="U12">U12</option>
                <option value="U14">U14</option>
                <option value="U16">U16</option>
                <option value="U19">U19</option>
                <option value="Senior">Senior</option>
              </select>

              <label>Durée des périodes</label>
              <select
                value={dureePeriode}
                onChange={(e) => setDureePeriode(Number(e.target.value))}
              >
                <option value="10">10 minutes</option>
                <option value="11">11 minutes</option>
                <option value="12">12 minutes</option>
                <option value="13">13 minutes</option>
                <option value="14">14 minutes</option>
                <option value="15">15 minutes</option>
              </select>
            </div>

            <div className="config-section">
              <h3>Équipes</h3>

              <div className="team-config-grid">
                <div className="team-config-card">
                  <h3>Équipe locale</h3>

                  <label>Équipe</label>
                  <select
                    value={matchInfo.equipeLocale}
                    onChange={(e) =>
                      setMatchInfo({
                        ...matchInfo,
                        equipeLocale: e.target.value,
                      })
                    }
                  >
                    <option value="">Choisir</option>
                    {equipes.map((equipe) => (
                      <option key={equipe.id} value={equipe.nom}>
                        {equipe.nom}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="team-config-card">
                  <h3>Équipe visiteuse</h3>

                  <label>Équipe</label>
                  <select
                    value={matchInfo.equipeVisiteuse}
                    onChange={(e) =>
                      setMatchInfo({
                        ...matchInfo,
                        equipeVisiteuse: e.target.value,
                      })
                    }
                  >
                    <option value="">Choisir</option>
                    {equipes.map((equipe) => (
                      <option key={equipe.id} value={equipe.nom}>
                        {equipe.nom}
                      </option>
                      ))}
                  </select>
                </div>
                <div className="config-section">
  <div className="config-section">
 <div className="config-section">
  <h3>Courriel d'envoi</h3>

  <label className="courriel-option">
    <input
      type="checkbox"
      checked={matchInfo.envoyerCourrielLocal || false}
      onChange={(e) =>
        setMatchInfo({
          ...matchInfo,
          envoyerCourrielLocal: e.target.checked,
        })
      }
    />
    <span>Local : {equipeLocaleData?.courriel || "Aucun courriel"}</span>
  </label>

  <label className="courriel-option">
    <input
      type="checkbox"
      checked={matchInfo.envoyerCourrielVisiteur || false}
      onChange={(e) =>
        setMatchInfo({
          ...matchInfo,
          envoyerCourrielVisiteur: e.target.checked,
        })
      }
    />
    <span>Visiteur : {equipeVisiteuseData?.courriel || "Aucun courriel"}</span>
  </label>

  <label>Courriels supplémentaires</label>
  <input
    type="text"
    value={matchInfo.courrielPersonnalise || ""}
    onChange={(e) =>
      setMatchInfo({
        ...matchInfo,
        courrielPersonnalise: e.target.value,
      })
    }
    placeholder="courriel1@exemple.ca, courriel2@exemple.ca"
  />

  <p>
    Destinataires utilisés :{" "}
    <strong>{destinataires.length ? destinataires.join(", ") : "Aucun"}</strong>
  </p>
</div>
</div>
</div>
              </div>
            </div>

            <div className="config-section">
              <h3>Officiels</h3>

              <label>Arbitre principal</label>
<select
  value={matchInfo.arbitrePrincipal}
  onChange={(e) =>
    setMatchInfo({
      ...matchInfo,
      arbitrePrincipal: e.target.value,
    })
  }
>
  <option value="">Choisir un arbitre</option>

  {arbitresDisponibles.map((officiel) => (
    <option key={officiel.id} value={officiel.nom}>
      {officiel.nom}
    </option>
  ))}
</select>

              <label>Arbitre secondaire</label>
<select
  value={matchInfo.arbitreSecondaire}
  onChange={(e) =>
    setMatchInfo({
      ...matchInfo,
      arbitreSecondaire: e.target.value,
    })
  }
>
  <option value="">Choisir un arbitre</option>

  {arbitresDisponibles.map((officiel) => (
    <option key={officiel.id} value={officiel.nom}>
      {officiel.nom}
    </option>
  ))}
</select>

              <label>Chronométreur</label>
<select
  value={matchInfo.chronometreur}
  onChange={(e) =>
    setMatchInfo({
      ...matchInfo,
      chronometreur: e.target.value,
    })
  }
>
  <option value="">Choisir un chronométreur</option>

  {chronometreursDisponibles.map((officiel) => (
    <option key={officiel.id} value={officiel.nom}>
      {officiel.nom}
    </option>
  ))}
</select>

              <label>Marqueur</label>
<select
  value={matchInfo.marqueur}
  onChange={(e) =>
    setMatchInfo({
      ...matchInfo,
      marqueur: e.target.value,
    })
  }
>
  <option value="">Choisir un marqueur</option>

  {marqueursDisponibles.map((officiel) => (
    <option key={officiel.id} value={officiel.nom}>
      {officiel.nom}
    </option>
  ))}
</select>

              <label>Opérateur 30 secondes</label>
<select
  value={matchInfo.operateur30s}
  onChange={(e) =>
    setMatchInfo({
      ...matchInfo,
      operateur30s: e.target.value,
    })
  }
>
  <option value="">Choisir un opérateur</option>

  {operateurs30sDisponibles.map((officiel) => (
    <option key={officiel.id} value={officiel.nom}>
      {officiel.nom}
    </option>
  ))}
</select>
            </div>

            <div className="modal-actions">
              <button onClick={() => setFenetreConfigOuverte(false)}>
                Confirmer
              </button>
              <button
                className="cancel-button"
                onClick={() => setFenetreConfigOuverte(false)}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {fenetreButOuverte && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Ajouter un but — {equipeNomPourBut}</h2>

            <label>Temps affiché au tableau</label>
            <input
              value={tempsTableau}
              onChange={(e) => setTempsTableau(e.target.value)}
              placeholder="Exemple : 08:32"
              autoFocus
            />

            <p>
              Temps corrigé :{" "}
              <strong>{calculerTempsCorrige(tempsTableau) || "--:--"}</strong>
            </p>

            <label>Marqueuse</label>
            <select
              value={numeroButeuse}
              onChange={(e) => setNumeroButeuse(e.target.value)}
            >
              <option value="">Choisir une joueuse</option>
              {joueusesDisponibles.map((joueuse) => (
                <option key={joueuse.id} value={joueuse.numero}>
                  #{joueuse.numero} — {joueuse.nom}
                </option>
              ))}
            </select>

            <label>Assistante 1 optionnelle</label>
            <select value={assistante1} onChange={(e) => setAssistante1(e.target.value)}>
              <option value="">Aucune</option>
              {joueusesDisponibles.map((joueuse) => (
                <option key={joueuse.id} value={joueuse.numero}>
                  #{joueuse.numero} — {joueuse.nom}
                </option>
              ))}
            </select>

            <label>Assistante 2 optionnelle</label>
            <select value={assistante2} onChange={(e) => setAssistante2(e.target.value)}>
              <option value="">Aucune</option>
              {joueusesDisponibles.map((joueuse) => (
                <option key={joueuse.id} value={joueuse.numero}>
                  #{joueuse.numero} — {joueuse.nom}
                </option>
              ))}
            </select>

            <div className="modal-actions">
              <button onClick={confirmerBut}>Confirmer le but</button>
              <button
                className="cancel-button"
                onClick={() => setFenetreButOuverte(false)}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
      {fenetrePunitionOuverte && (
  <div className="modal-backdrop">
    <div className="modal">
      <h2>Ajouter une punition</h2>

      <label>Équipe</label>
      <select
        value={equipePunition}
        onChange={(e) => {
          setEquipePunition(e.target.value);
          setJoueusePunition("");
        }}
      >
        <option value="Local">{matchInfo.equipeLocale || "Local"}</option>
        <option value="Visiteur">{matchInfo.equipeVisiteuse || "Visiteur"}</option>
      </select>

      <label>Temps affiché au tableau</label>
      <input
        value={tempsPunitionTableau}
        onChange={(e) => setTempsPunitionTableau(e.target.value)}
        placeholder="Exemple : 08:32"
      />

      <p>
        Temps corrigé :{" "}
        <strong>{calculerTempsCorrige(tempsPunitionTableau) || "--:--"}</strong>
      </p>

      <label>Joueuse punie</label>
      <select
        value={joueusePunition}
        onChange={(e) => setJoueusePunition(e.target.value)}
      >
        <option value="">Choisir une joueuse</option>
        {joueusesPunitionDisponibles.map((joueuse) => (
          <option key={joueuse.id} value={joueuse.numero}>
            #{joueuse.numero} — {joueuse.nom}
          </option>
          ))}
      </select>
      <label>Purgée par</label>
<select
  value={joueusePurgeePar}
  onChange={(e) => setJoueusePurgeePar(e.target.value)}
>
  <option value="">Même joueuse / aucune</option>
  {joueusesPunitionDisponibles.map((joueuse) => (
    <option key={joueuse.id} value={joueuse.numero}>
      #{joueuse.numero} — {joueuse.nom}
    </option>
  ))}
</select>

      <label>Punition</label>
      <select
        value={typePunition}
        onChange={(e) => setTypePunition(e.target.value)}
      >
        <option value="ACCROCHER / HOOKING">ACCROCHER / HOOKING</option>
<option value="ASSAUT / CHARGE">ASSAUT / CHARGE</option>
<option value="BATON ELEVE / HIGH STICKING">BATON ELEVE / HIGH STICKING</option>
<option value="CINGLER / SLASHING">CINGLER / SLASHING</option>
<option value="DONNER DU COUDE / ELBOWING">DONNER DU COUDE / ELBOWING</option>
<option value="DOUBLE ECHEC / CROSS CHECKING">DOUBLE ECHEC / CROSS CHECKING</option>
<option value="FAIRE TREBUCHER / TRIPPING">FAIRE TREBUCHER / TRIPPING</option>
<option value="MISE EN ECHEC / BODY CONTACT">MISE EN ECHEC / BODY CONTACT</option>
<option value="OBSTRUCTION / INTERFERENCE">OBSTRUCTION / INTERFERENCE</option>
<option value="PLAQUAGE CONTRE LA BANDE / BOARDING">PLAQUAGE CONTRE LA BANDE / BOARDING</option>
<option value="RETARDER LA PARTIE / DELAY OF GAME">RETARDER LA PARTIE / DELAY OF GAME</option>
<option value="RETENUE / HOLDING">RETENUE / HOLDING</option>
<option value="SUBSTITUTION ILLEGALE / ILLEGAL SUBSTITUTION">SUBSTITUTION ILLEGALE / ILLEGAL SUBSTITUTION</option>
<option value="CONDUITE NON SPORTIVE / UNSPORTSMANLIKE CONDUCT  2 MIN.">CONDUITE NON SPORTIVE / UNSPORTSMANLIKE CONDUCT 2 MIN.</option>
<option value="PENALITE MAJEURE / MAJOR PENALTY  4 MIN.">PENALITE MAJEURE / MAJOR PENALTY 4 MIN.</option>
<option value="MAUVAISE CONDUITE / MISCONDUCT  2 MIN.">MAUVAISE CONDUITE / MISCONDUCT 2 MIN.</option>
<option value="PENALITE DE MATCH / MATCH PENALTY  4 MIN.">PENALITE DE MATCH / MATCH PENALTY 4 MIN.</option>
<option value="LANCER DE PUNITION / PENALTY SHOT">LANCER DE PUNITION / PENALTY SHOT</option>
<option value="RUDESSE / ROUGH PLAY  4 MIN.">RUDESSE / ROUGH PLAY 4 MIN.</option>
<option value="ATHLETE EXPULSE POUR AVOIR ACCUMULE 10 MINUTES DE PENALITE">
  ATHLETE EXPULSE POUR AVOIR ACCUMULE 10 MINUTES DE PENALITE
</option>
      </select>

      <label>Durée</label>
      <select
        value={dureePunition}
        onChange={(e) => setDureePunition(e.target.value)}
      >
        <option value="2">2 min</option>
        <option value="4">4 min</option>
        <option value="5">5 min</option>
        <option value="10">10 min</option>
      </select>
      <div className="modal-actions">
        <button onClick={confirmerPunition}>Confirmer la punition</button>
        <button
          className="cancel-button"
          onClick={() => setFenetrePunitionOuverte(false)}
        >
          Annuler
        </button>
      </div>
    </div>
  </div>
)}
{fenetreImportOuverte && (
  <div className="modal-backdrop">
    <div className="modal">
      <h2>Importer Excel</h2>

      <p>Choisis le type de fichier à importer.</p>

      <label className="import-button">
  Importer alignement tournoi
  <input
    type="file"
    accept=".xlsx,.xls"
    onChange={importerAlignementTournoiExcel}
    hidden
  />
</label>

<label className="import-button">
  Importer officiels
  <input
    type="file"
    accept=".xlsx,.xls"
    onChange={importerOfficielsExcel}
    hidden
  />
</label>

     <h3>Import avancé</h3>

<label className="import-button">
  Importer équipes seulement
  <input
    type="file"
    accept=".xlsx,.xls"
    onChange={importerEquipesExcel}
    hidden
  />
</label>

<label className="import-button">
  Importer joueuses seulement
  <input
    type="file"
    accept=".xlsx,.xls"
    onChange={importerJoueusesExcel}
    hidden
  />
</label>

      <div className="modal-actions">
        <button
          className="cancel-button"
          onClick={() => setFenetreImportOuverte(false)}
        >
          Fermer
        </button>
      </div>
    </div>
  </div>
)}
{fenetreAnnulationOuverte && (
  <div className="modal-backdrop">
    <div className="modal">
      <h2>Annulation de punition</h2>

      <p>
        Un but vient d’être marqué à{" "}
        <strong>{butEnAttente?.tempsCorrige}</strong>.
      </p>

      <label>Punition à annuler</label>
      <select
        value={punitionSelectionnee}
        onChange={(e) => setPunitionSelectionnee(e.target.value)}
      >
        <option value="">Aucune sélection</option>

        {punitionsAnnulables.map((punition) => (
          <option key={punition.id} value={punition.id}>
            #{punition.joueuseNumero} — {punition.punition} — retour prévu{" "}
            {punition.tempsRetour}
          </option>
        ))}
      </select>

      <div className="modal-actions">
        <button onClick={confirmerAnnulationPunition}>
          Annuler cette punition
        </button>

        <button onClick={confirmerButSansAnnulation}>
          Aucune annulation
        </button>
      </div>
    </div>
  </div>
)}
{fenetreParametresOuverte && (
  <div className="modal-backdrop">
    <div className="modal">
      <h2>Paramètres</h2>
      <button onClick={() => setFenetreImportOuverte(true)}>Importer Excel</button>
      <h3>Données</h3>
      <button onClick={() => setFenetreSuppressionEquipeOuverte(true)}>Supprimer une équipe</button>
      <button onClick={() => setFenetreSuppressionJoueuseOuverte(true)}>Supprimer une joueuse</button>
      <button onClick={effacerSauvegarde}>Effacer sauvegarde</button>

      <h3>Base de données</h3>
      <button type="button" onClick={() => document.getElementById("importBaseInput").click()}> Importer une base</button>
       <input
       id="importBaseInput"
       type="file"
       accept=".json"
       onChange={importerBaseDeDonnees}
       hidden
      />
      
      <button onClick={exporterBaseDeDonnees}>Exporter la base de données</button>

      <h3>Officiels</h3>
         <button onClick={() => setFenetreListeOfficielsOuverte(true)}>Voir les officiels</button>
         <button onClick={() => setFenetreSuppressionOfficielOuverte(true)}>Supprimer un officiel</button>
         <div className="modal-actions">
         <button className="cancel-button" onClick={() => setFenetreParametresOuverte(false)}>
          Fermer
         </button>
      </div>
    </div>
  </div>
)}
{fenetreTirBarrageOuverte && (
  <div className="modal-backdrop">
    <div className="modal">
      <h2>Ajouter un tir de barrage</h2>

      <label>Équipe</label>
      <select
        value={equipeTirBarrage}
        onChange={(e) => {
          setEquipeTirBarrage(e.target.value);
          setJoueuseTirBarrage("");
        }}
      >
        <option value="Local">{matchInfo.equipeLocale || "Local"}</option>
        <option value="Visiteur">{matchInfo.equipeVisiteuse || "Visiteur"}</option>
      </select>

      <label>Joueuse</label>
      <select
        value={joueuseTirBarrage}
        onChange={(e) => setJoueuseTirBarrage(e.target.value)}
      >
        <option value="">Choisir une joueuse</option>
        {joueusesTirBarrageDisponibles.map((joueuse) => (
          <option key={joueuse.id} value={joueuse.numero}>
            #{joueuse.numero} — {joueuse.nom}
          </option>
        ))}
      </select>

      <label>
        <input
          type="checkbox"
          checked={tirBarrageReussi}
          onChange={(e) => setTirBarrageReussi(e.target.checked)}
        />
        Tir réussi
      </label>

      <div className="modal-actions">
        <button onClick={confirmerTirBarrage}>Confirmer</button>
        <button
          className="cancel-button"
          onClick={() => setFenetreTirBarrageOuverte(false)}
        >
          Annuler
        </button>
      </div>
    </div>
  </div>
)}
{fenetreRemplacanteOuverte && (
  <div className="modal-backdrop">
    <div className="modal">
      <h2>Ajouter une remplaçante</h2>

      <p>Équipe : <strong>{equipeRemplacante}</strong></p>

      <label>Numéro</label>
      <input
        value={numeroRemplacante}
        onChange={(e) => setNumeroRemplacante(e.target.value)}
        placeholder="Exemple : 14"
      />

      <label>Nom</label>
      <input
        value={nomRemplacante}
        onChange={(e) => setNomRemplacante(e.target.value)}
        placeholder="Exemple : Marie Tremblay"
      />

      <div className="modal-actions">
        <button onClick={confirmerRemplacante}>Ajouter</button>
        <button
          className="cancel-button"
          onClick={() => setFenetreRemplacanteOuverte(false)}
        >
          Annuler
        </button>
      </div>
    </div>
  </div>
)}

{fenetreSuppressionEquipeOuverte && (
  <div className="modal-backdrop">
    <div className="modal">
      <h2>Supprimer une équipe</h2>

      <label>Équipe</label>
      <select
        value={equipeASupprimer}
        onChange={(e) => setEquipeASupprimer(e.target.value)}
      >
        <option value="">Choisir une équipe</option>

        {equipes.map((equipe) => (
          <option key={equipe.id} value={equipe.nom}>
            {equipe.nom}
          </option>
        ))}
      </select>

      <div className="modal-actions">
        <button onClick={supprimerEquipe}>Supprimer</button>
        <button
          className="cancel-button"
          onClick={() => setFenetreSuppressionEquipeOuverte(false)}
        >
          Annuler
        </button>
      </div>
    </div>
  </div>
)}
{fenetreListeOfficielsOuverte && (
  <div className="modal-backdrop">
    <div className="modal config-modal">
      <h2>Liste des officiels</h2>

      {officiels.length === 0 ? (
        <p>Aucun officiel importé.</p>
      ) : (
        <ul>
          {officiels.map((officiel) => (
            <li key={officiel.id}>
              <strong>{officiel.nom}</strong>
              {" — "}
              {[
                officiel.arbitre && "Arbitre",
                officiel.chronometreur && "Chronométreur",
                officiel.marqueur && "Marqueur",
                officiel.operateur30s && "Opérateur 30 sec.",
              ]
                .filter(Boolean)
                .join(", ")}
            </li>
          ))}
        </ul>
      )}

      <div className="modal-actions">
        <button
          className="cancel-button"
          onClick={() => setFenetreListeOfficielsOuverte(false)}
        >
          Fermer
        </button>
      </div>
    </div>
  </div>
)}
{fenetreSuppressionOfficielOuverte && (
  <div className="modal-backdrop">
    <div className="modal">
      <h2>Supprimer un officiel</h2>

      <label>Officiel</label>
      <select
        value={officielASupprimer}
        onChange={(e) => setOfficielASupprimer(e.target.value)}
      >
        <option value="">Choisir un officiel</option>

        {officiels.map((officiel) => (
          <option key={officiel.id} value={officiel.nom}>
            {officiel.nom}
          </option>
        ))}
      </select>

      <div className="modal-actions">
        <button onClick={supprimerOfficiel}>Supprimer</button>
        <button
          className="cancel-button"
          onClick={() => setFenetreSuppressionOfficielOuverte(false)}
        >
          Annuler
        </button>
      </div>
    </div>
  </div>
)}
{fenetreSuppressionJoueuseOuverte && (
  <div className="modal-backdrop">
    <div className="modal">
      <h2>Supprimer une joueuse</h2>

      <label>Équipe</label>
      <select
        value={equipeSuppressionJoueuse}
        onChange={(e) => {
          setEquipeSuppressionJoueuse(e.target.value);
          setJoueuseASupprimer("");
        }}
      >
        <option value="">Choisir une équipe</option>

        {equipes.map((equipe) => (
          <option key={equipe.id} value={equipe.nom}>
            {equipe.nom}
          </option>
        ))}
      </select>

      <label>Joueuse</label>
      <select
        value={joueuseASupprimer}
        onChange={(e) => setJoueuseASupprimer(e.target.value)}
        disabled={!equipeSuppressionJoueuse}
      >
        <option value="">Choisir une joueuse</option>

        {joueuses
          .filter(
            (joueuse) =>
              joueuse.equipe === equipeSuppressionJoueuse
          )
          .sort((a, b) => Number(a.numero) - Number(b.numero))
          .map((joueuse) => (
            <option key={joueuse.id} value={joueuse.id}>
              #{joueuse.numero} {joueuse.nom}
            </option>
          ))}
      </select>

      <div className="modal-actions">
        <button onClick={supprimerJoueuse}>
          Supprimer
        </button>

        <button
          className="cancel-button"
          onClick={() =>
            setFenetreSuppressionJoueuseOuverte(false)
          }
        >
          Annuler
        </button>
      </div>
    </div>
  </div>
)}
{fenetreGardienneOuverte && (
  <div className="modal-backdrop">
    <div className="modal">
      <h2>Changement de gardienne</h2>

      <label>Équipe</label>
      <select
        value={equipeGardienne}
        onChange={(e) => {
          setEquipeGardienne(e.target.value);
          setGardienneSortante("");
          setGardienneEntrante("");
        }}
      >
        <option value="Local">{matchInfo.equipeLocale || "Local"}</option>
        <option value="Visiteur">{matchInfo.equipeVisiteuse || "Visiteur"}</option>
      </select>

      <label>Temps affiché au tableau</label>
      <input
        value={tempsGardienneTableau}
        onChange={(e) => setTempsGardienneTableau(e.target.value)}
        placeholder="Exemple : 08:32"
      />

      <p>
        Temps corrigé :{" "}
        <strong>{calculerTempsCorrige(tempsGardienneTableau) || "--:--"}</strong>
      </p>

      <div className="modal-actions">
        <button onClick={confirmerChangementGardienne}>Confirmer</button>
        <button
          className="cancel-button"
          onClick={() => setFenetreGardienneOuverte(false)}
        >
          Annuler
        </button>
      </div>
    </div>
  </div>
)}
{fenetreTempsMortOuverte && (
  <div className="modal-backdrop">
    <div className="modal">
      <h2>Temps mort</h2>

      <label>Équipe</label>
      <select
        value={equipeTempsMort}
        onChange={(e) => setEquipeTempsMort(e.target.value)}
      >
        <option value="Local">{matchInfo.equipeLocale || "Local"}</option>
        <option value="Visiteur">{matchInfo.equipeVisiteuse || "Visiteur"}</option>
      </select>

      <p>
        Période : <strong>{periode}</strong>
      </p>

      <div className="modal-actions">
        <button onClick={confirmerTempsMort}>Confirmer</button>
        <button
          className="cancel-button"
          onClick={() => setFenetreTempsMortOuverte(false)}
        >
          Annuler
        </button>
      </div>
    </div>
  </div>
)}
    </main>
  );
}

export default App;