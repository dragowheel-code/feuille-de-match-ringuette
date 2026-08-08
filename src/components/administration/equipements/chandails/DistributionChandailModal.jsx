import { useState } from "react";

function DistributionChandailModal({
  ouverte,
  fermer,
  enregistrer,

  ensemble,

  saisons = [],
  joueuses = [],

  formulaire,
  setFormulaire,

  erreurs = [],
}) {
  const [recherche, setRecherche] =
    useState("");

  if (!ouverte) {
    return null;
  }

  const texteRecherche =
    recherche.trim().toLowerCase();

  const joueusesFiltrees =
    joueuses.filter((joueuse) =>
      joueuse.label
        .toLowerCase()
        .includes(texteRecherche)
    );

  function modifierChamp(
    champ,
    valeur
  ) {
    setFormulaire((precedent) => ({
      ...precedent,
      [champ]: valeur,
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
          <div>
            <h2>
              Distribution de
              l'ensemble #
              {ensemble?.numero ?? ""}
            </h2>

            <p>
              Saison active :
              {" "}
              <strong>
                {saisons[0]?.nom ??
                  "Aucune"}
              </strong>
            </p>

            <p>
              {
                joueusesFiltrees.length
              }{" "}
              joueuse
              {joueusesFiltrees.length >
              1
                ? "s"
                : ""}{" "}
              disponible
              {joueusesFiltrees.length >
              1
                ? "s"
                : ""}
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

          <div className="champ-formulaire">
            <label>
              Rechercher une
              joueuse
            </label>

            <input
              type="search"
              placeholder="Nom de la joueuse..."
              value={recherche}
              onChange={(event) =>
                setRecherche(
                  event.target.value
                )
              }
            />
          </div>

          <div className="champ-formulaire">
            <label>Joueuse</label>

            <select
              value={
                formulaire.joueuseId
              }
              onChange={(event) =>
                modifierChamp(
                  "joueuseId",
                  event.target.value
                )
              }
            >
              <option value="">
                Sélectionner une
                joueuse...
              </option>

              {joueusesFiltrees.map(
                (option) => (
                  <option
                    key={
                      option.value
                    }
                    value={
                      option.value
                    }
                  >
                    {option.label}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="champ-formulaire">
            <label>
              Commentaire
            </label>

            <textarea
              rows={4}
              value={
                formulaire.commentaire
              }
              onChange={(event) =>
                modifierChamp(
                  "commentaire",
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
              disabled={
                !formulaire.joueuseId
              }
            >
              Distribuer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DistributionChandailModal;