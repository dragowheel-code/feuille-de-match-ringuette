import { useState } from "react";

function obtenirNomEquipe(
  equipe,
  associations
) {
  const association =
    associations.find(
      (element) =>
        String(element.id) ===
        String(equipe.associationId)
    );

  const nomAssociation =
    association?.nom ||
    association?.abreviation ||
    "Association inconnue";

  const nomEquipe = [
    equipe.categorie,
    equipe.niveau,
    equipe.numeroEquipe,
  ]
    .filter(Boolean)
    .join(" ");

  return `${nomAssociation} — ${nomEquipe}`;
}

function obtenirNomOfficiel(
  officiel,
  associations
) {
  const association =
    associations.find(
      (element) =>
        String(element.id) ===
        String(officiel.associationId)
    );

  const nomAssociation =
  association?.nom ||
  association?.abreviation ||
  (
    !officiel.associationId
      ? "Ancien officiel"
      : "Association inconnue"
  );

  return `${nomAssociation} — ${officiel.nom}`;
}

function FicheTournoiModal({
  tournoi,
  fermer,
  modifier,

  associations,
  equipes,
  officiels,

  gestionInscriptionsTournoi,
}) {
  const [equipeId, setEquipeId] =
    useState("");

  const [officielId, setOfficielId] =
    useState("");

  if (!tournoi) {
    return null;
  }

  const {
    inscriptionsEquipesTournoi,
    inscriptionsOfficielsTournoi,

    inscrireEquipe,
    inscrireOfficiel,

    retirerEquipe,
    retirerOfficiel,
  } = gestionInscriptionsTournoi;

  const inscriptionsEquipes =
    inscriptionsEquipesTournoi.filter(
      (inscription) =>
        String(
          inscription.tournoiId
        ) ===
        String(tournoi.id)
    );

  const inscriptionsOfficiels =
    inscriptionsOfficielsTournoi.filter(
      (inscription) =>
        String(
          inscription.tournoiId
        ) ===
        String(tournoi.id)
    );

  const idsEquipesInscrites =
  new Set(
    inscriptionsEquipes.map(
      (inscription) =>
        String(
          inscription.equipeId
        )
    )
  );

const idsOfficielsInscrits =
  new Set(
    inscriptionsOfficiels.map(
      (inscription) =>
        String(
          inscription.officielId
        )
    )
  );

  const equipesDisponibles =
    equipes
      .filter(
        (equipe) =>
          String(
            equipe.saisonId
          ) ===
            String(
              tournoi.saisonId
            ) &&
          !idsEquipesInscrites.has(
            String(equipe.id)
          )
      )
      .sort((a, b) =>
  obtenirNomEquipe(
    a,
    associations
  ).localeCompare(
    obtenirNomEquipe(
      b,
      associations
    ),
    "fr-CA"
  )
);

  const officielsDisponibles =
  officiels
    .filter(
      (officiel) =>
        officiel.actif !== false &&
        !idsOfficielsInscrits.has(
          String(officiel.id)
        )
    )
    .sort((a, b) =>
      obtenirNomOfficiel(
        a,
        associations
      ).localeCompare(
        obtenirNomOfficiel(
          b,
          associations
        ),
        "fr-CA"
      )
    );

  async function ajouterEquipe() {
  if (!equipeId) {
    return;
  }

  const resultat =
    await inscrireEquipe({
      tournoiId:
        tournoi.id,
      equipeId,
    });

  if (!resultat.succes) {
    alert(
      resultat.erreurs?.join(
        "\n"
      ) ||
        "Impossible d'inscrire l'équipe."
    );

    return;
  }

  setEquipeId("");
}

async function ajouterOfficiel() {
  if (!officielId) {
    return;
  }

  const resultat =
    await inscrireOfficiel({
      tournoiId:
        tournoi.id,
      officielId,
    });

  if (!resultat.succes) {
    alert(
      resultat.erreurs?.join(
        "\n"
      ) ||
        "Impossible d'inscrire l'officiel."
    );

    return;
  }

  setOfficielId("");
}

async function retirerEquipeInscrite(
  inscription
) {
  const equipe =
    equipes.find(
      (element) =>
        String(
          element.id
        ) ===
        String(
          inscription.equipeId
        )
    );

  const nomEquipe =
    equipe
      ? obtenirNomEquipe(
          equipe,
          associations
        )
      : "cette équipe";

  if (
    !confirm(
      `Retirer ${nomEquipe} du tournoi ?`
    )
  ) {
    return;
  }

  const resultat =
    await retirerEquipe(
      inscription.id
    );

  if (!resultat.succes) {
    alert(
      resultat.erreurs?.join(
        "\n"
      ) ||
        "Impossible de retirer l'équipe."
    );
  }
}

async function retirerOfficielInscrit(
  inscription
) {
  const officiel =
    officiels.find(
      (element) =>
        String(
          element.id
        ) ===
        String(
          inscription.officielId
        )
    );

  const nomOfficiel =
    officiel
      ? obtenirNomOfficiel(
          officiel,
          associations
        )
      : "cet officiel";

  if (
    !confirm(
      `Retirer ${nomOfficiel} du tournoi ?`
    )
  ) {
    return;
  }

  const resultat =
    await retirerOfficiel(
      inscription.id
    );

  if (!resultat.succes) {
    alert(
      resultat.erreurs?.join(
        "\n"
      ) ||
        "Impossible de retirer l'officiel."
    );
  }
}

  return (
    <div className="modal-backdrop">
      <div className="modal config-modal">
        <h2>{tournoi.nom}</h2>

        <div className="config-section">
          <h3>
            Équipes inscrites
          </h3>

          {inscriptionsEquipes.length ===
          0 ? (
            <p>
              Aucune équipe inscrite.
            </p>
          ) : (
            <ul>
              {inscriptionsEquipes.map(
                (inscription) => {
                  const equipe =
                    equipes.find(
                      (element) =>
                        String(
                          element.id
                        ) ===
                        String(
                          inscription.equipeId
                        )
                    );

                  return (
                    <li
                      key={
                        inscription.id
                      }
                    >
                      {equipe
  ? obtenirNomEquipe(
      equipe,
      associations
    )
  : "Équipe introuvable"}

                      <button
                        type="button"
                        onClick={() =>
                          retirerEquipeInscrite(
                            inscription
                          )
                        }
                      >
                        Retirer
                      </button>
                    </li>
                  );
                }
              )}
            </ul>
          )}

          <div>
            <select
              value={equipeId}
              onChange={(event) =>
                setEquipeId(
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
  equipe,
  associations
)}
                  </option>
                )
              )}
            </select>

            <button
              type="button"
              onClick={
                ajouterEquipe
              }
              disabled={!equipeId}
            >
              Ajouter une équipe
            </button>
          </div>
        </div>

        <div className="config-section">
          <h3>
            Officiels inscrits
          </h3>

          {inscriptionsOfficiels.length ===
          0 ? (
            <p>
              Aucun officiel inscrit.
            </p>
          ) : (
            <ul>
              {inscriptionsOfficiels.map(
                (inscription) => {
                  const officiel =
                    officiels.find(
                      (element) =>
                        String(
                          element.id
                        ) ===
                        String(
                          inscription.officielId
                        )
                    );

                  return (
                    <li
                      key={
                        inscription.id
                      }
                    >
                      {officiel
  ? obtenirNomOfficiel(
      officiel,
      associations
    )
  : "Officiel introuvable"}

                      <button
                        type="button"
                        onClick={() =>
                          retirerOfficielInscrit(
                            inscription
                          )
                        }
                      >
                        Retirer
                      </button>
                    </li>
                  );
                }
              )}
            </ul>
          )}

          <div>
            <select
              value={officielId}
              onChange={(event) =>
                setOfficielId(
                  event.target.value
                )
              }
            >
              <option value="">
                Sélectionner un officiel
              </option>

              {officielsDisponibles.map(
                (officiel) => (
                  <option
                    key={
                      officiel.id
                    }
                    value={
                      officiel.id
                    }
                  >
                    {obtenirNomOfficiel(
  officiel,
  associations
)}
                  </option>
                )
              )}
            </select>

            <button
              type="button"
              onClick={
                ajouterOfficiel
              }
              disabled={
                !officielId
              }
            >
              Ajouter un officiel
            </button>
          </div>
        </div>

        <div className="modal-actions">
          <button
            type="button"
            onClick={() =>
              modifier(tournoi)
            }
          >
            Modifier le tournoi
          </button>

          <button
            type="button"
            className="cancel-button"
            onClick={fermer}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}

export default FicheTournoiModal;