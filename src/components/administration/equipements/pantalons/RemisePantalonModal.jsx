function RemisePantalonModal({
  ouverte,
  fermer,

  formulaire,
  setFormulaire,

  enregistrer,
  erreurs = [],

  joueuses = [],
  pantalons = [],
}) {
  if (!ouverte) {
    return null;
  }

  function modifierChamp(
    champ,
    valeur
  ) {
    setFormulaire(
      (precedent) => ({
        ...precedent,
        [champ]: valeur,
      })
    );
  }

  function soumettre(
    evenement
  ) {
    evenement.preventDefault();

    enregistrer(formulaire);
  }

  const joueusesDisponibles = [
    ...joueuses,
  ].sort((a, b) =>
    String(
      a.nomComplet || ""
    ).localeCompare(
      String(
        b.nomComplet || ""
      ),
      "fr-CA"
    )
  );

  return (
    <div className="modal-overlay">
      <div className="modal-contenu">
        <header className="modal-entete">
          <h2>
            Remettre un pantalon
          </h2>

          <button
            type="button"
            onClick={fermer}
          >
            ×
          </button>
        </header>

        <form onSubmit={soumettre}>
          {erreurs.length > 0 && (
            <div className="administration-message-erreur">
              {erreurs.map(
                (erreur) => (
                  <p key={erreur}>
                    {erreur}
                  </p>
                )
              )}
            </div>
          )}

          <label>
            Joueuse

            <select
              value={
                formulaire.joueuseId
              }
              onChange={(
                evenement
              ) =>
                modifierChamp(
                  "joueuseId",
                  evenement.target.value
                )
              }
            >
              <option value="">
                Sélectionner une joueuse
              </option>

              {joueusesDisponibles.map(
                (joueuse) => (
                  <option
                    key={joueuse.id}
                    value={joueuse.id}
                  >
                    {joueuse.nomComplet}
                  </option>
                )
              )}
            </select>
          </label>

          <label>
            Taille

            <select
              value={
                formulaire.pantalonId
              }
              onChange={(
                evenement
              ) =>
                modifierChamp(
                  "pantalonId",
                  evenement.target.value
                )
              }
            >
              <option value="">
                Sélectionner une taille
              </option>

              {pantalons
                .filter(
                  (pantalon) =>
                    pantalon.actif !==
                      false &&
                    Number(
                      pantalon
                        .quantiteStock ||
                        0
                    ) > 0
                )
                .map(
                  (pantalon) => (
                    <option
                      key={pantalon.id}
                      value={pantalon.id}
                    >
                      {pantalon.taille} —
                      stock{" "}
                      {
                        pantalon.quantiteStock
                      }
                    </option>
                  )
                )}
            </select>
          </label>

          <label>
            Quantité

            <input
              type="number"
              min="1"
              step="1"
              value={
                formulaire.quantite
              }
              onChange={(
                evenement
              ) =>
                modifierChamp(
                  "quantite",
                  evenement.target.value
                )
              }
            />
          </label>

          <label>
            Date de remise

            <input
              type="date"
              value={
                formulaire.dateRemise
              }
              onChange={(
                evenement
              ) =>
                modifierChamp(
                  "dateRemise",
                  evenement.target.value
                )
              }
            />
          </label>

          <label>
            <input
              type="checkbox"
              checked={
                Boolean(
                  formulaire.remplacement
                )
              }
              onChange={(
                evenement
              ) =>
                modifierChamp(
                  "remplacement",
                  evenement.target.checked
                )
              }
            />

            Remplacement
          </label>

          <label>
            Commentaire

            <textarea
              value={
                formulaire.commentaire
              }
              onChange={(
                evenement
              ) =>
                modifierChamp(
                  "commentaire",
                  evenement.target.value
                )
              }
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
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RemisePantalonModal;