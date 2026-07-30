function EquipeModal({
  ouverte,
  fermer,
  enregistrer,
  formulaire,
  setFormulaire,
  equipe = null,
  associations = [],
  erreurs = [],
}) {
  if (!ouverte) {
    return null;
  }

  function changerChamp(evenement) {
    const { name, value } = evenement.target;

    setFormulaire((precedent) => ({
      ...precedent,
      [name]: value,
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
          {equipe
            ? "Modifier l'équipe"
            : "Nouvelle équipe"}
        </h2>

        {erreurs.length > 0 && (
          <div className="equipe-erreurs">
            {erreurs.map((erreur) => (
              <p key={erreur}>{erreur}</p>
            ))}
          </div>
        )}

        <form onSubmit={soumettre}>
          <label>
            Association
            <select
              name="associationId"
              value={formulaire.associationId}
              onChange={changerChamp}
            >
              <option value="">
                Sélectionner une association
              </option>

              {associations.map((association) => (
                <option
                  key={association.id}
                  value={association.id}
                >
                  {association.nom}
                </option>
              ))}
            </select>
          </label>

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
            Abréviation
            <input
              type="text"
              name="abreviation"
              value={formulaire.abreviation}
              onChange={changerChamp}
            />
          </label>

          <label>
            Calibre
            <input
              type="text"
              name="calibre"
              value={formulaire.calibre}
              onChange={changerChamp}
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
              {equipe ? "Enregistrer" : "Créer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EquipeModal;