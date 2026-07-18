export default function RemplacanteModal({
  ouverte,
  equipeRemplacante,
  numeroRemplacante,
  setNumeroRemplacante,
  nomRemplacante,
  setNomRemplacante,
  confirmerRemplacante,
  fermer,
}) {
  if (!ouverte) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Ajouter une remplaçante</h2>

        <p>
          Équipe : <strong>{equipeRemplacante}</strong>
        </p>

        <label>Numéro</label>
        <input
          value={numeroRemplacante}
          onChange={(e) => setNumeroRemplacante(e.target.value)}
          placeholder="Exemple : 14"
        />

        <label>Nom</label>
        <input
          value={nomRemplacante}
          onChange={(e) => setNomRemplacante(e.target.value)}
          placeholder="Exemple : Marie Tremblay"
        />

        <div className="modal-actions">
          <button onClick={confirmerRemplacante}>
            Ajouter
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