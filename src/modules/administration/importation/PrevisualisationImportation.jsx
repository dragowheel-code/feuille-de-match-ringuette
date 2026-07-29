import { useState } from "react";
import "./PrevisualisationImportation.css";
import importerParticipantes from "./importerParticipantes";
import ConfirmationModal from "../../../modals/ConfirmationModal";

const LIBELLES_CHAMPS = {
  dateNaissance: "Date de naissance",
  numeroInscription: "Numéro d'inscription",
  adresse: "Adresse",
  ville: "Ville",
  codePostal: "Code postal",
  telephone: "Téléphone",
  sexe: "Sexe",
  categorie: "Catégorie",
  codeCategorie: "Code de catégorie",
  saison: "Saison",
};

function creerIdentifiantLigne(ligne, type, index) {
  const identifiantPrincipal =
    ligne.joueuse?.id ??
    ligne.participante?.numeroInscription ??
    ligne.participante?.nomComplet ??
    "sans-identifiant";

  return `${type}-${identifiantPrincipal}-${index}`;
}

function PrevisualisationImportation({
  previsualisation,
  joueuses,
  setJoueuses,
  }) {
  const [nouvellesOuvertes, setNouvellesOuvertes] =
    useState(true);

  const [misesAJourOuvertes, setMisesAJourOuvertes] =
    useState(false);

  /*
   * On conserve uniquement les identifiants décochés.
   * Toutes les autres lignes sont donc cochées par défaut.
   *
   * Cette méthode évite complètement useEffect et demeure
   * correcte lorsque previsualisation change.
   */
  const [lignesDeselectionnees, setLignesDeselectionnees] =
    useState([]);

    const [confirmationOuverte, setConfirmationOuverte] =
  useState(false);

  const [rapportImportation, setRapportImportation] =
  useState(null);

  if (!previsualisation) {
    return null;
  }

  const nouvelles =
    previsualisation.groupes?.nouvelles ?? [];

  const misesAJour =
    previsualisation.groupes?.misesAJour ?? [];

  function ligneEstSelectionnee(identifiant) {
    return !lignesDeselectionnees.includes(identifiant);
  }

  function basculerSelection(identifiant) {
    setLignesDeselectionnees((deselectionActuelle) => {
      const ligneEstDeselectionnee =
        deselectionActuelle.includes(identifiant);

      if (ligneEstDeselectionnee) {
        return deselectionActuelle.filter(
          (element) => element !== identifiant
        );
      }

      return [
        ...deselectionActuelle,
        identifiant,
      ];
    });
  }

  const totalSelectionnees =
  nouvelles.length +
  misesAJour.length -
  lignesDeselectionnees.length;

const totalParticipantes =
  nouvelles.length +
  misesAJour.length;

const toutesSelectionnees =
  lignesDeselectionnees.length === 0;

  function confirmerImportation() {
  const participantesSelectionnees = [
    ...nouvelles,
    ...misesAJour,
  ].filter((ligne, index) => {
    const type =
      index < nouvelles.length
        ? "nouvelle"
        : "mise-a-jour";

    const indexLocal =
      index < nouvelles.length
        ? index
        : index - nouvelles.length;

    const identifiant =
      creerIdentifiantLigne(
        ligne,
        type,
        indexLocal
      );

    return ligneEstSelectionnee(identifiant);
  });

  const resultat = importerParticipantes({
    participantesSelectionnees,
    joueuses,
  });

  if (!resultat.validation?.valide) {
    console.error(resultat.validation);
    return;
  }

  setJoueuses(resultat.joueuses);
setConfirmationOuverte(false);
setRapportImportation(resultat.rapport);
}

  return (
    <div className="administration-resultat-analyse">
      <h4>Prévisualisation de l'importation</h4>

      <div className="administration-previsualisation-resume">
        <div className="administration-previsualisation-resume-carte administration-previsualisation-resume-carte--total">
          <span className="administration-previsualisation-resume-nombre">
            {previsualisation.resume?.total ?? 0}
          </span>

          <span className="administration-previsualisation-resume-libelle">
            Participantes
          </span>
        </div>

        <div className="administration-previsualisation-resume-carte administration-previsualisation-resume-carte--identiques">
          <span className="administration-previsualisation-resume-nombre">
            {previsualisation.resume?.identiques ?? 0}
          </span>

          <span className="administration-previsualisation-resume-libelle">
            Identiques
          </span>
        </div>

        <div className="administration-previsualisation-resume-carte administration-previsualisation-resume-carte--nouvelles">
          <span className="administration-previsualisation-resume-nombre">
            {previsualisation.resume?.nouvelles ?? 0}
          </span>

          <span className="administration-previsualisation-resume-libelle">
            Nouvelles
          </span>
        </div>

        <div className="administration-previsualisation-resume-carte administration-previsualisation-resume-carte--mises-a-jour">
          <span className="administration-previsualisation-resume-nombre">
            {previsualisation.resume?.misesAJour ?? 0}
          </span>

          <span className="administration-previsualisation-resume-libelle">
            Mises à jour
          </span>
        </div>

        <div className="administration-previsualisation-resume-carte administration-previsualisation-resume-carte--correspondances">
          <span className="administration-previsualisation-resume-nombre">
            {previsualisation.resume
              ?.correspondancesProbables ?? 0}
          </span>

          <span className="administration-previsualisation-resume-libelle">
            Correspondances probables
          </span>
        </div>

        <div className="administration-previsualisation-resume-carte administration-previsualisation-resume-carte--doublons">
          <span className="administration-previsualisation-resume-nombre">
            {previsualisation.resume?.doublons ?? 0}
          </span>

          <span className="administration-previsualisation-resume-libelle">
            Doublons
          </span>
        </div>
      </div>

<div className="administration-previsualisation-actions">

  <button
    type="button"
    onClick={() =>
      setLignesDeselectionnees([])
    }
    disabled={toutesSelectionnees}
  >
    Tout sélectionner
  </button>

  <button
    type="button"
    onClick={() => {
      const tousLesIds = [
        ...nouvelles.map((ligne, index) =>
          creerIdentifiantLigne(
            ligne,
            "nouvelle",
            index
          )
        ),

        ...misesAJour.map((ligne, index) =>
          creerIdentifiantLigne(
            ligne,
            "mise-a-jour",
            index
          )
        ),
      ];

      setLignesDeselectionnees(
        tousLesIds
      );
    }}
    disabled={
      lignesDeselectionnees.length ===
      totalParticipantes
    }
  >
    Tout désélectionner
  </button>

<button
  type="button"
  className="administration-previsualisation-bouton-importer"
  disabled={totalSelectionnees === 0}
  onClick={() => setConfirmationOuverte(true)}
>
  Importer ({totalSelectionnees})
</button>

</div>

      {nouvelles.length > 0 && (
        <section className="administration-previsualisation-groupe">
          <button
            type="button"
            className="administration-previsualisation-entete-groupe"
            onClick={() =>
              setNouvellesOuvertes(
                (valeur) => !valeur
              )
            }
          >
            <span>
              {nouvellesOuvertes ? "▾" : "▸"}
            </span>

            <strong>
              Nouvelles joueuses ({nouvelles.length})
            </strong>
          </button>

          {nouvellesOuvertes && (
            <div className="administration-previsualisation-liste">
              {nouvelles.map((ligne, index) => {
                const identifiant =
                  creerIdentifiantLigne(
                    ligne,
                    "nouvelle",
                    index
                  );

                return (
                  <div
                    key={identifiant}
                    className="administration-previsualisation-ligne"
                  >
                    <label className="administration-previsualisation-selection">
                      <input
                        type="checkbox"
                        checked={ligneEstSelectionnee(
                          identifiant
                        )}
                        onChange={() =>
                          basculerSelection(
                            identifiant
                          )
                        }
                      />

                      <strong>
                        {ligne.participante
                          ?.nomComplet ??
                          "Nom inconnu"}
                      </strong>
                    </label>

                    <p>
                      <span>Catégorie :</span>{" "}
                      {ligne.participante?.categorie ??
                        "Non précisée"}
                    </p>

                    <p>
                      <span>Code :</span>{" "}
                      {ligne.participante
                        ?.codeCategorie ??
                        "Non précisé"}
                    </p>

                    <p>
                      <span>
                        Numéro d’inscription :
                      </span>{" "}
                      {ligne.participante
                        ?.numeroInscription ??
                        "Non précisé"}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {misesAJour.length > 0 && (
        <section className="administration-previsualisation-groupe">
          <button
            type="button"
            className="administration-previsualisation-entete-groupe"
            onClick={() =>
              setMisesAJourOuvertes(
                (valeur) => !valeur
              )
            }
          >
            <span>
              {misesAJourOuvertes ? "▾" : "▸"}
            </span>

            <strong>
              Mises à jour ({misesAJour.length})
            </strong>
          </button>

          {misesAJourOuvertes && (
            <div className="administration-previsualisation-liste">
              {misesAJour.map((ligne, index) => {
                const identifiant =
                  creerIdentifiantLigne(
                    ligne,
                    "mise-a-jour",
                    index
                  );

                return (
                  <div
                    key={identifiant}
                    className="administration-previsualisation-ligne"
                  >
                    <label className="administration-previsualisation-selection">
                      <input
                        type="checkbox"
                        checked={ligneEstSelectionnee(
                          identifiant
                        )}
                        onChange={() =>
                          basculerSelection(
                            identifiant
                          )
                        }
                      />

                      <strong>
                        {ligne.joueuse?.nom ??
                          ligne.participante
                            ?.nomComplet}
                      </strong>
                    </label>

                    <div className="administration-previsualisation-differences">
                      {ligne.differences?.map(
                        (
                          difference,
                          diffIndex
                        ) => (
                          <div
                            key={`${difference.champ}-${diffIndex}`}
                            className="administration-previsualisation-difference"
                          >
                            <strong>
                              {LIBELLES_CHAMPS[
                                difference.champ
                              ] ??
                                difference.champ}
                            </strong>

                            <p>
                              Ancienne valeur :{" "}
                              {difference
                                .ancienneValeur ||
                                "—"}
                            </p>

                            <p>
                              Nouvelle valeur :{" "}
                              {difference
                                .nouvelleValeur ||
                                "—"}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}
      <ConfirmationModal
  ouverte={confirmationOuverte}
  titre="Confirmer l’importation"
  message="Les participantes sélectionnées seront ajoutées ou mises à jour dans l’application."
  resume={[
    `${totalSelectionnees} participante(s) sélectionnée(s)`,
    `${nouvelles.length} nouvelle(s) disponible(s)`,
    `${misesAJour.length} mise(s) à jour disponible(s)`,
  ]}
  texteConfirmer={`Importer (${totalSelectionnees})`}
  texteAnnuler="Annuler"
  confirmer={confirmerImportation}
  fermer={() => setConfirmationOuverte(false)}
/>
<ConfirmationModal
  ouverte={rapportImportation !== null}
  titre="Importation terminée"
  message="Les participantes sélectionnées ont été importées avec succès."
  resume={
    rapportImportation
      ? [
          `${rapportImportation.ajoutees} joueuse(s) ajoutée(s)`,
          `${rapportImportation.misesAJour} mise(s) à jour`,
          `${rapportImportation.ignorees} ignorée(s)`,
          `${rapportImportation.aVerifier} à vérifier`,
          `Total : ${rapportImportation.total}`,
        ]
      : []
  }
  texteConfirmer="Fermer"
  texteAnnuler=""
  confirmer={() => setRapportImportation(null)}
  fermer={() => setRapportImportation(null)}
/>
    </div>
  );
}

export default PrevisualisationImportation;