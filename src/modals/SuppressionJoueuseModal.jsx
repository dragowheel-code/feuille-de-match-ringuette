export default function SuppressionJoueuseModal({
  ouverte,
  equipeSuppressionJoueuse,
  setEquipeSuppressionJoueuse,
  joueuseASupprimer,
  setJoueuseASupprimer,
  equipes,
  joueuses,
  supprimerJoueuse,
  fermer,
}) {
  if (!ouverte) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Supprimer une joueuse</h2>

        <label>Équipe</label>
        <select
          value={equipeSuppressionJoueuse}
          onChange={(e) => {
            setEquipeSuppressionJoueuse(e.target.value);
            setJoueuseASupprimer("");
          }}
        >
          <option value="">Choisir une équipe</option>

          {equipes.map((equipe) => (
            <option key={equipe.id} value={equipe.nom}>
              {equipe.nom}
            </option>
          ))}
        </select>

        <label>Joueuse</label>
        <select
          value={joueuseASupprimer}
          onChange={(e) => setJoueuseASupprimer(e.target.value)}
          disabled={!equipeSuppressionJoueuse}
        >
          <option value="">Choisir une joueuse</option>

          {joueuses
            .filter(
              (joueuse) =>
                joueuse.equipe === equipeSuppressionJoueuse
            )
            .sort(
              (a, b) =>
                Number(a.numero) - Number(b.numero)
            )
            .map((joueuse) => (
              <option key={joueuse.id} value={joueuse.id}>
                #{joueuse.numero} {joueuse.nom}
              </option>
            ))}
        </select>

        <div className="modal-actions">
          <button onClick={supprimerJoueuse}>
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