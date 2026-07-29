export default function ListeOfficielsModal({
  ouverte,
  officiels,
  modifierOfficiel,
  fermer,
}) {
  if (!ouverte) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal config-modal">
        <h2>Liste des officiels</h2>

        {officiels.length === 0 ? (
          <p>Aucun officiel enregistré.</p>
        ) : (
          <ul className="liste-officiels">
            {officiels.map((officiel) => {
              const roles = [
                officiel.arbitre && "Arbitre",
                officiel.chronometreur &&
                  "Chronométreur",
                officiel.marqueur && "Marqueur",
                officiel.operateur30s &&
                  "Opérateur 30 sec.",
              ]
                .filter(Boolean)
                .join(", ");

              return (
                <li
                  key={officiel.id}
                  className="ligne-officiel"
                >
                  <div>
                    <strong>{officiel.nom}</strong>

                    <div>
                      {roles || "Aucun rôle assigné"}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      modifierOfficiel(officiel)
                    }
                  >
                    Modifier
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        <div className="modal-actions">
          <button
            type="button"
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