function PersonnelEquipeModal({
  ouverte,
  fermer,
  enregistrer,

  formulaire,
  setFormulaire,

  personnel,
  erreurs = [],
}) {
  if (!ouverte) {
    return null;
  }

  function modifierChamp(
    champ,
    valeur
  ) {
    setFormulaire((precedent) => ({
      ...precedent,
      [champ]: valeur,
    }));
  }

  function modifierPnce(
    champ,
    valeur
  ) {
    setFormulaire((precedent) => ({
      ...precedent,

      pnce: {
        ...precedent.pnce,
        [champ]: valeur,
      },
    }));
  }

  function soumettre(event) {
    event.preventDefault();
    enregistrer(formulaire);
  }

  return (
    <div className="modal-overlay">
      <div className="modal-contenu">
        <header className="modal-entete">
          <h2>
            {personnel
              ? "Modifier un membre du personnel"
              : "Ajouter un membre du personnel"}
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
            <div className="liste-erreurs">
              {erreurs.map((erreur) => (
                <p key={erreur}>
                  {erreur}
                </p>
              ))}
            </div>
          )}

          <div className="champ-formulaire">
            <label>
              Nom complet
            </label>

            <input
              type="text"
              value={
                formulaire.nomComplet
              }
              onChange={(event) =>
                modifierChamp(
                  "nomComplet",
                  event.target.value
                )
              }
            />
          </div>

          <div className="champ-formulaire">
            <label>
              Courriel
            </label>

            <input
              type="email"
              value={
                formulaire.courriel
              }
              onChange={(event) =>
                modifierChamp(
                  "courriel",
                  event.target.value
                )
              }
            />
          </div>

          <div className="champ-formulaire">
            <label>
              Téléphone
            </label>

            <input
              type="text"
              value={
                formulaire.telephone
              }
              onChange={(event) =>
                modifierChamp(
                  "telephone",
                  event.target.value
                )
              }
            />
          </div>

          <div className="champ-formulaire">
            <label>
              Numéro PNCE
            </label>

            <input
              type="text"
              value={
                formulaire.pnce.numero
              }
              onChange={(event) =>
                modifierPnce(
                  "numero",
                  event.target.value
                )
              }
            />
          </div>

          <fieldset>
            <legend>
              Certifications PNCE
            </legend>

            <label>
              <input
                type="checkbox"
                checked={
                  formulaire.pnce
                    .introduction
                }
                onChange={(event) =>
                  modifierPnce(
                    "introduction",
                    event.target.checked
                  )
                }
              />

              Introduction
            </label>

            <label>
              <input
                type="checkbox"
                checked={
                  formulaire.pnce
                    .ethiqueSportive
                }
                onChange={(event) =>
                  modifierPnce(
                    "ethiqueSportive",
                    event.target.checked
                  )
                }
              />

              Éthique sportive
            </label>

            <label>
              <input
                type="checkbox"
                checked={
                  formulaire.pnce
                    .competition
                }
                onChange={(event) =>
                  modifierPnce(
                    "competition",
                    event.target.checked
                  )
                }
              />

              Compétition
            </label>
          </fieldset>

          <div className="champ-formulaire">
            <label>
              <input
                type="checkbox"
                checked={
                  formulaire.actif
                }
                onChange={(event) =>
                  modifierChamp(
                    "actif",
                    event.target.checked
                  )
                }
              />

              Actif
            </label>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              onClick={fermer}
            >
              Annuler
            </button>

            <button type="submit">
              {personnel
                ? "Enregistrer"
                : "Ajouter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PersonnelEquipeModal;