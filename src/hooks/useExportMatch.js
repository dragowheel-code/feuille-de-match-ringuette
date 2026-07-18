import { creerPDF } from "../services/pdfExport";

export function useExportMatch({
  matchInfo,
  dureePeriode,
  evenements,
  joueuses,
  equipeLocaleData,
  equipeVisiteuseData,
  scoreLocal,
  scoreVisiteur,
  destinataires,
  validerFeuilleMatch,
}) {
  function exporterPDF() {
    creerPDF({
      sauvegarder: true,
      matchInfo,
      dureePeriode,
      evenements,
      joueuses,
      equipeLocaleData,
      equipeVisiteuseData,
      scoreLocal,
      scoreVisiteur,
    });
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

    if (destinataires.length === 0) {
      alert("Aucun destinataire sélectionné.");
      return;
    }

    const { doc, nomFichier } = creerPDF({
      sauvegarder: false,
      matchInfo,
      dureePeriode,
      evenements,
      joueuses,
      equipeLocaleData,
      equipeVisiteuseData,
      scoreLocal,
      scoreVisiteur,
    });

    const blob = doc.output("blob");

    const fichier = new File([blob], nomFichier, {
      type: "application/pdf",
    });

    const sujet = `Feuille de match #${
      matchInfo.numeroPartie || ""
    } - ${matchInfo.equipeLocale || "Local"} vs ${
      matchInfo.equipeVisiteuse || "Visiteur"
    }`;

    const texte = `Bonjour,

Vous trouverez ci-joint la feuille de match.

Partie : ${matchInfo.numeroPartie || ""}
${matchInfo.equipeLocale || "Local"} vs ${
      matchInfo.equipeVisiteuse || "Visiteur"
    }

Merci.`;

    try {
      if (
        navigator.canShare &&
        navigator.canShare({ files: [fichier] })
      ) {
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

    const mailto = `mailto:${destinataires.join(
      ","
    )}?subject=${encodeURIComponent(
      sujet
    )}&body=${encodeURIComponent(
      texte +
        "\n\nLe PDF a été téléchargé. Ajoute-le en pièce jointe avant d'envoyer le courriel."
    )}`;

    window.open(mailto, "_self");
  }

  return {
    exporterPDF,
    envoyerPDF,
  };
}