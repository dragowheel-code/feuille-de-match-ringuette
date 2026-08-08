import {
  ETATS_PANTALON,
  TAILLES_PANTALON,
} from "../../../../domain/equipements";

function PantalonsModal({
  ouverte,
  fermer,
  enregistrer,
  formulaire,
  setFormulaire,
  ensemble,
  erreurs,
}) {

function modifierChamp(champ, valeur) {
  setFormulaire((formulaireActuel) => ({
    ...formulaireActuel,
    [champ]: valeur,
  }));
}

function modifierPantalons(
  type,
  champ,
  valeur
) {
  setFormulaire((formulaireActuel) => ({
    ...formulaireActuel,

    [type]: {
      ...formulaireActuel[type],
      [champ]: valeur,
    },
  }));
}

function soumettreFormulaire(evenement) {
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
          {ensemble
            ? "Modifier l’ensemble"
            : "Nouvel ensemble"}
        </h2>

        <button
          type="button"
          onClick={fermer}
        >
          ×
        </button>
      </header>

      <form onSubmit={soumettreFormulaire}>
        {erreurs.length > 0 && (
          <div className="administration-message-erreur">
            {erreurs.map((erreur) => (
              <p key={erreur}>{erreur}</p>
            ))}
          </div>
        )}

        <label>
          Numéro

          <input
            type="text"
            value={formulaire.numero}
            onChange={(evenement) =>
              modifierChamp(
                "numero",
                evenement.target.value
              )
            }
          />
        </label>

        <label>
          Taille

          <select
            value={formulaire.taille}
            onChange={(evenement) =>
              modifierChamp(
                "taille",
                evenement.target.value
              )
            }
          >
            <option value="">
              Sélectionner une taille
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

        <fieldset>
          <legend>Pantalon</legend>

          <label>
            État

            <select
              value={formulaire.etat}
              onChange={(evenement) =>
                modifierPantalons(
                  "etat",
                  evenement.target.value
                )
              }
            >
              {ETATS_PANTALON.map((etat) => (
                <option
                  key={etat}
                  value={etat}
                >
                  {etat}
                </option>
              ))}
            </select>
          </label>

          <label>
            Notes

            <textarea
              value={formulaire.notes}
              onChange={(evenement) =>
                modifierPantalons(
                  "notes",
                  evenement.target.value
                )
              }
            />
          </label>
        </fieldset>

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