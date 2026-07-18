import * as XLSX from "xlsx";
import { creerId } from "../utils/ids";

export function exporterBaseDeDonnees({
  equipes,
  joueuses,
  officiels,
}) {
  const donnees = {
    version: "1.1",
    dateExport: new Date().toISOString(),
    equipes,
    joueuses,
    officiels,
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

export function importerBaseDeDonnees({
  event,
  setEquipes,
  setJoueuses,
  setOfficiels,
}) {
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
          "Cette opération remplacera les équipes, joueuses et officiels actuels. Continuer ?"
        )
      ) {
        return;
      }

      setEquipes(donnees.equipes);
      setJoueuses(donnees.joueuses);
      setOfficiels(donnees.officiels || []);

      alert("Base de données importée.");
      event.target.value = "";
    } catch {
      alert("Impossible de lire ce fichier.");
    }
  };

  lecteur.readAsText(fichier);
}
export function importerJoueusesExcel({
  event,
  setJoueuses,
  setEquipes,
  setMatchInfo,
  setPageActive,
  setFenetreImportOuverte,
  couleurs,
}) {
  const fichier = event.target.files[0];

  if (!fichier) return;

  const lecteur = new FileReader();

  lecteur.onload = (e) => {
    try {
      const donnees = new Uint8Array(e.target.result);
      const classeur = XLSX.read(donnees, { type: "array" });
      const premiereFeuille = classeur.SheetNames[0];
      const feuille = classeur.Sheets[premiereFeuille];

      const lignes = XLSX.utils.sheet_to_json(feuille);

      const joueusesImportees = lignes
        .map((ligne) => ({
          id: creerId(),
          equipe: String(ligne.Equipe || "").trim(),
          numero: String(ligne.Numero || "").trim(),
          nom: String(ligne.Nom || "").trim(),
          gardienne:
            String(ligne.Gardienne || "").trim().toUpperCase() === "OUI",
          capitaine:
            String(ligne.Capitaine || "").trim().toUpperCase() === "OUI",
          assistanteCapitaine:
            String(ligne.AssistanteCapitaine || "")
              .trim()
              .toUpperCase() === "OUI",
          absente: false,
          suspendue: false,
          remplacante: false,
        }))
        .filter(
          (joueuse) =>
            joueuse.equipe &&
            joueuse.numero &&
            joueuse.nom
        );

      if (joueusesImportees.length === 0) {
        alert(
          "Aucune joueuse valide trouvée. Vérifie les colonnes du fichier Excel."
        );
        event.target.value = "";
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
              assistanteCapitaine:
                nouvelleJoueuse.assistanteCapitaine,
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
              id: creerId(),
              nom: nomEquipe,
              ville: "",
              calibre: "",
              courriel: "",
              nomCouleurPrimaire: "Bleu",
              nomCouleurSecondaire: "Blanc",
              couleurPrimaire: couleurs.Bleu,
              couleurSecondaire: couleurs.Blanc,
              logo: "",
              entraineurChef: "",
              assistant1: "",
              assistant2: "",
              gerante: "",
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
    } catch (error) {
      console.error("Erreur pendant l'import des joueuses :", error);
      alert("Impossible de lire le fichier des joueuses.");
      event.target.value = "";
    }
  };

  lecteur.readAsArrayBuffer(fichier);
}