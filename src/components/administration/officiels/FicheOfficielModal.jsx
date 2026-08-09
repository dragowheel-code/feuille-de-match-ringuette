function LigneRole({
  actif,
  libelle,
}) {
  return (
    <li>
      {actif ? "✓" : "○"}{" "}
      {libelle}
    </li>
  );
}

function FicheOfficielModal({
  officiel,
  fermer,
  modifier,
  supprimer,
}) {
  if (!officiel) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal config-modal">
        <h2>{officiel.nom}</h2>

        <div className="config-section">
          <h3>
            Rôles disponibles
          </h3>

          <ul>
            <LigneRole
              actif={
                officiel.arbitre
              }
              libelle="Arbitre"
            />

            <LigneRole
              actif={
                officiel.chronometreur
              }
              libelle="Chronométreur"
            />

            <LigneRole
              actif={
                officiel.marqueur
              }
              libelle="Marqueur"
            />

            <LigneRole
              actif={
                officiel.operateur30s
              }
              libelle="Opérateur 30 secondes"
            />
          </ul>
        </div>

        <div className="modal-actions">
          <button
            type="button"
            onClick={() =>
              modifier(officiel)
            }
          >
            Modifier
          </button>

          <button
            type="button"
            onClick={() =>
              supprimer(officiel)
            }
          >
            Supprimer
          </button>

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

export default FicheOfficielModal;