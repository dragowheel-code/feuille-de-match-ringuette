export default function TempsMortModal({
  ouverte,
  equipeTempsMort,
  setEquipeTempsMort,
  matchInfo,
  periode,
  confirmerTempsMort,
  fermer,
}) {
  if (!ouverte) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Temps mort</h2>

        <label>Équipe</label>
        <select
          value={equipeTempsMort}
          onChange={(e) => setEquipeTempsMort(e.target.value)}
        >
          <option value="Local">
            {matchInfo.equipeLocale || "Équipe locale"}
          </option>

          <option value="Visiteur">
            {matchInfo.equipeVisiteuse || "Équipe visiteuse"}
          </option>
        </select>

        <p>
          Période : <strong>{periode}</strong>
        </p>

        <div className="modal-actions">
          <button onClick={confirmerTempsMort}>
            Confirmer
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