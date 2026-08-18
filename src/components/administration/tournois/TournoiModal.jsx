function TournoiModal({
  ouverte,
  tournoi,
  setTournoi,
  confirmer,
  fermer,
}) {
  if (
    !ouverte ||
    !tournoi
  ) {
    return null;
  }

  const modeModification =
    tournoi.mode ===
    "modification";

  function modifierChamp(
    event
  ) {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setTournoi(
      (ancienTournoi) => ({
        ...ancienTournoi,
        [name]:
          type === "checkbox"
            ? checked
            : value,
      })
    );
  }

  function soumettre(
    event
  ) {
    event.preventDefault();
    confirmer();
  }

  return (
    <div className="modal-backdrop">
      <div className="modal config-modal">
        <h2>
          {modeModification
            ? "Modifier un tournoi"
            : "Ajouter un tournoi"}
        </h2>

        <form
          onSubmit={soumettre}
        >
          <div className="config-section">
            <label htmlFor="nom-tournoi">
              Nom du tournoi
            </label>

            <input
              id="nom-tournoi"
              name="nom"
              type="text"
              value={tournoi.nom}
              onChange={
                modifierChamp
              }
              autoFocus
            />
          </div>

          <div className="config-section">
            <label htmlFor="date-debut-tournoi">
              Date de début
            </label>

            <input
              id="date-debut-tournoi"
              name="dateDebut"
              type="date"
              value={
                tournoi.dateDebut
              }
              onChange={
                modifierChamp
              }
            />
          </div>

          <div className="config-section">
            <label htmlFor="date-fin-tournoi">
              Date de fin
            </label>

            <input
              id="date-fin-tournoi"
              name="dateFin"
              type="date"
              value={
                tournoi.dateFin
              }
              onChange={
                modifierChamp
              }
            />
          </div>

          <div className="config-section">
            <label>
              <input
                type="checkbox"
                name="actif"
                checked={
                  tournoi.actif !==
                  false
                }
                onChange={
                  modifierChamp
                }
              />
              Actif
            </label>
          </div>

          <div className="modal-actions">
            <button
              type="submit"
            >
              {modeModification
                ? "Enregistrer les modifications"
                : "Ajouter le tournoi"}
            </button>

            <button
              type="button"
              className="cancel-button"
              onClick={fermer}
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TournoiModal;