import * as XLSX from "xlsx";

export function lireSportPlusXls(fichier) {
  return new Promise((resolve, reject) => {
    const lecteur = new FileReader();

    lecteur.onload = (event) => {
      try {
        const donnees = new Uint8Array(event.target.result);

        const classeur = XLSX.read(donnees, {
          type: "array",
        });

        const feuilles = classeur.SheetNames.map((nomFeuille) => {
          const feuille = classeur.Sheets[nomFeuille];

          return {
            nom: nomFeuille,
            lignes: XLSX.utils.sheet_to_json(feuille, {
              header: 1,
              defval: "",
              blankrows: false,
            }),
          };
        });

        resolve({
          nomFichier: fichier.name,
          feuilles,
        });
      } catch (erreur) {
        reject(erreur);
      }
    };

    lecteur.onerror = reject;

    lecteur.readAsArrayBuffer(fichier);
  });
}