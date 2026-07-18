import * as XLSX from "xlsx";
import { creerId } from "../utils/ids";

export function importerEquipesExcel({
  event,
  couleurs,
  setEquipes,
  setMatchInfo,
  setFenetreImportOuverte,
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

      const equipesImportees = lignes
        .map((ligne) => {
          const nomCouleurPrimaire = String(
            ligne.NomCouleurPrimaire || "Bleu"
          ).trim();

          const nomCouleurSecondaire = String(
            ligne.NomCouleurSecondaire || "Blanc"
          ).trim();

          return {
            id: creerId(),
            nom: String(ligne.Nom || "").trim(),
            ville: String(ligne.Ville || "").trim(),
            calibre: String(ligne.Calibre || "").trim(),

            nomCouleurPrimaire,
            nomCouleurSecondaire,

            couleurPrimaire:
              couleurs[nomCouleurPrimaire] || couleurs.Bleu || "#003DA5",

            couleurSecondaire:
              couleurs[nomCouleurSecondaire] || couleurs.Blanc || "#FFFFFF",

            entraineurChef: String(ligne.EntraineurChef || "").trim(),
            assistant1: String(ligne.Assistant1 || "").trim(),
            assistant2: String(ligne.Assistant2 || "").trim(),
            gerante: String(ligne.Gerante || "").trim(),
            logo: String(ligne.Logo || "").trim(),
            courriel: String(ligne.Courriel || "").trim(),
          };
        })
        .filter((equipe) => equipe.nom);

      if (equipesImportees.length === 0) {
        alert(
          "Aucune équipe valide trouvée. Vérifie les colonnes du fichier Excel."
        );
        event.target.value = "";
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

              // Conserve l'identifiant déjà enregistré.
              id: equipesFusionnees[indexExistant].id,
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
        calibre:
          equipesImportees[0]?.calibre || ancienMatchInfo.calibre,
      }));

      setFenetreImportOuverte(false);

      alert(`${equipesImportees.length} équipes importées.`);
      event.target.value = "";
    } catch (error) {
      console.error("Erreur pendant l'import des équipes :", error);
      alert("Impossible de lire le fichier des équipes.");
      event.target.value = "";
    }
  };

  lecteur.readAsArrayBuffer(fichier);
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
export function importerAlignementTournoiExcel({
  event,
  couleurs,
  matchInfo,
  setEquipes,
  setJoueuses,
}) {
  const fichier = event.target.files[0];
  if (!fichier) return;

  const nomEquipe = fichier.name.replace(/\.[^/.]+$/, "").trim();
  const lecteur = new FileReader();

  lecteur.onload = (e) => {
    try {
      const donnees = new Uint8Array(e.target.result);
      const classeur = XLSX.read(donnees, { type: "array" });
      const feuille = classeur.Sheets[classeur.SheetNames[0]];
      const lignes = XLSX.utils.sheet_to_json(feuille);

      let entraineurChef = "";
      const assistants = [];
      let gerante = "";

      const joueusesImportees = lignes
        .map((ligne) => {
          const nom = String(ligne.Nom || "").trim();
          const prenom = String(
            ligne.Prénom || ligne.Prenom || ""
          ).trim();
          const numero = String(
            ligne.Numero || ligne.Numéro || ""
          ).trim();
          const type = String(ligne.Type || "").trim();

          const fonction = String(
            ligne.Fonction ||
              ligne["Type "] ||
              ligne.Type ||
              ""
          )
            .trim()
            .toLowerCase();

          const nomComplet = `${prenom} ${nom}`.trim();

          if (
            fonction.includes("entraineur chef") ||
            fonction.includes("entraîneur chef")
          ) {
            entraineurChef = nomComplet;
            return null;
          }

          if (fonction.includes("assistant")) {
            assistants.push(nomComplet);
            return null;
          }

          if (
            fonction.includes("gérante") ||
            fonction.includes("gerante")
          ) {
            gerante = nomComplet;
            return null;
          }

          return {
            id: creerId(),
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
        .filter(
          (joueuse) =>
            joueuse &&
            joueuse.numero &&
            joueuse.nom
        );

      setEquipes((anciennesEquipes) => {
        const equipesFusionnees = [...anciennesEquipes];

        const indexExistant = equipesFusionnees.findIndex(
          (equipe) => equipe.nom === nomEquipe
        );

        const equipeImportee = {
          id: creerId(),
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

      const personnel = [
        entraineurChef,
        assistants[0],
        assistants[1],
        gerante,
      ].filter(Boolean);

      alert(
        `${joueusesImportees.length} joueuses importées pour ${nomEquipe}.` +
          (personnel.length > 0
            ? `\nPersonnel importé : ${personnel.join(", ")}`
            : "")
      );

      event.target.value = "";
    } catch (error) {
      console.error(
        "Erreur pendant l'import de l'alignement tournoi :",
        error
      );

      alert("Impossible de lire le fichier d'alignement tournoi.");
      event.target.value = "";
    }
  };

  lecteur.readAsArrayBuffer(fichier);
}