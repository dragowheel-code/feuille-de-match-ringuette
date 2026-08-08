import { useState } from "react";

import { obtenirNomEquipe } from "../../../domain/equipes/obtenirNomEquipe";
import { obtenirAdmissibiliteCategorie } from "../../../domain/categories/obtenirAdmissibiliteCategorie";
import { obtenirCategorieEquipe } from "../../../domain/equipes/obtenirCategorieEquipe";
import { validerAffectationsEquipe } from "../../../domain/affectation/validerAffectationsEquipe";
import { CATEGORIES } from "../../../domain/categories/categories";

import AccordeonCategorie from "./AccordeonCategorie";
import TableauCategorie from "./TableauCategorie";
import BarreOutilsAffectations from "./BarreOutilsAffectations";
import { normaliserCategorie } from "../../../domain/categories/normaliserCategorie";
import { obtenirAutresEquipesJoueuse } from "../../../domain/affectation/obtenirAutresEquipesJoueuse";

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

  const [recherche, setRecherche] = useState("");

  const {
    affectations,
    remplacerAffectationsEquipe,
  } = gestionAffectations;

  const equipesDisponibles =
    associationActive && saisonActive
      ? equipes.filter(
          (equipe) =>
            equipe.associationId ===
              associationActive.id &&
            equipe.saisonId ===
              saisonActive.id
        )
      : [];

  const equipeSelectionnee =
    equipesDisponibles.find(
      (equipe) =>
        String(equipe.id) ===
        String(equipeSelectionneeId)
    );

  const joueusesDisponibles =
    associationActive && equipeSelectionnee
      ? joueuses.filter((joueuse) => {
          if (
            joueuse.associationId !==
            associationActive.id
          ) {
            return false;
          }
          console.log(
  "Catégories présentes :",
  [...new Set(joueuses.map(
    (joueuse) => joueuse.categorie
  ))]
);

          const admissibilite =
            obtenirAdmissibiliteCategorie(
              obtenirCategorieEquipe(
                equipeSelectionnee
              ),
              joueuse.categorie
            );

          return admissibilite.type !== null;
        })
      : [];

  const joueusesFiltrees =
    joueusesDisponibles
      .filter((joueuse) =>
        joueuse.nomComplet
          .toLowerCase()
          .includes(recherche.toLowerCase())
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
    normaliserCategorie(a.categorie)
  ] ?? 999;

const ordreB =
  ordreCategorie[
    normaliserCategorie(b.categorie)
  ] ?? 999;

        if (ordreA !== ordreB) {
          return ordreA - ordreB;
        }

        return a.nomComplet.localeCompare(
          b.nomComplet,
          "fr-CA"
        );
      });

  const nombreAffectees = Object.values(
    etatAffectations
  ).filter(
    (etat) =>
      etat.assignee ||
      etat.derogationHaut ||
      etat.derogationBas
  ).length;

  const nombrePE = Object.values(
    etatAffectations
  ).filter(
    (etat) => etat.derogationHaut
  ).length;

  function obtenirAdmissibiliteJoueuse(joueuse) {
    return obtenirAdmissibiliteCategorie(
      obtenirCategorieEquipe(
        equipeSelectionnee
      ),
      joueuse.categorie
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

  function affecterJoueuses(listeJoueuses) {
  if (!equipeSelectionnee) {
    return;
  }

  setEtatAffectations((etatActuel) => {
    const nouvelEtat = {
      ...etatActuel,
    };

    listeJoueuses.forEach((joueuse) => {
      const admissibilite =
        obtenirAdmissibiliteJoueuse(joueuse);

      nouvelEtat[joueuse.id] = {
        assignee:
          admissibilite.type === "normale",

        derogationHaut:
          admissibilite.type === "D+",

        derogationBas:
          admissibilite.type === "D-",
      };
    });

    return nouvelEtat;
  });
}

function affecterToutesLesJoueuses() {
  affecterJoueuses(joueusesDisponibles);
}

function affecterCategorie(categorie) {
  const joueusesCategorie =
    joueusesDisponibles.filter(
      (joueuse) =>
        normaliserCategorie(
          joueuse.categorie
        ) === categorie
    );

  affecterJoueuses(joueusesCategorie);
}
function retirerCategorie(categorie) {
  const idsJoueusesCategorie =
    joueusesDisponibles
      .filter(
        (joueuse) =>
          normaliserCategorie(
            joueuse.categorie
          ) === categorie
      )
      .map((joueuse) => joueuse.id);

  setEtatAffectations((etatActuel) => {
    const nouvelEtat = {
      ...etatActuel,
    };

    idsJoueusesCategorie.forEach(
      (joueuseId) => {
        delete nouvelEtat[joueuseId];
      }
    );

    return nouvelEtat;
  });
}

  function retirerToutesLesJoueuses() {
    setEtatAffectations({});
  }

  function changerEquipe(evenement) {
    const equipeId = evenement.target.value;

    setEquipeSelectionneeId(equipeId);
    setRecherche("");

    if (!equipeId) {
      setEtatAffectations({});
      return;
    }

    const nouvelEtat = {};

    affectations
      .filter(
        (affectation) =>
          String(affectation.equipeId) ===
          String(equipeId)
      )
      .forEach((affectation) => {
        nouvelEtat[affectation.joueuseId] = {
          assignee:
            !affectation.derogationHaut &&
            !affectation.derogationBas,

          derogationHaut: Boolean(
            affectation.derogationHaut
          ),

          derogationBas: Boolean(
            affectation.derogationBas
          ),
        };
      });

    setEtatAffectations(nouvelEtat);
  }

  function enregistrerAffectations() {
    if (!equipeSelectionnee) {
      window.alert(
        "Sélectionnez une équipe avant d'enregistrer."
      );
      return;
    }

    const nouvellesAffectations =
      joueusesDisponibles
        .filter((joueuse) => {
          const etat =
            etatAffectations[joueuse.id];

          return Boolean(
            etat?.assignee ||
              etat?.derogationHaut ||
              etat?.derogationBas
          );
        })
        .map((joueuse) => {
          const etat =
            etatAffectations[joueuse.id];

          return {
            id: crypto.randomUUID(),

            saisonId:
              saisonActive?.id ?? "",

            equipeId:
              equipeSelectionnee.id,

            joueuseId: joueuse.id,

            derogationHaut: Boolean(
              etat.derogationHaut
            ),

            derogationBas: Boolean(
              etat.derogationBas
            ),

            active: true,
          };
        });

    const validation =
      validerAffectationsEquipe(
        nouvellesAffectations
      );

    if (!validation.valide) {
      window.alert(
        validation.erreurs.join("\n")
      );
      return;
    }

    remplacerAffectationsEquipe(
      equipeSelectionnee.id,
      nouvellesAffectations
    );

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
            Assignez les joueuses à l’équipe
            sélectionnée.
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
            onClick={enregistrerAffectations}
            disabled={!equipeSelectionnee}
          >
            Enregistrer
          </button>
        </div>
      </header>

      <div className="affectations-contenu">
        <div className="affectations-contexte">
          <p>
            <strong>Association :</strong>{" "}
            {associationActive?.nom ??
              "Aucune"}
          </p>

          <p>
            <strong>Saison :</strong>{" "}
            {saisonActive?.nom ??
              "Aucune"}
          </p>
        </div>

        {!associationActive ||
        !saisonActive ? (
          <p>
            Une association active et une
            saison active sont requises.
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
              changerEquipe={changerEquipe}
              obtenirNomEquipe={
                obtenirNomEquipe
              }
              nombreAffectees={
                nombreAffectees
              }
              nombrePE={nombrePE}
              recherche={recherche}
              setRecherche={setRecherche}
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
                    Aucune joueuse ne correspond
                    à la recherche.
                  </p>
                ) : (
                  CATEGORIES.map(
                    (categorie) => {
                      const joueusesCategorie =
  joueusesFiltrees.filter(
    (joueuse) =>
      normaliserCategorie(
        joueuse.categorie
      ) === categorie.nom
  );
                        const nombreAffecteesCategorie =
  joueusesCategorie.filter((joueuse) => {
    const etat =
      etatAffectations[joueuse.id];

    return Boolean(
      etat?.assignee ||
        etat?.derogationHaut ||
        etat?.derogationBas
    );
  }).length;

                      if (
                        joueusesCategorie.length ===
                        0
                      ) {
                        return null;
                      }

                      return (
                        <AccordeonCategorie
                          key={categorie.id}
                          titre={categorie.nom}
                          nombre={joueusesCategorie.length}
                          nombreAffectees={nombreAffecteesCategorie}
                          onToutAffecter={() =>
  affecterCategorie(categorie.nom)
}

onToutRetirer={() =>
  retirerCategorie(categorie.nom)
}
                          ouvertParDefaut={
  recherche.trim() !== "" ||
  nombreAffecteesCategorie > 0
}
                          enfants={
                            <TableauCategorie
                             joueuses={joueusesCategorie}
                             etatAffectations={etatAffectations}
                             setEtatAffectations={setEtatAffectations}
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