import { useState } from "react";
import { lireSportPlusXls } from "../importation/lecteurs/lireSportPlusXls";
import { detecterSportPlus } from "../importation/detecteurs/detecterSportPlus";
import { decouperSectionsSportPlus } from "../importation/analyseurs/decouperSectionsSportPlus";
import { extraireParticipantesSportPlus } from "../importation/extracteurs/extraireParticipantesSportPlus";
import { adapterParticipanteSportPlus } from "../importation/adaptateurs/adapterParticipanteSportPlus";
import { validerParticipantes } from "../importation/validateurs/validerParticipantes";
import { comparerParticipantes } from "../importation/comparateurs/comparerParticipantes";
import { preparerPrevisualisation } from "../importation/previsualisation/preparerPrevisualisation";
import PrevisualisationImportation from "./PrevisualisationImportation";

function ImportationAdministration({
  retournerAccueil,
  joueuses,
  setJoueuses,
}) {
   
  const [fichierSelectionne, setFichierSelectionne] = useState(null);
  const [erreur, setErreur] = useState("");
  const [document, setDocument] = useState(null);
  const [previsualisation, setPrevisualisation] = useState(null);

  function selectionnerFichier(event) {
    const fichier = event.target.files?.[0];

    setErreur("");
    setFichierSelectionne(null);
    setDocument(null);

    if (!fichier) {
      return;
    }

    const extension = fichier.name
      .split(".")
      .pop()
      ?.toLowerCase();

    if (extension !== "xls") {
      setErreur(
        "Le fichier sélectionné n'est pas un fichier SportPlus au format .xls."
      );

      event.target.value = "";
      return;
    }

    setFichierSelectionne(fichier);
  }

  function annulerSelection() {
    setFichierSelectionne(null);
    setErreur("");
    setDocument(null);
  }

  async function analyserFichier() {
    try {
      setErreur("");

      const resultat = await lireSportPlusXls(fichierSelectionne);
      const detection = detecterSportPlus(resultat);

      if (!detection.reconnu) {
        setDocument(null);
        setErreur(
          "Le fichier ne semble pas être un rapport SportPlus valide."
        );
        return;
      }

      const sections = decouperSectionsSportPlus(resultat);

      console.table(
        sections.map((section) => ({
          code: section.code,
          categorie: section.categorie,
          saison: section.saison,
          ligneDebut: section.ligneDebut,
          ligneFin: section.ligneFin,
          nombreLignes: section.lignes.length,
        }))
      );

      const participantes = sections
        .flatMap((section) =>
          extraireParticipantesSportPlus(section)
        )
        .map(adapterParticipanteSportPlus);

      const validation = validerParticipantes(participantes);

console.table(participantes);
console.log(participantes[0]);
console.log(joueuses[0]);

// Temporaire : la base est vide
const comparaison = comparerParticipantes({
  participantes,
  joueuses,
});

const previsualisation =
  preparerPrevisualisation(comparaison);

setPrevisualisation(previsualisation);

setDocument({
  ...resultat,
  detection,
  sections,
  participantes,
  validation,
});

    } catch (erreurLecture) {
      console.error(erreurLecture);
      setDocument(null);
      setErreur("Le fichier n’a pas pu être analysé.");
    }
  }

  return (
    <section className="administration-contenu">
      <div className="administration-section-entete">
        <button
          type="button"
          className="administration-bouton-secondaire"
          onClick={retournerAccueil}
        >
          Retour aux volets administratifs
        </button>

        <h2>Importation et exportation</h2>

        <p>
          Importer les participantes provenant d’un rapport SportPlus.
        </p>
      </div>

      <div className="administration-importation">
        <section className="administration-carte">
          <div className="administration-carte-entete">
            <h3>Importer les joueuses</h3>

            <span className="administration-statut">
              SportPlus
            </span>
          </div>

          <p>
            Sélectionne le rapport des participantes exporté depuis
            SportPlus au format Excel 97-2003.
          </p>

          <label className="administration-importation-bouton">
            Sélectionner un fichier .xls

            <input
              type="file"
              accept=".xls,application/vnd.ms-excel"
              onChange={selectionnerFichier}
              hidden
            />
          </label>

          {erreur && (
            <p
              className="administration-message-erreur"
              role="alert"
            >
              {erreur}
            </p>
          )}

          {fichierSelectionne && (
            <div className="administration-fichier-selectionne">
              <h4>Fichier sélectionné</h4>

              <p>
                <strong>Nom :</strong>{" "}
                {fichierSelectionne.name}
              </p>

              <p>
                <strong>Taille :</strong>{" "}
                {Math.ceil(fichierSelectionne.size / 1024)} Ko
              </p>

              <div className="administration-actions">
                <button
                  type="button"
                  onClick={annulerSelection}
                >
                  Annuler
                </button>

                <button
                  type="button"
                  onClick={analyserFichier}
                >
                  Analyser le fichier
                </button>
              </div>

              {document && (
                <div className="administration-resultat-analyse">
                  <p>
                    <strong>Feuilles :</strong>{" "}
                    {document.feuilles?.length ?? 0}
                  </p>

                  <p>
                    <strong>Lignes :</strong>{" "}
                    {document.feuilles?.[0]?.lignes?.length ?? 0}
                  </p>

                  <p>
                    <strong>
                      Rapport SportPlus reconnu :
                    </strong>{" "}
                    {document.detection?.reconnu ? "Oui" : "Non"}
                  </p>

                  <p>
                    <strong>Type :</strong>{" "}
                    {document.detection?.type ?? "Inconnu"}
                  </p>

                  <p>
                    <strong>Groupes détectés :</strong>{" "}
                    {document.sections?.length ?? 0}
                  </p>

                  {document.sections?.map((section) => (
                    <div
                      key={`${section.code}-${section.ligneDebut}`}
                    >
                      <strong>{section.categorie}</strong>{" "}
                      — {section.code} — {section.saison}
                    </div>
                  ))}

                  <p>
                    <strong>
                      Participantes détectées :
                    </strong>{" "}
                    {document.participantes?.length ?? 0}
                  </p>

                  <p>
                    <strong>
                      Participantes valides :
                    </strong>{" "}
                    {document.validation?.resume?.valides ?? 0}
                  </p>

                  <p>
                    <strong>
                      Participantes invalides :
                    </strong>{" "}
                    {document.validation?.resume?.invalides ?? 0}
                  </p>

                  <p>
                    <strong>Avertissements :</strong>{" "}
                    {document.validation?.resume
                      ?.avertissements ?? 0}
                  </p>
                </div>
              )}
              <PrevisualisationImportation
  previsualisation={previsualisation}
  joueuses={joueuses}
  setJoueuses={setJoueuses}
/>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}

export default ImportationAdministration;