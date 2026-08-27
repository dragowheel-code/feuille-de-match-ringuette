import { useState } from "react";

import GrilleChandails from "./GrilleChandails";
import EnsembleChandailsModal from "./EnsembleChandailsModal";
import ResumeInventaireChandails from "./ResumeInventaireChandails";
import DistributionChandailModal from "./DistributionChandailModal";
import HistoriqueChandailModal from "./HistoriqueChandailModal";
import LiberationChandailModal from "./LiberationChandailModal";
import RetourChandailModal from "./RetourChandailModal";

import {
  obtenirJoueusesAssociation,
  obtenirOptionsDistributionChandails,
} from "../../../../domain/joueuses";

import {
  obtenirResumeAttribution,
  obtenirHistoriqueEnsemble,
} from "../../../../domain/equipements/attributionsChandails";

import {
  obtenirStatutEnsembleChandails,
} from "../../../../domain/equipements";

function GestionChandails({
  retour,
  associationActive,
  saisonActive,
  saisons = [],

  gestionChandails,
  gestionAttributionsChandails,
  gestionJoueuses,

  affectations = [],
}) {
  const {
    ensemblesChandails,
    ajouterEnsemble,
    modifierEnsemble,
    supprimerEnsemble,
  } = gestionChandails;

  const {
    attributionsChandails,
    distribuerEnsemble,
    libererEnsemble,
    retournerEnsemble,
  } = gestionAttributionsChandails;

  const [
    recherche,
    setRecherche,
  ] = useState("");

  const [
    filtreActif,
    setFiltreActif,
  ] = useState("tous");

  const [
    modeRetourChandails,
    setModeRetourChandails,
  ] = useState(false);

  const [
    fenetreEnsembleOuverte,
    setFenetreEnsembleOuverte,
  ] = useState(false);

  const [
    fenetreDistributionOuverte,
    setFenetreDistributionOuverte,
  ] = useState(false);

  const [
    fenetreHistoriqueOuverte,
    setFenetreHistoriqueOuverte,
  ] = useState(false);

  const [
    fenetreLiberationOuverte,
    setFenetreLiberationOuverte,
  ] = useState(false);

  const [
    fenetreRetourOuverte,
    setFenetreRetourOuverte,
  ] = useState(false);

  const [
    erreursRetour,
    setErreursRetour,
  ] = useState([]);

  const [
    formulaireRetour,
    setFormulaireRetour,
  ] = useState({
    clair: {
      etat: "Bon",
      notes: "",
    },

    fonce: {
      etat: "Bon",
      notes: "",
    },

    commentaire: "",
  });

  const [
    erreursEnsemble,
    setErreursEnsemble,
  ] = useState([]);

  const [
    erreursDistribution,
    setErreursDistribution,
  ] = useState([]);

  const [
    ensembleSelectionne,
    setEnsembleSelectionne,
  ] = useState(null);

  const [
    ensembleAffiche,
    setEnsembleAffiche,
  ] = useState(null);

  const formulaireEnsembleInitial = {
    associationId:
      associationActive?.id || "",

    numero: "",
    taille: "",

    clair: {
      etat: "Bon",
      notes: "",
    },

    fonce: {
      etat: "Bon",
      notes: "",
    },

    actif: true,
  };

  const [
    formulaireEnsemble,
    setFormulaireEnsemble,
  ] = useState(
    formulaireEnsembleInitial
  );

  const [
    formulaireDistribution,
    setFormulaireDistribution,
  ] = useState({
    ensembleId: "",
    saisonId: "",
    joueuseId: "",
    commentaire: "",
  });

  const ensemblesAssociation =
    associationActive
      ? ensemblesChandails.filter(
          (ensemble) =>
            String(
              ensemble.associationId
            ) ===
            String(
              associationActive.id
            )
        )
      : [];

  /*
   * En mode retour, on se base directement
   * sur la saison enregistrée dans
   * l'attribution de chandail.
   *
   * Une joueuse peut avoir reçu ses
   * chandails avant d'être affectée à
   * une équipe.
   */
  const idsEnsemblesARetourner =
    new Set(
      attributionsChandails
        .filter(
          (attribution) =>
            attribution.active ===
              true &&
            String(
              attribution.saisonId
            ) ===
              String(
                saisonActive?.id
              )
        )
        .map(
          (attribution) =>
            String(
              attribution.ensembleId
            )
        )
    );

  const ensemblesARetourner =
    ensemblesAssociation.filter(
      (ensemble) =>
        idsEnsemblesARetourner.has(
          String(ensemble.id)
        )
    );

  const texteRecherche =
    recherche.trim().toLowerCase();

  const ensemblesSource =
    modeRetourChandails
      ? ensemblesARetourner
      : ensemblesAssociation;

  const ensemblesRecherche =
  ensemblesSource.filter(
    (ensemble) => {
      if (!texteRecherche) {
        return true;
      }

      const correspondNumero =
        String(
          ensemble.numero
        )
          .toLowerCase()
          .includes(
            texteRecherche
          );

      const correspondTaille =
        String(
          ensemble.taille
        )
          .toLowerCase()
          .includes(
            texteRecherche
          );

      const correspondHistorique =
        attributionsChandails.some(
          (attribution) => {
            if (
              String(
                attribution.ensembleId
              ) !==
              String(
                ensemble.id
              )
            ) {
              return false;
            }

            /*
             * Nouveau modèle :
             * l'attribution possède
             * directement joueuseId.
             */
            let joueuseId =
              attribution.joueuseId;

            /*
             * Compatibilité avec les
             * anciennes attributions
             * qui pouvaient seulement
             * avoir affectationId.
             */
            if (
              !joueuseId &&
              attribution.affectationId
            ) {
              const affectation =
                affectations.find(
                  (element) =>
                    String(
                      element.id
                    ) ===
                    String(
                      attribution.affectationId
                    )
                );

              joueuseId =
                affectation?.joueuseId;
            }

            if (!joueuseId) {
              return false;
            }

            const joueuse =
              gestionJoueuses
                ?.joueuses
                ?.find(
                  (element) =>
                    String(
                      element.id
                    ) ===
                    String(
                      joueuseId
                    )
                );

            if (!joueuse) {
              return false;
            }

            const nom =
              String(
                joueuse.nomComplet ??
                joueuse.nom ??
                ""
              ).toLowerCase();

            return nom.includes(
              texteRecherche
            );
          }
        );

      return (
        correspondNumero ||
        correspondTaille ||
        correspondHistorique
      );
    }
  );

  function obtenirStatutInventaire(
    ensemble
  ) {
    const attributionActive =
      attributionsChandails.some(
        (attribution) =>
          String(
            attribution.ensembleId
          ) ===
            String(
              ensemble.id
            ) &&
          attribution.active === true
      );

    if (attributionActive) {
      return "attribue";
    }

    return obtenirStatutEnsembleChandails(
      ensemble
    );
  }

  const ensemblesFiltres =
    ensemblesRecherche.filter(
      (ensemble) => {
        if (
          filtreActif === "tous"
        ) {
          return true;
        }

        return (
          obtenirStatutInventaire(
            ensemble
          ) === filtreActif
        );
      }
    );

  const ensemblesParTaille =
    ensemblesFiltres.reduce(
      (
        groupes,
        ensemble
      ) => {
        const taille =
          ensemble.taille ||
          "Sans taille";

        if (!groupes[taille]) {
          groupes[taille] = [];
        }

        groupes[taille].push(
          ensemble
        );

        return groupes;
      },
      {}
    );

  Object.values(
    ensemblesParTaille
  ).forEach((ensembles) => {
    ensembles.sort(
      (a, b) =>
        String(
          a.numero
        ).localeCompare(
          String(
            b.numero
          ),
          "fr-CA",
          {
            numeric: true,
          }
        )
    );
  });

  const joueusesAssociation =
    obtenirJoueusesAssociation(
      gestionJoueuses?.joueuses ??
        [],
      associationActive?.id
    );

  /*
   * Toutes les joueuses de
   * l'association peuvent recevoir
   * des chandails, même si elles
   * n'ont pas encore d'équipe.
   */
  const optionsJoueuses =
    obtenirOptionsDistributionChandails(
      joueusesAssociation
    );

  function obtenirJoueuseAttribution(
    attribution
  ) {
    if (!attribution) {
      return null;
    }

    return (
      gestionJoueuses?.joueuses?.find(
        (joueuse) =>
          String(joueuse.id) ===
          String(
            attribution.joueuseId
          )
      ) ?? null
    );
  }

  const attributionActiveEnsemble =
    ensembleAffiche
      ? attributionsChandails.find(
          (attribution) =>
            String(
              attribution.ensembleId
            ) ===
              String(
                ensembleAffiche.id
              ) &&
            attribution.active ===
              true
        ) ?? null
      : null;

  /*
   * On conserve la fonction domaine
   * existante pour compatibilité.
   */
  const resumeAttributionDomaine =
    ensembleAffiche
      ? obtenirResumeAttribution({
          ensemble:
            ensembleAffiche,

          attributions:
            attributionsChandails,

          joueuses:
            gestionJoueuses
              ?.joueuses ??
            [],
        })
      : {
          attribue: false,
          attribution: null,
          joueuse: null,
        };

  /*
   * Le nouveau modèle utilise
   * directement joueuseId.
   * On donne priorité à cette relation.
   */
  const resumeAttribution =
    attributionActiveEnsemble
      ? {
          attribue: true,

          attribution:
            attributionActiveEnsemble,

          joueuse:
            obtenirJoueuseAttribution(
              attributionActiveEnsemble
            ) ??
            resumeAttributionDomaine
              .joueuse,
        }
      : resumeAttributionDomaine;

  const historiqueEnsemble =
    ensembleAffiche
      ? obtenirHistoriqueEnsemble(
          ensembleAffiche.id,
          attributionsChandails,
          3
        )
      : [];

  function ouvrirAjoutEnsemble() {
    setErreursEnsemble([]);

    setEnsembleSelectionne(
      null
    );

    setFormulaireEnsemble({
      ...formulaireEnsembleInitial,

      associationId:
        associationActive?.id ||
        "",
    });

    setFenetreEnsembleOuverte(
      true
    );
  }

  function ouvrirModificationEnsemble(
    ensemble
  ) {
    setErreursEnsemble([]);

    setEnsembleSelectionne(
      ensemble
    );

    setFormulaireEnsemble({
      associationId:
        ensemble.associationId ??
        "",

      numero:
        ensemble.numero ?? "",

      taille:
        ensemble.taille ?? "",

      clair: {
        etat:
          ensemble.clair?.etat ??
          "Bon",

        notes:
          ensemble.clair?.notes ??
          "",
      },

      fonce: {
        etat:
          ensemble.fonce?.etat ??
          "Bon",

        notes:
          ensemble.fonce?.notes ??
          "",
      },

      actif:
        ensemble.actif ??
        true,
    });

    setFenetreEnsembleOuverte(
      true
    );
  }

  function fermerEnsemble() {
    setErreursEnsemble([]);

    setEnsembleSelectionne(
      null
    );

    setFenetreEnsembleOuverte(
      false
    );
  }

  async function enregistrerEnsemble(
    donneesEnsemble
  ) {
    const resultat =
      ensembleSelectionne
        ? await modifierEnsemble({
            ...donneesEnsemble,

            id:
              ensembleSelectionne.id,
          })
        : await ajouterEnsemble(
            donneesEnsemble
          );

    if (!resultat.succes) {
      setErreursEnsemble(
        resultat.erreurs ?? []
      );

      return;
    }

    fermerEnsemble();
  }

  async function demanderSuppression(
    ensemble
  ) {
    const confirmation =
      window.confirm(
        `Supprimer l'ensemble numéro ${ensemble.numero}, taille ${ensemble.taille} ?`
      );

    if (!confirmation) {
      return;
    }

    const resultat =
      await supprimerEnsemble(
        ensemble.id
      );

    if (!resultat.succes) {
      window.alert(
        resultat.erreurs?.join(
          "\n"
        ) ||
          "Impossible de supprimer l'ensemble."
      );

      return;
    }

    setEnsembleAffiche(null);
  }

  function ouvrirDistribution(
    ensemble
  ) {
    setErreursDistribution([]);

    setEnsembleAffiche(
      ensemble
    );

    setFormulaireDistribution({
      ensembleId:
        ensemble.id,

      saisonId:
        saisonActive?.id ||
        "",

      joueuseId: "",

      commentaire: "",
    });

    setFenetreDistributionOuverte(
      true
    );
  }

  function fermerDistribution() {
    setErreursDistribution([]);

    setFenetreDistributionOuverte(
      false
    );
  }

  async function enregistrerDistribution(
    formulaire
  ) {
    /*
     * L'affectation d'équipe est
     * facultative.
     *
     * Si elle existe déjà pour cette
     * joueuse et cette saison, on la
     * rattache automatiquement.
     */
    const affectation =
      affectations.find(
        (element) =>
          element.active !== false &&
          String(
            element.joueuseId
          ) ===
            String(
              formulaire.joueuseId
            ) &&
          String(
            element.saisonId
          ) ===
            String(
              formulaire.saisonId
            )
      );

    const resultat =
      await distribuerEnsemble({
        ...formulaire,

        affectationId:
          affectation?.id ??
          null,
      });

    if (!resultat.succes) {
      setErreursDistribution(
        resultat.erreurs ?? []
      );

      return;
    }

    fermerDistribution();
  }

  function ouvrirHistorique() {
    if (!ensembleAffiche) {
      return;
    }

    setFenetreHistoriqueOuverte(
      true
    );
  }

  function fermerHistorique() {
    setFenetreHistoriqueOuverte(
      false
    );
  }

  function ouvrirLiberation() {
    setFenetreLiberationOuverte(
      true
    );
  }

  function fermerLiberation() {
    setFenetreLiberationOuverte(
      false
    );
  }

  async function confirmerLiberation(
    donnees
  ) {
    const attribution =
      resumeAttribution.attribution;

    if (!attribution) {
      return;
    }

    const resultat =
      await libererEnsemble(
        attribution.id,
        donnees
      );

    if (!resultat.succes) {
      window.alert(
        resultat.erreurs?.join(
          "\n"
        ) ||
          "Impossible de libérer l'ensemble."
      );

      return;
    }

    fermerLiberation();
  }

  function ouvrirRetour() {
    if (
      !ensembleAffiche ||
      !resumeAttribution.attribution
    ) {
      return;
    }

    setErreursRetour([]);

    setFormulaireRetour({
      clair: {
        etat:
          ensembleAffiche
            .clair?.etat ??
          "Bon",

        notes:
          ensembleAffiche
            .clair?.notes ??
          "",
      },

      fonce: {
        etat:
          ensembleAffiche
            .fonce?.etat ??
          "Bon",

        notes:
          ensembleAffiche
            .fonce?.notes ??
          "",
      },

      commentaire: "",
    });

    setFenetreRetourOuverte(
      true
    );
  }

  function fermerRetour() {
    setErreursRetour([]);

    setFenetreRetourOuverte(
      false
    );
  }

  async function confirmerRetour(
    donneesRetour
  ) {
    const attribution =
      resumeAttribution.attribution;

    if (!attribution) {
      return;
    }

    const resultatEnsemble =
      await modifierEnsemble({
        ...ensembleAffiche,

        clair: {
          ...ensembleAffiche.clair,

          etat:
            donneesRetour
              .clair.etat,

          notes:
            donneesRetour
              .clair.notes,
        },

        fonce: {
          ...ensembleAffiche.fonce,

          etat:
            donneesRetour
              .fonce.etat,

          notes:
            donneesRetour
              .fonce.notes,
        },
      });

    if (
      !resultatEnsemble.succes
    ) {
      setErreursRetour(
        resultatEnsemble.erreurs ??
          []
      );

      return;
    }

    const resultatAttribution =
      await retournerEnsemble(
        attribution.id,
        {
          commentaire:
            donneesRetour
              .commentaire,
        }
      );

    if (
      !resultatAttribution.succes
    ) {
      setErreursRetour(
        resultatAttribution.erreurs ??
          []
      );

      return;
    }

    setEnsembleAffiche(null);

    fermerRetour();
  }

  return (
    <section className="gestion-chandails">
      <header className="gestion-chandails-entete">
        <div>
          <h1>
            {modeRetourChandails
              ? "Retour des chandails"
              : "Équipements — Chandails"}
          </h1>

          <p>
            {modeRetourChandails
              ? `Saison ${
                  saisonActive?.nom ??
                  ""
                } — ${
                  ensemblesARetourner.length
                } ensemble${
                  ensemblesARetourner.length >
                  1
                    ? "s"
                    : ""
                } à retourner.`
              : "Gérez l'inventaire des ensembles de chandails de l'association active."}
          </p>
        </div>

        <div className="gestion-chandails-actions">
          <button
            type="button"
            onClick={retour}
          >
            Retour page équipement
          </button>

          {!modeRetourChandails && (
            <button
              type="button"
              onClick={
                ouvrirAjoutEnsemble
              }
              disabled={
                !associationActive
              }
            >
              Nouvel ensemble
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            setModeRetourChandails(
              (precedent) =>
                !precedent
            );

            setFiltreActif(
              "tous"
            );

            setRecherche("");

            setEnsembleAffiche(
              null
            );
          }}
          disabled={!saisonActive}
        >
          {modeRetourChandails
            ? "Retour à l'inventaire"
            : "Retour chandails"}
        </button>
      </header>

      {!associationActive ? (
        <p>
          Une association active est
          requise.
        </p>
      ) : (
        <>
          <p>
            <strong>
              Association :
            </strong>{" "}
            {associationActive.nom}
          </p>

          <ResumeInventaireChandails
            ensemblesChandails={
              ensemblesAssociation
            }
            attributionsChandails={
              attributionsChandails
            }
            filtreActif={
              filtreActif
            }
            changerFiltre={
              setFiltreActif
            }
          />

          <div className="recherche-chandails">
            <input
              type="search"
              placeholder="Rechercher un numéro ou une taille..."
              value={recherche}
              onChange={(event) =>
                setRecherche(
                  event.target.value
                )
              }
            />
          </div>

          <div className="inventaire-chandails">
            <GrilleChandails
              ensemblesParTaille={
                ensemblesParTaille
              }
              ensembleSelectionne={
                ensembleAffiche
              }
              selectionnerEnsemble={
                setEnsembleAffiche
              }
              attributionsChandails={
                attributionsChandails
              }
            />

            <aside className="fiche-chandail">
              {ensembleAffiche ? (
                <>
                  <h2>
                    Ensemble #
                    {
                      ensembleAffiche.numero
                    }
                  </h2>

                  <p>
                    <strong>
                      Taille :
                    </strong>{" "}
                    {
                      ensembleAffiche.taille
                    }
                  </p>

                  <p>
                    <strong>
                      Statut :
                    </strong>{" "}
                    {resumeAttribution.attribue
                      ? "Attribué"
                      : "Disponible"}
                  </p>

                  {resumeAttribution.attribue && (
                    <>
                      <p>
                        <strong>
                          Joueuse :
                        </strong>{" "}
                        {
                          resumeAttribution
                            .joueuse
                            ?.nomComplet ??
                          "Joueuse introuvable"
                        }
                      </p>

                      <p>
                        <strong>
                          Depuis :
                        </strong>{" "}
                        {
                          resumeAttribution
                            .attribution
                            ?.dateAttribution ??
                          ""
                        }
                      </p>

                      {resumeAttribution
                        .attribution
                        ?.commentaire && (
                        <p>
                          <strong>
                            Commentaire :
                          </strong>{" "}
                          {
                            resumeAttribution
                              .attribution
                              .commentaire
                          }
                        </p>
                      )}
                    </>
                  )}

                  <p>
                    <strong>
                      Chandail clair :
                    </strong>{" "}
                    {
                      ensembleAffiche
                        .clair?.etat
                    }
                  </p>

                  <p>
                    <strong>
                      Chandail foncé :
                    </strong>{" "}
                    {
                      ensembleAffiche
                        .fonce?.etat
                    }
                  </p>

                  {modeRetourChandails ? (
                    <>
                      {resumeAttribution.attribue && (
                        <>
                          <button
                            type="button"
                            onClick={
                              ouvrirRetour
                            }
                          >
                            Retourner
                          </button>

                          <button
                            type="button"
                            onClick={
                              ouvrirHistorique
                            }
                          >
                            Historique
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {resumeAttribution.attribue ? (
                        <>
                          <button
                            type="button"
                            onClick={
                              ouvrirLiberation
                            }
                          >
                            Libérer
                          </button>

                          <button
                            type="button"
                            onClick={
                              ouvrirHistorique
                            }
                          >
                            Historique
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              ouvrirDistribution(
                                ensembleAffiche
                              )
                            }
                          >
                            Distribuer
                          </button>

                          {historiqueEnsemble.length >
                            0 && (
                            <button
                              type="button"
                              onClick={
                                ouvrirHistorique
                              }
                            >
                              Historique
                            </button>
                          )}
                        </>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          ouvrirModificationEnsemble(
                            ensembleAffiche
                          )
                        }
                      >
                        Modifier
                      </button>

                      {!resumeAttribution.attribue && (
                        <button
                          type="button"
                          onClick={() =>
                            demanderSuppression(
                              ensembleAffiche
                            )
                          }
                        >
                          Supprimer
                        </button>
                      )}
                    </>
                  )}
                </>
              ) : (
                <>
                  <h2>
                    Inventaire des
                    chandails
                  </h2>

                  <p>
                    Sélectionnez un
                    ensemble pour
                    afficher ses
                    renseignements.
                  </p>
                </>
              )}
            </aside>
          </div>

          <EnsembleChandailsModal
            ouverte={
              fenetreEnsembleOuverte
            }
            fermer={
              fermerEnsemble
            }
            enregistrer={
              enregistrerEnsemble
            }
            formulaire={
              formulaireEnsemble
            }
            setFormulaire={
              setFormulaireEnsemble
            }
            ensemble={
              ensembleSelectionne
            }
            erreurs={
              erreursEnsemble
            }
          />

          <DistributionChandailModal
            ouverte={
              fenetreDistributionOuverte
            }
            fermer={
              fermerDistribution
            }
            enregistrer={
              enregistrerDistribution
            }
            ensemble={
              ensembleAffiche
            }
            saisons={
              saisonActive
                ? [
                    saisonActive,
                  ]
                : []
            }
            joueuses={
              optionsJoueuses
            }
            formulaire={
              formulaireDistribution
            }
            setFormulaire={
              setFormulaireDistribution
            }
            erreurs={
              erreursDistribution
            }
          />

          <RetourChandailModal
            ouverte={
              fenetreRetourOuverte
            }
            fermer={
              fermerRetour
            }
            confirmer={
              confirmerRetour
            }
            ensemble={
              ensembleAffiche
            }
            joueuse={
              resumeAttribution.joueuse
            }
            formulaire={
              formulaireRetour
            }
            setFormulaire={
              setFormulaireRetour
            }
            erreurs={
              erreursRetour
            }
          />

          <LiberationChandailModal
            ouverte={
              fenetreLiberationOuverte
            }
            fermer={
              fermerLiberation
            }
            confirmer={
              confirmerLiberation
            }
            ensemble={
              ensembleAffiche
            }
            joueuse={
              resumeAttribution.joueuse
            }
          />

          <HistoriqueChandailModal
            ouverte={
              fenetreHistoriqueOuverte
            }
            fermer={
              fermerHistorique
            }
            ensemble={
              ensembleAffiche
            }
            historique={
              historiqueEnsemble
            }
            joueuses={
              gestionJoueuses
                ?.joueuses ??
              []
            }
            saisons={
              saisons
            }
          />
        </>
      )}
    </section>
  );
}

export default GestionChandails;