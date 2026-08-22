import {
  TAILLES_PANTALON,
} from "../../../../domain/equipements";

function PantalonsModal({
  ouverte,
  fermer,
  enregistrer,
  formulaire,
  setFormulaire,
  pantalon,
  erreurs = [],
}) {
  function modifierChamp(
    champ,
    valeur
  ) {
    setFormulaire(
      (formulaireActuel) => ({
        ...formulaireActuel,
        [champ]: valeur,
      })
    );
  }

  function soumettreFormulaire(
    evenement
  ) {
    evenement.preventDefault();

    enregistrer(formulaire);
  }

  if (!ouverte) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-contenu">
        <header className="modal-entete">
          <h2>
            {pantalon
              ? "Modifier l'inventaire"
              : "Ajouter une taille"}
          </h2>

          <button
            type="button"
            onClick={fermer}
          >
            ×
          </button>
        </header>

        <form
          onSubmit={
            soumettreFormulaire
          }
        >
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
            Taille

            <select
              value={
                formulaire.taille
              }
              onChange={(
                evenement
              ) =>
                modifierChamp(
                  "taille",
                  evenement.target
                    .value
                )
              }
            >
              <option value="">
                Sélectionner une
                taille
              </option>

              {TAILLES_PANTALON.map(
                (taille) => (
                  <option
                    key={taille}
                    value={taille}
                  >
                    {taille}
                  </option>
                )
              )}
            </select>
          </label>

          <label>
            Quantité en stock

            <input
              type="number"
              min="0"
              step="1"
              value={
                formulaire
                  .quantiteStock
              }
              onChange={(
                evenement
              ) =>
                modifierChamp(
                  "quantiteStock",
                  evenement.target
                    .value
                )
              }
            />
          </label>

          <label>
            <input
              type="checkbox"
              checked={
                Boolean(
                  formulaire.actif
                )
              }
              onChange={(
                evenement
              ) =>
                modifierChamp(
                  "actif",
                  evenement.target
                    .checked
                )
              }
            />

            Taille active
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

export default PantalonsModal;