import { DUREES_PERIODE } from "../constants/dureesPeriode";

export default function ConfigurationModal({
  ouverte,
  fermer,
  matchInfo,
  setMatchInfo,
  dureePeriode,
  setDureePeriode,
  equipes,
  equipeLocaleData,
  equipeVisiteuseData,
  destinataires,
  arbitresDisponibles,
  chronometreursDisponibles,
  marqueursDisponibles,
  operateurs30sDisponibles,
}) {
  if (!ouverte) return null;

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
              setMatchInfo({
                ...matchInfo,
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
              setMatchInfo({
                ...matchInfo,
                date: e.target.value,
              })
            }
          />

          <label>Aréna</label>
          <input
            value={matchInfo.arena || ""}
            onChange={(e) =>
              setMatchInfo({
                ...matchInfo,
                arena: e.target.value,
              })
            }
            placeholder="Exemple : Aréna Guy Carbonneau"
          />

          <label>Calibre</label>
          <select
            value={matchInfo.calibre || "U12"}
            onChange={(e) =>
              setMatchInfo({
                ...matchInfo,
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
                value={matchInfo.equipeLocale || ""}
                onChange={(e) =>
                  setMatchInfo({
                    ...matchInfo,
                    equipeLocale: e.target.value,
                  })
                }
              >
                <option value="">Choisir</option>

                {equipes.map((equipe) => (
                  <option key={equipe.id} value={equipe.nom}>
                    {equipe.nom}
                  </option>
                ))}
              </select>
            </div>

            <div className="team-config-card">
              <h3>Équipe visiteuse</h3>

              <label>Équipe</label>
              <select
                value={matchInfo.equipeVisiteuse || ""}
                onChange={(e) =>
                  setMatchInfo({
                    ...matchInfo,
                    equipeVisiteuse: e.target.value,
                  })
                }
              >
                <option value="">Choisir</option>

                {equipes.map((equipe) => (
                  <option key={equipe.id} value={equipe.nom}>
                    {equipe.nom}
                  </option>
                ))}
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
                setMatchInfo({
                  ...matchInfo,
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
                setMatchInfo({
                  ...matchInfo,
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
              setMatchInfo({
                ...matchInfo,
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
              setMatchInfo({
                ...matchInfo,
                arbitrePrincipal: e.target.value,
              })
            }
          >
            <option value="">Choisir un arbitre</option>

            {arbitresDisponibles.map((officiel) => (
              <option key={officiel.id} value={officiel.nom}>
                {officiel.nom}
              </option>
            ))}
          </select>

          <label>Arbitre secondaire</label>
          <select
            value={matchInfo.arbitreSecondaire || ""}
            onChange={(e) =>
              setMatchInfo({
                ...matchInfo,
                arbitreSecondaire: e.target.value,
              })
            }
          >
            <option value="">Choisir un arbitre</option>

            {arbitresDisponibles.map((officiel) => (
              <option key={officiel.id} value={officiel.nom}>
                {officiel.nom}
              </option>
            ))}
          </select>

          <label>Chronométreur</label>
          <select
            value={matchInfo.chronometreur || ""}
            onChange={(e) =>
              setMatchInfo({
                ...matchInfo,
                chronometreur: e.target.value,
              })
            }
          >
            <option value="">Choisir un chronométreur</option>

            {chronometreursDisponibles.map((officiel) => (
              <option key={officiel.id} value={officiel.nom}>
                {officiel.nom}
              </option>
            ))}
          </select>

          <label>Marqueur</label>
          <select
            value={matchInfo.marqueur || ""}
            onChange={(e) =>
              setMatchInfo({
                ...matchInfo,
                marqueur: e.target.value,
              })
            }
          >
            <option value="">Choisir un marqueur</option>

            {marqueursDisponibles.map((officiel) => (
              <option key={officiel.id} value={officiel.nom}>
                {officiel.nom}
              </option>
            ))}
          </select>

          <label>Opérateur 30 secondes</label>
          <select
            value={matchInfo.operateur30s || ""}
            onChange={(e) =>
              setMatchInfo({
                ...matchInfo,
                operateur30s: e.target.value,
              })
            }
          >
            <option value="">Choisir un opérateur</option>

            {operateurs30sDisponibles.map((officiel) => (
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