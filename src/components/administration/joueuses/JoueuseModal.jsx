function JoueuseModal({
  ouverte,
  fermer,
  enregistrer,
  formulaire,
  setFormulaire,
  joueuse = null,
  associations = [],
  equipes = [],
  erreurs = [],
}) {
  if (!ouverte) {
    return null;
  }

  const equipesDisponibles = equipes.filter(
    (equipe) =>
      equipe.associationId ===
      formulaire.associationId
  );

  function changerChamp(evenement) {
    const { name, value } = evenement.target;

    setFormulaire((precedent) => {
      if (name === "associationId") {
        return {
          ...precedent,
          associationId: value,
          equipeId: "",
        };
      }

      return {
        ...precedent,
        [name]: value,
      };
    });
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
            Équipe
            <select
              name="equipeId"
              value={formulaire.equipeId}
              onChange={changerChamp}
              disabled={!formulaire.associationId}
            >
              <option value="">
                Sélectionner une équipe
              </option>

              {equipesDisponibles.map((equipe) => (
                <option
                  key={equipe.id}
                  value={equipe.id}
                >
                  {equipe.nom} — {equipe.calibre}
                </option>
              ))}
            </select>
          </label>

          <label>
            Nom complet
            <input
              type="text"
              name="nomComplet"
              value={formulaire.nomComplet}
              onChange={changerChamp}
            />
          </label>

          <label>
            Numéro d'inscription
            <input
              type="text"
              name="numeroInscription"
              value={formulaire.numeroInscription}
              onChange={changerChamp}
            />
          </label>

          <label>
            Adresse
            <input
              type="text"
              name="adresse"
              value={formulaire.adresse}
              onChange={changerChamp}
            />
          </label>

          <label>
            Ville
            <input
              type="text"
              name="ville"
              value={formulaire.ville}
              onChange={changerChamp}
            />
          </label>

          <label>
            Code postal
            <input
              type="text"
              name="codePostal"
              value={formulaire.codePostal}
              onChange={changerChamp}
            />
          </label>

          <label>
            Téléphone
            <input
              type="text"
              name="telephone"
              value={formulaire.telephone}
              onChange={changerChamp}
            />
          </label>

          <label>
            Sexe
            <input
              type="text"
              name="sexe"
              value={formulaire.sexe}
              onChange={changerChamp}
            />
          </label>

          <label>
            Date de naissance
            <input
              type="text"
              name="dateNaissance"
              value={formulaire.dateNaissance}
              onChange={changerChamp}
            />
          </label>

          <label>
            Âge
            <input
              type="text"
              name="age"
              value={formulaire.age}
              onChange={changerChamp}
            />
          </label>

          <label>
            Catégorie
            <input
              type="text"
              name="categorie"
              value={formulaire.categorie}
              onChange={changerChamp}
            />
          </label>

          <label>
            Code de catégorie
            <input
              type="text"
              name="codeCategorie"
              value={formulaire.codeCategorie}
              onChange={changerChamp}
            />
          </label>

          <label>
            Saison
            <input
              type="text"
              name="saison"
              value={formulaire.saison}
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
              {joueuse ? "Enregistrer" : "Créer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JoueuseModal;