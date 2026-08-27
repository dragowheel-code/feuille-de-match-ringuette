import { DUREES_PERIODE } from "../constants/dureesPeriode";
import { mettreAJourMatch } from "../domain/match";
import {
  obtenirEquipesDisponibles,
  obtenirOfficielsDisponibles,
  } from "../domain/configurationMatch";


export default function ConfigurationModal({
  ouverte,
  fermer,
  matchInfo,
  setMatchInfo,
  associations,
  tournois,
  setJoueuses,
  equipesAdministration,
  inscriptionsEquipesTournoi,
  officiels,
  inscriptionsOfficielsTournoi,
  dureePeriode,
  setDureePeriode,
  equipeLocaleData,
  equipeVisiteuseData,
  destinataires,
  chargerAlignementPublic,
}) {
  const equipesDisponibles =
  obtenirEquipesDisponibles({
    typeConfiguration:
      matchInfo.typeConfiguration,

    associationLocaleId:
      matchInfo.associationLocaleId,

    associationVisiteuseId:
      matchInfo.associationVisiteuseId,

    tournoiId:
      matchInfo.tournoiId,

    equipes:
      equipesAdministration,

    inscriptionsEquipesTournoi,
  });

  const officielsDisponiblesConfiguration =
  obtenirOfficielsDisponibles({
    typeConfiguration:
      matchInfo.typeConfiguration,

    associationLocaleId:
      matchInfo.associationLocaleId,

    associationVisiteuseId:
      matchInfo.associationVisiteuseId,

    tournoiId:
      matchInfo.tournoiId,

    officiels,

    inscriptionsOfficielsTournoi,
  });

  const arbitresConfiguration =
  officielsDisponiblesConfiguration.filter(
    (officiel) =>
      officiel.arbitre
  );

const chronometreursConfiguration =
  officielsDisponiblesConfiguration.filter(
    (officiel) =>
      officiel.chronometreur
  );

const marqueursConfiguration =
  officielsDisponiblesConfiguration.filter(
    (officiel) =>
      officiel.marqueur
  );

const operateurs30sConfiguration =
  officielsDisponiblesConfiguration.filter(
    (officiel) =>
      officiel.operateur30s
  );

  if (!ouverte) return null;

  function modifierMatch(modifications) {
    setMatchInfo(
      mettreAJourMatch(
        matchInfo,
        modifications
      )
    );
  }

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
    association?.nomEquipes ||
    association?.abreviation ||
    association?.nom ||
    "Association";

  const nomEquipe = [
    equipe.categorie,
    equipe.niveau,
    equipe.numeroEquipe,
  ]
    .filter(Boolean)
    .join(" ");

  return `${nomAssociation} — ${nomEquipe}`;
}

  return (
    <div className="modal-backdrop">
      <div className="modal config-modal">
        <h2>Configuration du match</h2>

        <div className="config-section">
          <h3>Informations du match</h3>

          <label>Numéro de partie</label>
          <input
            value={matchInfo.numeroPartie || ""}
           onChange={(e) =>
  modifierMatch({
    numeroPartie: e.target.value,
  })
}
            placeholder="Exemple : 104"
          />

          <label>Date</label>
          <input
            type="date"
            value={matchInfo.date || ""}
            onChange={(e) =>
  modifierMatch({
    date: e.target.value,
  })
}
          />

          <label>Aréna</label>
          <input
            value={matchInfo.arena || ""}
            onChange={(e) =>
              modifierMatch({
                arena: e.target.value,
              })            }
            placeholder="Exemple : Aréna Guy Carbonneau"
          />
          <div className="config-section">
  <h3>Type de match</h3>

  <label>
    <input
      type="radio"
      name="typeConfiguration"
      value="local"
      checked={
        matchInfo.typeConfiguration === "local"
      }
      onChange={(event) =>
  setMatchInfo((ancien) => ({
    ...ancien,

    typeConfiguration:
      event.target.value,

    associationLocaleId: "",
    associationVisiteuseId: "",
    tournoiId: "",

    equipeLocaleId: "",
    equipeVisiteuseId: "",

    equipeLocale: "",
    equipeVisiteuse: "",
  }))
}
    />
    Match local
  </label>

  <label>
  <input
    type="radio"
    name="typeConfiguration"
    value="inter-association"
    checked={
      matchInfo.typeConfiguration ===
      "inter-association"
    }
    onChange={(event) =>
      setMatchInfo((ancien) => ({
        ...ancien,

        typeConfiguration:
          event.target.value,

        associationLocaleId: "",
        associationVisiteuseId: "",
        tournoiId: "",

        equipeLocaleId: "",
        equipeVisiteuseId: "",

        equipeLocale: "",
        equipeVisiteuse: "",
      }))
    }
  />
  Match inter-association
</label>

  <label>
    <input
      type="radio"
      name="typeConfiguration"
      value="tournoi"
      checked={
        matchInfo.typeConfiguration ===
        "tournoi"
      }
      onChange={(event) =>
  setMatchInfo((ancien) => ({
    ...ancien,

    typeConfiguration:
      event.target.value,

    associationLocaleId: "",
    associationVisiteuseId: "",
    tournoiId: "",

    equipeLocaleId: "",
    equipeVisiteuseId: "",

    equipeLocale: "",
    equipeVisiteuse: "",
  }))
}
    />
    Tournoi
  </label>
</div>

{matchInfo.typeConfiguration === "local" && (
  <div className="config-section">
    <label>
      Association locale

      <select
  value={matchInfo.associationLocaleId}
  onChange={(event) =>
    setMatchInfo((ancien) => ({
      ...ancien,

      associationLocaleId:
        event.target.value,

      equipeLocaleId: "",
      equipeVisiteuseId: "",

      equipeLocale: "",
      equipeVisiteuse: "",
    }))
  }
>
  <option value="">
    Sélectionner une association
  </option>

  {associations.map((association) => (
    <option
      key={association.id}
      value={association.id}
    >
      {association.nom}
    </option>
  ))}
</select>
    </label>
  </div>
)}

{matchInfo.typeConfiguration ===
  "inter-association" && (
  <div className="config-section">
    <label>
      Association locale

      <select
        value={matchInfo.associationLocaleId}
        onChange={(event) =>
          setMatchInfo((ancien) => ({
            ...ancien,
            associationLocaleId:
              event.target.value,
          }))
        }
      >
        <option value="">
          Sélectionner une association
        </option>

        {associations.map((association) => (
          <option
            key={association.id}
            value={association.id}
          >
            {association.nom}
          </option>
        ))}
      </select>
    </label>

    <label>
      Association visiteuse

      <select
        value={matchInfo.associationVisiteuseId}
        onChange={(event) =>
          setMatchInfo((ancien) => ({
            ...ancien,
            associationVisiteuseId:
              event.target.value,
          }))
        }
      >
        <option value="">
          Sélectionner une association
        </option>

        {associations
          .filter(
            (association) =>
              String(association.id) !==
              String(
                matchInfo.associationLocaleId
              )
          )
          .map((association) => (
            <option
              key={association.id}
              value={association.id}
            >
              {association.nom}
            </option>
          ))}
      </select>
    </label>
  </div>
)}

{matchInfo.typeConfiguration === "tournoi" && (
  <div className="config-section">
    <label>
      Tournoi

      <select
        value={matchInfo.tournoiId}
        onChange={(event) =>
          setMatchInfo((ancien) => ({
            ...ancien,
            tournoiId:
              event.target.value,
          }))
        }
      >
        <option value="">
          Sélectionner un tournoi
        </option>

        {tournois
          .filter(
            (tournoi) =>
              tournoi.actif !== false
          )
          .map((tournoi) => (
            <option
              key={tournoi.id}
              value={tournoi.id}
            >
              {tournoi.nom}
            </option>
          ))}
      </select>
    </label>
  </div>
)}

          <label>Calibre</label>
          <select
            value={matchInfo.calibre || "U12"}
            onChange={(e) =>
              modifierMatch({
                calibre: e.target.value,
                })
              }
          >
            <option value="U10">U10</option>
            <option value="U12">U12</option>
            <option value="U14">U14</option>
            <option value="U16">U16</option>
            <option value="U19">U19</option>
            <option value="Senior">Senior</option>
          </select>

          <label>Durée des périodes</label>
          <select
            value={dureePeriode}
            onChange={(e) =>
              setDureePeriode(Number(e.target.value))
            }
          >
            {DUREES_PERIODE.map((duree) => (
              <option key={duree} value={duree}>
                {duree} minutes
              </option>
            ))}
          </select>
        </div>

        <div className="config-section">
          <h3>Équipes</h3>

          <div className="team-config-grid">
            <div className="team-config-card">
              <h3>Équipe locale</h3>

              <label>Équipe</label>
              <select
  value={matchInfo.equipeLocaleId || ""}
  onChange={async (e) => {
  const equipeId = e.target.value;

  const equipeSelectionnee =
    equipesDisponibles.find(
      (equipe) =>
        String(equipe.id) ===
        String(equipeId)
    );

  const nomEquipeLocale =
    equipeSelectionnee
      ? obtenirNomEquipe(
          equipeSelectionnee,
          associations
        )
      : "";

  let alignementLocal = [];

  if (
    equipeSelectionnee &&
    chargerAlignementPublic
  ) {
    const resultat =
      await chargerAlignementPublic(
        equipeSelectionnee.id
      );

    if (resultat.succes) {
      alignementLocal =
        resultat.joueuses.map(
          (joueuse) => ({
            ...joueuse,
            equipe:
              nomEquipeLocale,
          })
        );
    }
  }

  modifierMatch({
    equipeLocaleId: equipeId,
    equipeLocale:
      nomEquipeLocale,
  });

  setJoueuses(
    (anciennesJoueuses) => {
      const autresJoueuses =
        anciennesJoueuses.filter(
          (joueuse) =>
            joueuse.equipe !==
            matchInfo.equipeLocale
        );

      return [
        ...autresJoueuses,
        ...alignementLocal,
      ];
    }
  );
}}
>
  <option value="">
    Choisir
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
            </div>

            <div className="team-config-card">
              <h3>Équipe visiteuse</h3>

              <label>Équipe</label>
              <select
  value={
    matchInfo.equipeVisiteuseId ||
    ""
  }
  onChange={async (e) => {
  const equipeId = e.target.value;

  const equipeSelectionnee =
    equipesDisponibles.find(
      (equipe) =>
        String(equipe.id) ===
        String(equipeId)
    );

  const nomEquipeVisiteuse =
    equipeSelectionnee
      ? obtenirNomEquipe(
          equipeSelectionnee,
          associations
        )
      : "";

  let alignementVisiteur = [];

  if (
    equipeSelectionnee &&
    chargerAlignementPublic
  ) {
    const resultat =
      await chargerAlignementPublic(
        equipeSelectionnee.id
      );

    if (resultat.succes) {
      alignementVisiteur =
        resultat.joueuses.map(
          (joueuse) => ({
            ...joueuse,
            equipe:
              nomEquipeVisiteuse,
          })
        );
    }
  }

  modifierMatch({
    equipeVisiteuseId:
      equipeId,
    equipeVisiteuse:
      nomEquipeVisiteuse,
  });

  setJoueuses(
    (anciennesJoueuses) => {
      const autresJoueuses =
        anciennesJoueuses.filter(
          (joueuse) =>
            joueuse.equipe !==
            matchInfo.equipeVisiteuse
        );

      return [
        ...autresJoueuses,
        ...alignementVisiteur,
      ];
    }
  );
}}
>
  <option value="">
    Choisir
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
            </div>
          </div>
        </div>

        <div className="config-section">
          <h3>Courriel d’envoi</h3>

          <label className="courriel-option">
            <input
              type="checkbox"
              checked={matchInfo.envoyerCourrielLocal || false}
              onChange={(e) =>
              modifierMatch({
                  envoyerCourrielLocal: e.target.checked,
                })
              }
            />

            <span>
              Local :{" "}
              {equipeLocaleData?.courriel || "Aucun courriel"}
            </span>
          </label>

          <label className="courriel-option">
            <input
              type="checkbox"
              checked={
                matchInfo.envoyerCourrielVisiteur || false
              }
              onChange={(e) =>
                modifierMatch({
                  envoyerCourrielVisiteur: e.target.checked,
                })
              }
            />

            <span>
              Visiteur :{" "}
              {equipeVisiteuseData?.courriel ||
                "Aucun courriel"}
            </span>
          </label>

          <label>Courriels supplémentaires</label>
          <input
            type="text"
            value={matchInfo.courrielPersonnalise || ""}
            onChange={(e) =>
              modifierMatch({
                courrielPersonnalise: e.target.value,
              })
            }
            placeholder="courriel1@exemple.ca, courriel2@exemple.ca"
          />

          <p>
            Destinataires utilisés :{" "}
            <strong>
              {destinataires.length
                ? destinataires.join(", ")
                : "Aucun"}
            </strong>
          </p>
        </div>

        <div className="config-section">
          <h3>Officiels</h3>

          <label>Arbitre principal</label>
          <select
            value={matchInfo.arbitrePrincipal || ""}
            onChange={(e) =>
              modifierMatch({
                arbitrePrincipal: e.target.value,
              })
            }
          >
            <option value="">Choisir un arbitre</option>

            {arbitresConfiguration.map((officiel) => (
              <option key={officiel.id} value={officiel.nom}>
                {officiel.nom}
              </option>
            ))}
          </select>

          <label>Arbitre secondaire</label>
          <select
            value={matchInfo.arbitreSecondaire || ""}
            onChange={(e) =>
              modifierMatch({
                arbitreSecondaire: e.target.value,
              })
            }
          >
            <option value="">Choisir un arbitre</option>

            {arbitresConfiguration.map((officiel) => (
              <option key={officiel.id} value={officiel.nom}>
                {officiel.nom}
              </option>
            ))}
          </select>

          <label>Chronométreur</label>
          <select
            value={matchInfo.chronometreur || ""}
            onChange={(e) =>
              modifierMatch({
                chronometreur: e.target.value,
              })
            }
          >
            <option value="">Choisir un chronométreur</option>

            {chronometreursConfiguration.map((officiel) => (
              <option key={officiel.id} value={officiel.nom}>
                {officiel.nom}
              </option>
            ))}
          </select>

          <label>Marqueur</label>
          <select
            value={matchInfo.marqueur || ""}
            onChange={(e) =>
              modifierMatch({
                marqueur: e.target.value,
              })
            }
          >
            <option value="">Choisir un marqueur</option>

            {marqueursConfiguration.map((officiel) => (
              <option key={officiel.id} value={officiel.nom}>
                {officiel.nom}
              </option>
            ))}
          </select>

          <label>Opérateur 30 secondes</label>
          <select
            value={matchInfo.operateur30s || ""}
            onChange={(e) =>
              modifierMatch({
                operateur30s: e.target.value,
              })
            }
          >
            <option value="">Choisir un opérateur</option>

            {operateurs30sConfiguration.map((officiel) => (
              <option key={officiel.id} value={officiel.nom}>
                {officiel.nom}
              </option>
            ))}
          </select>
        </div>

        <div className="modal-actions">
          <button onClick={fermer}>Confirmer</button>

          <button
            className="cancel-button"
            onClick={fermer}
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}