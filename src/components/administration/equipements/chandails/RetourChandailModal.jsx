function RetourChandailModal({
  ouverte,
  fermer,
  confirmer,

  ensemble,
  joueuse,

  formulaire,
  setFormulaire,

  erreurs = [],
}) {
  if (!ouverte) {
    return null;
  }

  function modifierChamp(
    section,
    champ,
    valeur
  ) {
    setFormulaire((precedent) => ({
      ...precedent,

      [section]: {
        ...precedent[section],
        [champ]: valeur,
      },
    }));
  }

  function modifierCommentaire(
    valeur
  ) {
    setFormulaire((precedent) => ({
      ...precedent,
      commentaire: valeur,
    }));
  }

  function soumettre(event) {
    event.preventDefault();

    confirmer(formulaire);
  }

  return (
    <div className="modal-overlay">
      <div className="modal-contenu">
        <header className="modal-entete">
          <div>
            <h2>
              Retour de l'ensemble #
              {ensemble?.numero ?? ""}
            </h2>

            <p>
              <strong>
                {joueuse?.nomComplet ??
                  "Joueuse inconnue"}
              </strong>
            </p>
          </div>

          <button
            type="button"
            onClick={fermer}
          >
            ×
          </button>
        </header>

        <form onSubmit={soumettre}>
          {erreurs.length > 0 && (
            <div className="liste-erreurs">
              {erreurs.map((erreur) => (
                <p key={erreur}>
                  {erreur}
                </p>
              ))}
            </div>
          )}

          <section className="retour-chandail-section">
            <h3>
              Chandail clair
            </h3>

            <label>
              État
            </label>

            <select
              value={
                formulaire.clair.etat
              }
              onChange={(event) =>
                modifierChamp(
                  "clair",
                  "etat",
                  event.target.value
                )
              }
            >
              <option value="Bon">
                Bon
              </option>

              <option value="Réparation">
                Réparation
              </option>

              <option value="Perdu">
                Perdu
              </option>

              <option value="Retiré">
                Retiré
              </option>
            </select>

            <label>
              Notes
            </label>

            <textarea
              rows={3}
              value={
                formulaire.clair.notes
              }
              onChange={(event) =>
                modifierChamp(
                  "clair",
                  "notes",
                  event.target.value
                )
              }
            />
          </section>

          <section className="retour-chandail-section">
            <h3>
              Chandail foncé
            </h3>

            <label>
              État
            </label>

            <select
              value={
                formulaire.fonce.etat
              }
              onChange={(event) =>
                modifierChamp(
                  "fonce",
                  "etat",
                  event.target.value
                )
              }
            >
              <option value="Bon">
                Bon
              </option>

              <option value="Réparation">
                Réparation
              </option>

              <option value="Perdu">
                Perdu
              </option>

              <option value="Retiré">
                Retiré
              </option>
            </select>

            <label>
              Notes
            </label>

            <textarea
              rows={3}
              value={
                formulaire.fonce.notes
              }
              onChange={(event) =>
                modifierChamp(
                  "fonce",
                  "notes",
                  event.target.value
                )
              }
            />
          </section>

          <div className="champ-formulaire">
            <label>
              Commentaire général
            </label>

            <textarea
              rows={4}
              value={
                formulaire.commentaire
              }
              onChange={(event) =>
                modifierCommentaire(
                  event.target.value
                )
              }
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              onClick={fermer}
            >
              Annuler
            </button>

            <button
              type="submit"
            >
              Confirmer le retour
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RetourChandailModal;