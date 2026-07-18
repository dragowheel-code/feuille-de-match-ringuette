export default function AnnulationPunitionModal({
  ouverte,
  butEnAttente,
  punitionSelectionnee,
  setPunitionSelectionnee,
  punitionsAnnulables,
  confirmerAnnulationPunition,
  confirmerButSansAnnulation,
}) {
  if (!ouverte) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Annulation de punition</h2>

        <p>
          Un but vient d’être marqué à{" "}
          <strong>{butEnAttente?.tempsCorrige}</strong>.
        </p>

        <label>Punition à annuler</label>

        <select
          value={punitionSelectionnee}
          onChange={(e) =>
            setPunitionSelectionnee(e.target.value)
          }
        >
          <option value="">Aucune sélection</option>

          {punitionsAnnulables.map((punition) => (
            <option
              key={punition.id}
              value={punition.id}
            >
              #{punition.joueuseNumero} — {punition.punition} — retour prévu{" "}
              {punition.tempsRetour}
            </option>
          ))}
        </select>

        <div className="modal-actions">
          <button onClick={confirmerAnnulationPunition}>
            Annuler cette punition
          </button>

          <button onClick={confirmerButSansAnnulation}>
            Aucune annulation
          </button>
        </div>
      </div>
    </div>
  );
}