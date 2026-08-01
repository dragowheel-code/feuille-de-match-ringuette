function SaisonModal({
  ouverte,
  fermer,
  enregistrer,
  formulaire,
  setFormulaire,
  saison = null,
  erreurs = [],
}) {
  if (!ouverte) {
    return null;
  }

  function changerChamp(evenement) {
    const {
      name,
      value,
      type,
      checked,
    } = evenement.target;

    setFormulaire((precedent) => ({
      ...precedent,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  }

  function soumettre(evenement) {
    evenement.preventDefault();
    enregistrer(formulaire);
  }

  return (
    <div className="modal-overlay">
      <div className="modal-contenu">
        <h2>
          {saison
            ? "Modifier la saison"
            : "Nouvelle saison"}
        </h2>

        {erreurs.length > 0 && (
          <div className="saison-erreurs">
            {erreurs.map((erreur) => (
              <p key={erreur}>{erreur}</p>
            ))}
          </div>
        )}

        <form onSubmit={soumettre}>
          <label>
            Nom
            <input
              type="text"
              name="nom"
              value={formulaire.nom}
              onChange={changerChamp}
            />
          </label>

          <label>
            Date de début
            <input
              type="date"
              name="dateDebut"
              value={formulaire.dateDebut}
              onChange={changerChamp}
            />
          </label>

          <label>
            Date de fin
            <input
              type="date"
              name="dateFin"
              value={formulaire.dateFin}
              onChange={changerChamp}
            />
          </label>

          <label>
            <input
              type="checkbox"
              name="active"
              checked={Boolean(formulaire.active)}
              onChange={changerChamp}
            />
            Saison active
          </label>

          <label>
            <input
              type="checkbox"
              name="verrouillee"
              checked={Boolean(formulaire.verrouillee)}
              onChange={changerChamp}
            />
            Saison verrouillée
          </label>

          <label>
            Notes
            <textarea
              name="notes"
              value={formulaire.notes}
              onChange={changerChamp}
              rows={4}
            />
          </label>

          <div className="modal-actions">
            <button
              type="button"
              onClick={fermer}
            >
              Annuler
            </button>

            <button type="submit">
              {saison
                ? "Enregistrer"
                : "Créer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SaisonModal;