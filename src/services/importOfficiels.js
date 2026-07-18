import * as XLSX from "xlsx";

export function importerOfficielsExcel({
  event,
  setOfficiels,
}) {
  const fichier = event.target.files[0];

  if (!fichier) return;

  const lecteur = new FileReader();

  lecteur.onload = (e) => {
    const donnees = new Uint8Array(e.target.result);
    const classeur = XLSX.read(donnees, { type: "array" });
    const feuille = classeur.Sheets[classeur.SheetNames[0]];
    const lignes = XLSX.utils.sheet_to_json(feuille);

    const officielsImportes = lignes
      .map((ligne) => ({
        id: crypto.randomUUID(),
        nom: String(ligne.Nom || "").trim(),
        arbitre:
          String(ligne.Arbitre || "").trim().toUpperCase() === "OUI",
        chronometreur:
          String(ligne.Chronometreur || "").trim().toUpperCase() === "OUI",
        marqueur:
          String(ligne.Marqueur || "").trim().toUpperCase() === "OUI",
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