import { useState } from "react";

import { obtenirNomEquipe } from "../../../domain/equipes/obtenirNomEquipe";
import { obtenirAdmissibiliteCategorie } from "../../../domain/categories/obtenirAdmissibiliteCategorie";
import { obtenirCategorieEquipe } from "../../../domain/equipes/obtenirCategorieEquipe";
import { validerAffectationsEquipe } from "../../../domain/affectation/validerAffectationsEquipe";
import { CATEGORIES } from "../../../domain/categories/categories";
import { normaliserCategorie } from "../../../domain/categories/normaliserCategorie";
import { obtenirCategorieJoueuse } from "../../../domain/categories/obtenirCategorieJoueuse";
import { obtenirAutresEquipesJoueuse } from "../../../domain/affectation/obtenirAutresEquipesJoueuse";

import AccordeonCategorie from "./AccordeonCategorie";
import TableauCategorie from "./TableauCategorie";
import BarreOutilsAffectations from "./BarreOutilsAffectations";

function GestionAffectations({
  retour,
  associationActive,
  saisonActive,
  equipes,
  joueuses,
  gestionAffectations,
}) {
  const [
    equipeSelectionneeId,
    setEquipeSelectionneeId,
  ] = useState("");

  const [
    etatAffectations,
    setEtatAffectations,
  ] = useState({});

  const [
    recherche,
    setRecherche,
  ] = useState("");

  const {
    affectations,
    remplacerAffectationsEquipe,
  } = gestionAffectations;

  const equipesDisponibles =
    associationActive && saisonActive
      ? equipes.filter(
          (equipe) =>
            String(
              equipe.associationId
            ) ===
              String(
                associationActive.id
              ) &&
            String(
              equipe.saisonId
            ) ===
              String(
                saisonActive.id
              )
        )
      : [];

  const equipeSelectionnee =
    equipesDisponibles.find(
      (equipe) =>
        String(equipe.id) ===
        String(
          equipeSelectionneeId
        )
    );

  /*
   * La catégorie de la joueuse n'est plus
   * enregistrée dans sa fiche permanente.
   *
   * Elle est calculée ici à partir de sa
   * date de naissance et de l'année de
   * référence de la saison active.
   */
  const joueusesDisponibles =
    associationActive &&
    saisonActive &&
    equipeSelectionnee
      ? joueuses
          .filter(
            (joueuse) =>
              String(
                joueuse.associationId
              ) ===
              String(
                associationActive.id
              )
          )
          .map((joueuse) => ({
            ...joueuse,

            categorie:
              obtenirCategorieJoueuse(
                joueuse.dateNaissance,
                saisonActive.anneeReference
              ),
          }))
          .filter((joueuse) => {
            if (!joueuse.categorie) {
              return false;
            }

            const admissibilite =
              obtenirAdmissibiliteCategorie(
                obtenirCategorieEquipe(
                  equipeSelectionnee
                ),
                joueuse.categorie
              );

            return (
              admissibilite.type !== null
            );
          })
      : [];

  const joueusesFiltrees =
    joueusesDisponibles
      .filter((joueuse) =>
        joueuse.nomComplet
          .toLowerCase()
          .includes(
            recherche.toLowerCase()
          )
      )
      .sort((a, b) => {
        const ordreCategorie = {
          Moustique: 1,
          Novice: 2,
          Atome: 3,
          Benjamine: 4,
          Junior: 5,
          Cadette: 6,
          Inter: 7,
        };

        const ordreA =
          ordreCategorie[
            normaliserCategorie(
              a.categorie
            )
          ] ?? 999;

        const ordreB =
          ordreCategorie[
            normaliserCategorie(
              b.categorie
            )
          ] ?? 999;

        if (ordreA !== ordreB) {
          return ordreA - ordreB;
        }

        return a.nomComplet.localeCompare(
          b.nomComplet,
          "fr-CA"
        );
      });

  const nombreAffectees =
    Object.values(
      etatAffectations
    ).filter(
      (etat) =>
        etat.assignee ||
        etat.derogationHaut ||
        etat.derogationBas
    ).length;

  const nombrePE =
    Object.values(
      etatAffectations
    ).filter(
      (etat) =>
        etat.derogationHaut
    ).length;

  function obtenirAdmissibiliteJoueuse(
    joueuse
  ) {
    const categorieJoueuse =
      obtenirCategorieJoueuse(
        joueuse.dateNaissance,
        saisonActive?.anneeReference
      );

    return obtenirAdmissibiliteCategorie(
      obtenirCategorieEquipe(
        equipeSelectionnee
      ),
      categorieJoueuse
    );
  }

  function obtenirAutresEquipesPourJoueuse(
    joueuse
  ) {
    if (!equipeSelectionnee) {
      return [];
    }

    return obtenirAutresEquipesJoueuse(
      affectations,
      equipes,
      joueuse.id,
      equipeSelectionnee.id
    );
  }

  function affecterJoueuses(
    listeJoueuses
  ) {
    if (!equipeSelectionnee) {
      return;
    }

    setEtatAffectations(
      (etatActuel) => {
        const nouvelEtat = {
          ...etatActuel,
        };

        listeJoueuses.forEach(
          (joueuse) => {
            const admissibilite =
              obtenirAdmissibiliteJoueuse(
                joueuse
              );

            nouvelEtat[joueuse.id] = {
              assignee:
                admissibilite.type ===
                "normale",

              derogationHaut:
                admissibilite.type ===
                "D+",

              derogationBas:
                admissibilite.type ===
                "D-",
            };
          }
        );

        return nouvelEtat;
      }
    );
  }

  function affecterToutesLesJoueuses() {
    affecterJoueuses(
      joueusesDisponibles
    );
  }

  function affecterCategorie(
    categorie
  ) {
    const joueusesCategorie =
      joueusesDisponibles.filter(
        (joueuse) =>
          normaliserCategorie(
            joueuse.categorie
          ) === categorie
      );

    affecterJoueuses(
      joueusesCategorie
    );
  }

  function retirerCategorie(
    categorie
  ) {
    const idsJoueusesCategorie =
      joueusesDisponibles
        .filter(
          (joueuse) =>
            normaliserCategorie(
              joueuse.categorie
            ) === categorie
        )
        .map(
          (joueuse) =>
            joueuse.id
        );

    setEtatAffectations(
      (etatActuel) => {
        const nouvelEtat = {
          ...etatActuel,
        };

        idsJoueusesCategorie.forEach(
          (joueuseId) => {
            delete nouvelEtat[
              joueuseId
            ];
          }
        );

        return nouvelEtat;
      }
    );
  }

  function retirerToutesLesJoueuses() {
    setEtatAffectations({});
  }

  function changerEquipe(
    evenement
  ) {
    const equipeId =
      evenement.target.value;

    setEquipeSelectionneeId(
      equipeId
    );

    setRecherche("");

    if (!equipeId) {
      setEtatAffectations({});
      return;
    }

    const nouvelEtat = {};

    affectations
      .filter(
        (affectation) =>
          String(
            affectation.equipeId
          ) === String(equipeId)
      )
      .forEach(
        (affectation) => {
          nouvelEtat[
            affectation.joueuseId
          ] = {
            assignee:
              affectation.typeAffectation ===
              "NORMALE",

            derogationHaut:
              affectation.typeAffectation ===
              "PE",

            derogationBas:
              affectation.typeAffectation ===
              "RETROGRADATION",
          };
        }
      );

    setEtatAffectations(
      nouvelEtat
    );
  }

  async function enregistrerAffectations() {
    if (!equipeSelectionnee) {
      window.alert(
        "Sélectionnez une équipe avant d'enregistrer."
      );

      return;
    }

    const nouvellesAffectations =
      joueusesDisponibles
        .filter(
          (joueuse) => {
            const etat =
              etatAffectations[
                joueuse.id
              ];

            return Boolean(
              etat?.assignee ||
                etat?.derogationHaut ||
                etat?.derogationBas
            );
          }
        )
        .map((joueuse) => {
          const etat =
            etatAffectations[
              joueuse.id
            ];

          let typeAffectation =
            "NORMALE";

          if (
            etat.derogationHaut
          ) {
            typeAffectation =
              "PE";
          }

          if (
            etat.derogationBas
          ) {
            typeAffectation =
              "RETROGRADATION";
          }

          return {
            id:
              crypto.randomUUID(),

            saisonId:
              saisonActive?.id ??
              "",

            equipeId:
              equipeSelectionnee.id,

            joueuseId:
              joueuse.id,

            numero: "",

            typeAffectation,

            dateDebut: "",
            dateFin: "",

            active: true,

            notes: "",
          };
        });

    const validation =
      validerAffectationsEquipe(
        nouvellesAffectations
      );

    if (!validation.valide) {
      window.alert(
        validation.erreurs.join(
          "\n"
        )
      );

      return;
    }

    const resultat =
      await remplacerAffectationsEquipe(
        equipeSelectionnee.id,
        nouvellesAffectations
      );

    if (!resultat.succes) {
      window.alert(
        resultat.erreurs?.join(
          "\n"
        ) ||
          "Impossible d'enregistrer les affectations."
      );

      return;
    }

    window.alert(
      "Affectations enregistrées."
    );
  }

  return (
    <section className="gestion-affectations">
      <header className="gestion-affectations-entete">
        <div>
          <h1>Affectations</h1>

          <p>
            Assignez les joueuses à
            l’équipe sélectionnée.
          </p>
        </div>

        <div className="gestion-affectations-actions">
          <button
            type="button"
            onClick={retour}
          >
            Retour
          </button>

          <button
            type="button"
            onClick={
              enregistrerAffectations
            }
            disabled={
              !equipeSelectionnee
            }
          >
            Enregistrer
          </button>
        </div>
      </header>

      <div className="affectations-contenu">
        <div className="affectations-contexte">
          <p>
            <strong>
              Association :
            </strong>{" "}
            {associationActive?.nom ??
              "Aucune"}
          </p>

          <p>
            <strong>
              Saison :
            </strong>{" "}
            {saisonActive?.nom ??
              "Aucune"}
          </p>
        </div>

        {!associationActive ||
        !saisonActive ? (
          <p>
            Une association active et
            une saison active sont
            requises.
          </p>
        ) : (
          <div className="affectations-selection">
            <BarreOutilsAffectations
              equipeSelectionneeId={
                equipeSelectionneeId
              }

              equipesDisponibles={
                equipesDisponibles
              }

              changerEquipe={
                changerEquipe
              }

              obtenirNomEquipe={
                obtenirNomEquipe
              }

              nombreAffectees={
                nombreAffectees
              }

              nombrePE={
                nombrePE
              }

              recherche={
                recherche
              }

              setRecherche={
                setRecherche
              }

              affecterToutesLesJoueuses={
                affecterToutesLesJoueuses
              }

              retirerToutesLesJoueuses={
                retirerToutesLesJoueuses
              }
            />

            {equipeSelectionnee && (
              <div className="affectations-joueuses">
                <h3>
                  Joueuses disponibles
                </h3>

                {joueusesFiltrees.length ===
                0 ? (
                  <p>
                    Aucune joueuse ne
                    correspond à la
                    recherche.
                  </p>
                ) : (
                  CATEGORIES.map(
                    (categorie) => {
                      const joueusesCategorie =
                        joueusesFiltrees.filter(
                          (
                            joueuse
                          ) =>
                            normaliserCategorie(
                              joueuse.categorie
                            ) ===
                            categorie.nom
                        );

                      const nombreAffecteesCategorie =
                        joueusesCategorie.filter(
                          (
                            joueuse
                          ) => {
                            const etat =
                              etatAffectations[
                                joueuse
                                  .id
                              ];

                            return Boolean(
                              etat?.assignee ||
                                etat?.derogationHaut ||
                                etat?.derogationBas
                            );
                          }
                        ).length;

                      if (
                        joueusesCategorie.length ===
                        0
                      ) {
                        return null;
                      }

                      return (
                        <AccordeonCategorie
                          key={
                            categorie.id
                          }

                          titre={
                            categorie.nom
                          }

                          nombre={
                            joueusesCategorie.length
                          }

                          nombreAffectees={
                            nombreAffecteesCategorie
                          }

                          onToutAffecter={() =>
                            affecterCategorie(
                              categorie.nom
                            )
                          }

                          onToutRetirer={() =>
                            retirerCategorie(
                              categorie.nom
                            )
                          }

                          ouvertParDefaut={
                            recherche.trim() !==
                              "" ||
                            nombreAffecteesCategorie >
                              0
                          }

                          enfants={
                            <TableauCategorie
                              joueuses={
                                joueusesCategorie
                              }

                              etatAffectations={
                                etatAffectations
                              }

                              setEtatAffectations={
                                setEtatAffectations
                              }

                              obtenirAdmissibilite={
                                obtenirAdmissibiliteJoueuse
                              }

                              obtenirAutresEquipes={
                                obtenirAutresEquipesPourJoueuse
                              }
                            />
                          }
                        />
                      );
                    }
                  )
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default GestionAffectations;