import { useMemo, useState } from "react";

const ROLES = {
  ENTRAINEUR_CHEF: "entraineur-chef",
  ENTRAINEUR_ADJOINT: "entraineur-adjoint",
  GERANTE: "gerante",
};

function GestionAffectationsPersonnel({
  retour,
  associationActive,
  saisonActive,
  equipes,
  personnel,
  gestionAffectationsPersonnel,
}) {
  const {
    affectationsPersonnel,
    ajouterAffectation,
    supprimerAffectation,
  } = gestionAffectationsPersonnel;

  const [equipeId, setEquipeId] = useState("");

  const [
    entraineurChefId,
    setEntraineurChefId,
  ] = useState("");

  const [
    entraineurAdjoint1Id,
    setEntraineurAdjoint1Id,
  ] = useState("");

  const [
    entraineurAdjoint2Id,
    setEntraineurAdjoint2Id,
  ] = useState("");

  const [geranteId, setGeranteId] =
    useState("");

  const [message, setMessage] =
    useState("");

  const equipesDisponibles = useMemo(() => {
    if (!associationActive || !saisonActive) {
      return [];
    }

    return equipes
      .filter(
        (equipe) =>
          equipe.associationId ===
            associationActive.id &&
          equipe.saisonId === saisonActive.id
      )
      .sort((a, b) => {
        const nomA = [
  a.categorie,
  a.niveau,
  a.numeroEquipe,
]
  .filter(Boolean)
  .join(" ");

const nomB = [
  b.categorie,
  b.niveau,
  b.numeroEquipe,
]
  .filter(Boolean)
  .join(" ");

        return nomA.localeCompare(
          nomB,
          "fr"
        );
      });
  }, [
    equipes,
    associationActive,
    saisonActive,
  ]);

  const personnelDisponible = useMemo(() => {
    if (!associationActive) {
      return [];
    }

    return personnel
      .filter(
        (membre) =>
          membre.associationId ===
            associationActive.id &&
          membre.actif !== false
      )
      .sort((a, b) => {
        const nomA =
          a.nomComplet ||
          `${a.prenom ?? ""} ${
            a.nom ?? ""
          }`.trim();

        const nomB =
          b.nomComplet ||
          `${b.prenom ?? ""} ${
            b.nom ?? ""
          }`.trim();

        return nomA.localeCompare(
          nomB,
          "fr"
        );
      });
  }, [
    personnel,
    associationActive,
  ]);

  function obtenirNomMembre(membre) {
    if (membre.nomComplet) {
      return membre.nomComplet;
    }

    return `${membre.prenom ?? ""} ${
      membre.nom ?? ""
    }`.trim();
  }

  function obtenirNomEquipe(equipe) {
  return [
    equipe.categorie,
    equipe.niveau,
    equipe.numeroEquipe,
  ]
    .filter(Boolean)
    .join(" ");
}

  function changerEquipe(
    nouvelleEquipeId
  ) {
    setEquipeId(nouvelleEquipeId);
    setMessage("");

    if (!nouvelleEquipeId) {
      setEntraineurChefId("");
      setEntraineurAdjoint1Id("");
      setEntraineurAdjoint2Id("");
      setGeranteId("");
      return;
    }

    const affectations =
      affectationsPersonnel.filter(
        (affectation) =>
          affectation.equipeId ===
            nouvelleEquipeId &&
          affectation.saisonId ===
            saisonActive?.id
      );

    const chef =
      affectations.find(
        (affectation) =>
          affectation.role ===
          ROLES.ENTRAINEUR_CHEF
      );

    const adjoints =
      affectations.filter(
        (affectation) =>
          affectation.role ===
          ROLES.ENTRAINEUR_ADJOINT
      );

    const gerante =
      affectations.find(
        (affectation) =>
          affectation.role ===
          ROLES.GERANTE
      );

    setEntraineurChefId(
      chef?.personnelId ?? ""
    );

    setEntraineurAdjoint1Id(
      adjoints[0]?.personnelId ?? ""
    );

    setEntraineurAdjoint2Id(
      adjoints[1]?.personnelId ?? ""
    );

    setGeranteId(
      gerante?.personnelId ?? ""
    );
  }

  function personneDejaSelectionnee(
    personnelId,
    champActuel
  ) {
    if (!personnelId) {
      return false;
    }

    const selections = {
      chef: entraineurChefId,
      adjoint1:
        entraineurAdjoint1Id,
      adjoint2:
        entraineurAdjoint2Id,
      gerante: geranteId,
    };

    return Object.entries(
      selections
    ).some(
      ([champ, valeur]) =>
        champ !== champActuel &&
        valeur === personnelId
    );
  }

  function enregistrer() {
    setMessage("");

    if (
      !associationActive ||
      !saisonActive ||
      !equipeId
    ) {
      setMessage(
        "Veuillez sélectionner une équipe."
      );
      return;
    }

    const nouvellesAffectations = [
      {
        personnelId:
          entraineurChefId,
        role:
          ROLES.ENTRAINEUR_CHEF,
      },
      {
        personnelId:
          entraineurAdjoint1Id,
        role:
          ROLES.ENTRAINEUR_ADJOINT,
      },
      {
        personnelId:
          entraineurAdjoint2Id,
        role:
          ROLES.ENTRAINEUR_ADJOINT,
      },
      {
        personnelId: geranteId,
        role: ROLES.GERANTE,
      },
    ].filter(
      (affectation) =>
        affectation.personnelId
    );

    const idsSelectionnes =
      nouvellesAffectations.map(
        (affectation) =>
          affectation.personnelId
      );

    const idsUniques =
      new Set(idsSelectionnes);

    if (
      idsUniques.size !==
      idsSelectionnes.length
    ) {
      setMessage(
        "Une même personne ne peut pas être sélectionnée deux fois dans cette équipe."
      );
      return;
    }

    const affectationsActuelles =
      affectationsPersonnel.filter(
        (affectation) =>
          affectation.equipeId ===
            equipeId &&
          affectation.saisonId ===
            saisonActive.id
      );

    for (const affectation of affectationsActuelles) {
      const resultatSuppression =
        supprimerAffectation(
          affectation.id
        );

      if (
        resultatSuppression?.succes ===
        false
      ) {
        setMessage(
          resultatSuppression.erreurs?.join(
            " "
          ) ||
            "Impossible de modifier les affectations existantes."
        );

        return;
      }
    }

    for (const affectation of nouvellesAffectations) {
      const resultat =
        ajouterAffectation({
          associationId:
            associationActive.id,
          saisonId:
            saisonActive.id,
          equipeId,
          personnelId:
            affectation.personnelId,
          role:
            affectation.role,
        });

      if (!resultat.succes) {
        setMessage(
          resultat.erreurs?.join(
            " "
          ) ||
            "Impossible d'enregistrer les affectations."
        );

        return;
      }
    }

    setMessage(
      "Les affectations ont été enregistrées."
    );
  }

  if (!associationActive) {
    return (
      <section className="administration-contenu">
        <div className="administration-section-entete">
          <button
            type="button"
            onClick={retour}
          >
            Retour
          </button>

          <h2>
            Affectations du personnel
          </h2>

          <p>
            Aucune association active.
          </p>
        </div>
      </section>
    );
  }

  if (!saisonActive) {
    return (
      <section className="administration-contenu">
        <div className="administration-section-entete">
          <button
            type="button"
            onClick={retour}
          >
            Retour
          </button>

          <h2>
            Affectations du personnel
          </h2>

          <p>
            Aucune saison active.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="administration-contenu">
      <div className="administration-section-entete">
        <button
          type="button"
          onClick={retour}
        >
          Retour
        </button>

        <h2>
          Affectations du personnel
        </h2>

        <p>
          Affecter le personnel aux
          équipes pour la saison active.
        </p>
      </div>

      <div className="administration-formulaire">
        <label>
          Équipe

          <select
            value={equipeId}
            onChange={(event) =>
              changerEquipe(
                event.target.value
              )
            }
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

        {equipesDisponibles.length ===
          0 && (
          <p>
            Aucune équipe n'est
            disponible pour la saison
            active.
          </p>
        )}

        {equipeId && (
          <>
            <label>
              Entraîneur-chef

              <select
                value={
                  entraineurChefId
                }
                onChange={(event) =>
                  setEntraineurChefId(
                    event.target.value
                  )
                }
              >
                <option value="">
                  Aucun
                </option>

                {personnelDisponible.map(
                  (membre) => (
                    <option
                      key={membre.id}
                      value={
                        membre.id
                      }
                      disabled={personneDejaSelectionnee(
                        membre.id,
                        "chef"
                      )}
                    >
                      {obtenirNomMembre(
                        membre
                      )}
                    </option>
                  )
                )}
              </select>
            </label>

            <label>
              Entraîneur adjoint 1

              <select
                value={
                  entraineurAdjoint1Id
                }
                onChange={(event) =>
                  setEntraineurAdjoint1Id(
                    event.target.value
                  )
                }
              >
                <option value="">
                  Aucun
                </option>

                {personnelDisponible.map(
                  (membre) => (
                    <option
                      key={membre.id}
                      value={
                        membre.id
                      }
                      disabled={personneDejaSelectionnee(
                        membre.id,
                        "adjoint1"
                      )}
                    >
                      {obtenirNomMembre(
                        membre
                      )}
                    </option>
                  )
                )}
              </select>
            </label>

            <label>
              Entraîneur adjoint 2

              <select
                value={
                  entraineurAdjoint2Id
                }
                onChange={(event) =>
                  setEntraineurAdjoint2Id(
                    event.target.value
                  )
                }
              >
                <option value="">
                  Aucun
                </option>

                {personnelDisponible.map(
                  (membre) => (
                    <option
                      key={membre.id}
                      value={
                        membre.id
                      }
                      disabled={personneDejaSelectionnee(
                        membre.id,
                        "adjoint2"
                      )}
                    >
                      {obtenirNomMembre(
                        membre
                      )}
                    </option>
                  )
                )}
              </select>
            </label>

            <label>
              Gérante

              <select
                value={geranteId}
                onChange={(event) =>
                  setGeranteId(
                    event.target.value
                  )
                }
              >
                <option value="">
                  Aucune
                </option>

                {personnelDisponible.map(
                  (membre) => (
                    <option
                      key={membre.id}
                      value={
                        membre.id
                      }
                      disabled={personneDejaSelectionnee(
                        membre.id,
                        "gerante"
                      )}
                    >
                      {obtenirNomMembre(
                        membre
                      )}
                    </option>
                  )
                )}
              </select>
            </label>

            <button
              type="button"
              onClick={enregistrer}
            >
              Enregistrer
            </button>
          </>
        )}

        {message && (
          <p>{message}</p>
        )}
      </div>
    </section>
  );
}

export default GestionAffectationsPersonnel;