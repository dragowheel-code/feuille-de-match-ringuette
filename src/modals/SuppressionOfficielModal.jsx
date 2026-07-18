export default function SuppressionOfficielModal({
  ouverte,
  officielASupprimer,
  setOfficielASupprimer,
  officiels,
  supprimerOfficiel,
  fermer,
}) {
  if (!ouverte) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Supprimer un officiel</h2>

        <label>Officiel</label>

        <select
          value={officielASupprimer}
          onChange={(e) =>
            setOfficielASupprimer(e.target.value)
          }
        >
          <option value="">Choisir un officiel</option>

          {officiels.map((officiel) => (
            <option
              key={officiel.id}
              value={officiel.nom}
            >
              {officiel.nom}
            </option>
          ))}
        </select>

        <div className="modal-actions">
          <button onClick={supprimerOfficiel}>
            Supprimer
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