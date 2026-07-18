export default function SuppressionEquipeModal({
  ouverte,
  equipeASupprimer,
  setEquipeASupprimer,
  equipes,
  supprimerEquipe,
  fermer,
}) {
  if (!ouverte) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Supprimer une équipe</h2>

        <label>Équipe</label>

        <select
          value={equipeASupprimer}
          onChange={(e) => setEquipeASupprimer(e.target.value)}
        >
          <option value="">Choisir une équipe</option>

          {equipes.map((equipe) => (
            <option key={equipe.id} value={equipe.nom}>
              {equipe.nom}
            </option>
          ))}
        </select>

        <div className="modal-actions">
          <button
            className="delete-button"
            onClick={supprimerEquipe}
          >
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