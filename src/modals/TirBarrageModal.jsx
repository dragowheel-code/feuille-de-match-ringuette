export default function TirBarrageModal({
  ouverte,
  equipeTirBarrage,
  setEquipeTirBarrage,
  matchInfo,
  joueuseTirBarrage,
  setJoueuseTirBarrage,
  joueusesTirBarrageDisponibles,
  tirBarrageReussi,
  setTirBarrageReussi,
  confirmerTirBarrage,
  fermer,
}) {
  if (!ouverte) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Ajouter un tir de barrage</h2>

        <label>Équipe</label>

        <select
          value={equipeTirBarrage}
          onChange={(e) => {
            setEquipeTirBarrage(e.target.value);
            setJoueuseTirBarrage("");
          }}
        >
          <option value="Local">
            {matchInfo.equipeLocale || "Local"}
          </option>

          <option value="Visiteur">
            {matchInfo.equipeVisiteuse || "Visiteur"}
          </option>
        </select>

        <label>Joueuse</label>

        <select
          value={joueuseTirBarrage}
          onChange={(e) =>
            setJoueuseTirBarrage(e.target.value)
          }
        >
          <option value="">Choisir une joueuse</option>

          {joueusesTirBarrageDisponibles.map((joueuse) => (
            <option
              key={joueuse.id}
              value={joueuse.numero}
            >
              #{joueuse.numero} — {joueuse.nom}
            </option>
          ))}
        </select>

        <label>
          <input
            type="checkbox"
            checked={tirBarrageReussi}
            onChange={(e) =>
              setTirBarrageReussi(e.target.checked)
            }
          />

          Tir réussi
        </label>

        <div className="modal-actions">
          <button onClick={confirmerTirBarrage}>
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