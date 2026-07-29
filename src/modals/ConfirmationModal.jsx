export default function ConfirmationModal({
  ouverte,
  titre,
  message,
  resume = [],
  texteConfirmer = "Confirmer",
  texteAnnuler = "Annuler",
  classeBoutonConfirmation = "",
  confirmer,
  fermer,
}) {
  if (!ouverte) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{titre}</h2>

        {message && <p>{message}</p>}

        {resume.length > 0 && (
          <ul>
            {resume.map((element, index) => (
              <li key={`${element}-${index}`}>
                {element}
              </li>
            ))}
          </ul>
        )}

        <div className="modal-actions">
          <button
            type="button"
            className={classeBoutonConfirmation}
            onClick={confirmer}
          >
            {texteConfirmer}
          </button>

          <button
            type="button"
            className="cancel-button"
            onClick={fermer}
          >
            {texteAnnuler}
          </button>
        </div>
      </div>
    </div>
  );
}