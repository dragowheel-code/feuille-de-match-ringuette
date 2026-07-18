import { PENALITES } from "../constants/penalites";

export default function PunitionModal({
  ouverte,
  equipePunition,
  setEquipePunition,
  matchInfo,
  tempsPunitionTableau,
  setTempsPunitionTableau,
  tempsCorrige,
  joueusePunition,
  setJoueusePunition,
  joueusePurgeePar,
  setJoueusePurgeePar,
  joueusesPunitionDisponibles,
  typePunition,
  setTypePunition,
  dureePunition,
  setDureePunition,
  nombrePortionsPunition,
  setNombrePortionsPunition,
  confirmerPunition,
  fermer,
}) {
  if (!ouverte) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Ajouter une punition</h2>

        <label>Équipe</label>
        <select
          value={equipePunition}
          onChange={(e) => {
            setEquipePunition(e.target.value);
            setJoueusePunition("");
          }}
        >
          <option value="Local">
            {matchInfo.equipeLocale || "Local"}
          </option>

          <option value="Visiteur">
            {matchInfo.equipeVisiteuse || "Visiteur"}
          </option>
        </select>

        <label>Temps affiché au tableau</label>
        <input
          value={tempsPunitionTableau}
          onChange={(e) => setTempsPunitionTableau(e.target.value)}
          placeholder="Exemple : 08:32"
        />

        <p>
          Temps corrigé :{" "}
          <strong>{tempsCorrige || "--:--"}</strong>
        </p>

        <label>Joueuse punie</label>
        <select
          value={joueusePunition}
          onChange={(e) => setJoueusePunition(e.target.value)}
        >
          <option value="">Choisir une joueuse</option>

          {joueusesPunitionDisponibles.map((joueuse) => (
            <option key={joueuse.id} value={joueuse.numero}>
              #{joueuse.numero} — {joueuse.nom}
            </option>
          ))}
        </select>

        <label>Purgée par</label>
        <select
          value={joueusePurgeePar}
          onChange={(e) => setJoueusePurgeePar(e.target.value)}
        >
          <option value="">Même joueuse / aucune</option>

          {joueusesPunitionDisponibles.map((joueuse) => (
            <option key={joueuse.id} value={joueuse.numero}>
              #{joueuse.numero} — {joueuse.nom}
            </option>
          ))}
        </select>

        <label>Punition</label>
        <select
          value={typePunition}
          onChange={(e) => {
            const valeur = e.target.value;
            setTypePunition(valeur);

            const penalite = PENALITES.find(
              (element) => element.valeur === valeur
            );

            if (!penalite) return;

            setDureePunition(penalite.dureeParPortion);
            setNombrePortionsPunition(
              penalite.nombrePortionsParDefaut || 1
            );
          }}
        >
          <option value="">Choisir une punition</option>

          {PENALITES.map((penalite) => (
            <option
              key={penalite.valeur}
              value={penalite.valeur}
            >
              {penalite.valeur}
            </option>
          ))}
        </select>

        <label>Nombre de pénalités sur le même appel</label>
        <select
          value={nombrePortionsPunition}
          onChange={(e) =>
            setNombrePortionsPunition(Number(e.target.value))
          }
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
        </select>

        <label>Durée par pénalité</label>
        <select
          value={dureePunition}
          onChange={(e) =>
            setDureePunition(Number(e.target.value))
          }
        >
          <option value={0}>Aucune durée</option>
          <option value={2}>2 min</option>
          <option value={4}>4 min</option>
          <option value={5}>5 min</option>
          <option value={10}>10 min</option>
        </select>

        <div className="modal-actions">
          <button onClick={confirmerPunition}>
            Confirmer la punition
          </button>

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