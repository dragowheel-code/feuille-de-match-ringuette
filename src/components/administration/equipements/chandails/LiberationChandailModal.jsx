import { useState } from "react";

function LiberationChandailModal({
  ouverte,
  fermer,
  confirmer,

  ensemble,
  joueuse,
}) {
  const [
    commentaire,
    setCommentaire,
  ] = useState("");

  if (!ouverte) {
    return null;
  }

  function annuler() {
    setCommentaire("");
    fermer();
  }

  function enregistrer(event) {
    event.preventDefault();

    confirmer({
      commentaire,
    });

    setCommentaire("");
  }

  return (
    <div className="modal-overlay">
      <div className="modal-contenu">
        <header className="modal-entete">
          <h2>
            Libérer un ensemble
          </h2>

          <button
            type="button"
            onClick={annuler}
          >
            ×
          </button>
        </header>

        <form
          onSubmit={enregistrer}
        >
          <p>
            Ensemble
            <strong>
              {" "}
              #
              {ensemble?.numero}
            </strong>
          </p>

          <p>
            Joueuse
            <strong>
              {" "}
              {joueuse?.nomComplet}
            </strong>
          </p>

          <label>
            Commentaire

            <textarea
              rows={4}
              value={commentaire}
              onChange={(event) =>
                setCommentaire(
                  event.target.value
                )
              }
            />
          </label>

          <div className="modal-actions">
            <button
              type="button"
              onClick={annuler}
            >
              Annuler
            </button>

            <button
              type="submit"
            >
              Libérer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LiberationChandailModal;