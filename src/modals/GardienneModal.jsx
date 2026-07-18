export default function GardienneModal({
  ouverte,
  equipeGardienne,
  setEquipeGardienne,
  tempsGardienneTableau,
  setTempsGardienneTableau,
  matchInfo,
  periode,
  tempsCorrige,
  confirmer,
  fermer,
}) {
  if (!ouverte) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Changement de gardienne</h2>

        <label>Équipe</label>
        <select
          value={equipeGardienne}
          onChange={(e) => setEquipeGardienne(e.target.value)}
        >
          <option value="Local">
            {matchInfo.equipeLocale || "Équipe locale"}
          </option>

          <option value="Visiteur">
            {matchInfo.equipeVisiteuse || "Équipe visiteuse"}
          </option>
        </select>

        <label>Temps affiché au tableau</label>
        <input
          type="text"
          value={tempsGardienneTableau}
          onChange={(e) => setTempsGardienneTableau(e.target.value)}
          placeholder="Exemple : 08:32"
        />

        <p>
          Période : <strong>{periode}</strong>
        </p>

        <p>
          Temps corrigé : <strong>{tempsCorrige || "--:--"}</strong>
        </p>

        <div className="modal-actions">
          <button onClick={confirmer}>Confirmer</button>

          <button className="cancel-button" onClick={fermer}>
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}