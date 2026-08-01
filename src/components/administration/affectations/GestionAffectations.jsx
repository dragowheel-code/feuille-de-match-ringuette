import { useState } from "react";

import { obtenirNomEquipe } from "../../../domain/equipes/obtenirNomEquipe";
import { obtenirAdmissibiliteCategorie } from "../../../domain/categories/obtenirAdmissibiliteCategorie";
import { obtenirCategorieEquipe } from "../../../domain/equipes/obtenirCategorieEquipe";
import { validerAffectationsEquipe } from "../../../domain/affectation/validerAffectationsEquipe";
import AccordeonCategorie from "./AccordeonCategorie";
import { CATEGORIES } from "../../../domain/categories/categories";
import TableauCategorie from "./TableauCategorie";

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
          a.categorie
        ] ?? 999;

      const ordreB =
        ordreCategorie[
          b.categorie
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

  function affecterToutesLesJoueuses() {
    if (!equipeSelectionnee) {
      return;
    }

    const nouvelEtat = {};

    joueusesDisponibles.forEach((joueuse) => {
      const admissibilite =
        obtenirAdmissibiliteCategorie(
          obtenirCategorieEquipe(
            equipeSelectionnee
          ),
          joueuse.categorie
        );

      nouvelEtat[joueuse.id] = {
        assignee:
          admissibilite.type === "normale",

        derogationHaut:
          admissibilite.type === "D+",

        derogationBas:
          admissibilite.type === "D-",
      };
    });

    setEtatAffectations(nouvelEtat);
  }

  function retirerToutesLesJoueuses() {
    setEtatAffectations({});
  }

  function changerEquipe(evenement) {
    const equipeId =
      evenement.target.value;

    setEquipeSelectionneeId(equipeId);

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

function obtenirAdmissibiliteJoueuse(joueuse) {
  return obtenirAdmissibiliteCategorie(
    obtenirCategorieEquipe(
      equipeSelectionnee
    ),
    joueuse.categorie
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
            <label>
              Équipe

              <select
                value={
                  equipeSelectionneeId
                }
                onChange={changerEquipe}
              >
                <option value="">
                  Sélectionner une équipe
                </option>

                {equipesDisponibles.map(
                  (equipe) => (
                    <option
                      key={equipe.id}
                      value={equipe.id}
                    >
                      {obtenirNomEquipe(
                        equipe
                      )}
                    </option>
                  )
                )}
              </select>
            </label>

            {equipeSelectionnee && (
              <>
                <div className="resume-affectations">
                  <strong>
                    {nombreAffectees} / 19
                    joueuses
                  </strong>

                  {" • "}

                  <strong>
                    {nombrePE} PE
                  </strong>
                </div>

                <div className="affectations-actions-rapides">
                  <button
                    type="button"
                    onClick={
                      affecterToutesLesJoueuses
                    }
                  >
                    Tout affecter
                  </button>

                  <button
                    type="button"
                    onClick={
                      retirerToutesLesJoueuses
                    }
                  >
                    Tout retirer
                  </button>
                </div>

                <div className="affectations-joueuses">
                  <h3>
                    Joueuses disponibles
                  </h3>
<input
  type="text"
  placeholder="🔍 Rechercher une joueuse..."
  value={recherche}
  onChange={(evenement) =>
    setRecherche(
      evenement.target.value
    )
  }
  className="recherche-joueuse"
/>
                  {joueusesFiltrees.length === 0 ? (
  <p>
    Aucune joueuse ne correspond à la recherche.
  </p>
) : (
  CATEGORIES.map((categorie) => {
    const joueusesCategorie =
      joueusesFiltrees.filter(
        (joueuse) =>
          joueuse.categorie === categorie.nom
      );

    if (joueusesCategorie.length === 0) {
      return null;
    }

    return (
      <AccordeonCategorie
        key={categorie.id}
        titre={categorie.nom}
        nombre={joueusesCategorie.length}
        ouvertParDefaut={
          recherche.trim() !== ""
        }
        enfants={
  <TableauCategorie
    joueuses={joueusesCategorie}
    etatAffectations={etatAffectations}
    setEtatAffectations={
      setEtatAffectations
    }
    obtenirAdmissibilite={
      obtenirAdmissibiliteJoueuse
    }
  />
}
      />
    );
  })
)}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default GestionAffectations;