export default function ListeOfficielsModal({
  ouverte,
  officiels,
  fermer,
}) {
  if (!ouverte) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal config-modal">
        <h2>Liste des officiels</h2>

        {officiels.length === 0 ? (
          <p>Aucun officiel importé.</p>
        ) : (
          <ul>
            {officiels.map((officiel) => (
              <li key={officiel.id}>
                <strong>{officiel.nom}</strong>
                {" — "}
                {[
                  officiel.arbitre && "Arbitre",
                  officiel.chronometreur && "Chronométreur",
                  officiel.marqueur && "Marqueur",
                  officiel.operateur30s && "Opérateur 30 sec.",
                ]
                  .filter(Boolean)
                  .join(", ")}
              </li>
            ))}
          </ul>
        )}

        <div className="modal-actions">
          <button
            className="cancel-button"
            onClick={fermer}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}