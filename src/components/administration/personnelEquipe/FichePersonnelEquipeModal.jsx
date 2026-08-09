function FichePersonnelEquipeModal({
  ouverte,
  fermer,
  personnel,
}) {
  if (!ouverte || !personnel) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-contenu">
        <header className="modal-entete">
          <h2>
            Dossier du personnel
          </h2>

          <button
            type="button"
            onClick={fermer}
          >
            ×
          </button>
        </header>

        <div className="fiche-personnel-equipe">
          <p>
            <strong>
              Nom :
            </strong>{" "}
            {personnel.nomComplet}
          </p>

          <p>
            <strong>
              Courriel :
            </strong>{" "}
            {personnel.courriel || "—"}
          </p>

          <p>
            <strong>
              Téléphone :
            </strong>{" "}
            {personnel.telephone || "—"}
          </p>

          <p>
            <strong>
              No PNCE :
            </strong>{" "}
            {personnel.pnce?.numero || "—"}
          </p>

          <p>
            <strong>
              Introduction :
            </strong>{" "}
            {personnel.pnce?.introduction
              ? "Oui"
              : "Non"}
          </p>

          <p>
            <strong>
              Éthique sportive :
            </strong>{" "}
            {personnel.pnce?.ethiqueSportive
              ? "Oui"
              : "Non"}
          </p>

          <p>
            <strong>
              Compétition :
            </strong>{" "}
            {personnel.pnce?.competition
              ? "Oui"
              : "Non"}
          </p>

          <p>
            <strong>
              Actif :
            </strong>{" "}
            {personnel.actif
              ? "Oui"
              : "Non"}
          </p>
        </div>

        <div className="modal-actions">
          <button
            type="button"
            onClick={fermer}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}

export default FichePersonnelEquipeModal;