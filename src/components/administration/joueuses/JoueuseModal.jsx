function JoueuseModal({
  ouverte,
  fermer,
  enregistrer,
  formulaire,
  setFormulaire,
  joueuse = null,
  associations = [],
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

    setFormulaire(
      (precedent) => ({
        ...precedent,
        [name]:
          type === "checkbox"
            ? checked
            : value,
      })
    );
  }

  function soumettre(evenement) {
    evenement.preventDefault();
    enregistrer(formulaire);
  }

  return (
    <div className="modal-overlay">
      <div className="modal-contenu">
        <h2>
          {joueuse
            ? "Modifier la joueuse"
            : "Nouvelle joueuse"}
        </h2>

        {erreurs.length > 0 && (
          <div className="joueuse-erreurs">
            {erreurs.map(
              (erreur) => (
                <p key={erreur}>
                  {erreur}
                </p>
              )
            )}
          </div>
        )}

        <form onSubmit={soumettre}>
          <label>
            Association

            <select
              name="associationId"
              value={
                formulaire.associationId
              }
              onChange={changerChamp}
            >
              <option value="">
                Sélectionner une association
              </option>

              {associations.map(
                (association) => (
                  <option
                    key={association.id}
                    value={association.id}
                  >
                    {association.nom}
                  </option>
                )
              )}
            </select>
          </label>

          <label>
            Nom complet

            <input
              type="text"
              name="nomComplet"
              value={
                formulaire.nomComplet
              }
              onChange={changerChamp}
            />
          </label>

          <label>
            Numéro d'inscription

            <input
              type="text"
              name="numeroInscription"
              value={
                formulaire.numeroInscription
              }
              onChange={changerChamp}
            />
          </label>

          <label>
            Adresse

            <input
              type="text"
              name="adresse"
              value={
                formulaire.adresse
              }
              onChange={changerChamp}
            />
          </label>

          <label>
            Ville

            <input
              type="text"
              name="ville"
              value={
                formulaire.ville
              }
              onChange={changerChamp}
            />
          </label>

          <label>
            Code postal

            <input
              type="text"
              name="codePostal"
              value={
                formulaire.codePostal
              }
              onChange={changerChamp}
            />
          </label>

          <label>
            Téléphone

            <input
              type="text"
              name="telephone"
              value={
                formulaire.telephone
              }
              onChange={changerChamp}
            />
          </label>

          <label>
            Sexe

            <select
              name="sexe"
              value={
                formulaire.sexe
              }
              onChange={changerChamp}
            >
              <option value="">
                Sélectionner
              </option>

              <option value="F">
                Féminin
              </option>

              <option value="M">
                Masculin
              </option>

              <option value="MIXTE">
                Mixte
              </option>
            </select>
          </label>

          <label>
            Date de naissance

            <input
              type="date"
              name="dateNaissance"
              value={
                formulaire.dateNaissance
              }
              onChange={changerChamp}
            />
          </label>

          <label>
            <input
              type="checkbox"
              name="active"
              checked={
                Boolean(
                  formulaire.active
                )
              }
              onChange={changerChamp}
            />

            Joueuse active
          </label>

          <div className="modal-actions">
            <button
              type="button"
              onClick={fermer}
            >
              Annuler
            </button>

            <button type="submit">
              {joueuse
                ? "Enregistrer"
                : "Créer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JoueuseModal;