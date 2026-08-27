import { APP_INFO } from "../constants/version";

export default function ParametresModal({
  ouverte,
  fermer,
  effacerSauvegarde,
}) {
  if (!ouverte) {
    return null;
  }

  function ouvrirAdministration() {
    fermer();
    window.location.hash =
      "/administration";
  }

  return (
    <div className="modal-backdrop">
      <div className="modal config-modal">
        <h2>Paramètres</h2>

        <div className="app-version">
          <strong>
            {APP_INFO.nom}
          </strong>

          <div>
            Version {APP_INFO.version}
          </div>

          <div>
            Build {APP_INFO.build}
          </div>

          <div>
            {APP_INFO.statut}
          </div>
        </div>

        <div className="config-section">
          <h3>Partie en cours</h3>

          <button
            className="delete-button"
            onClick={effacerSauvegarde}
          >
            Effacer les données sauvegardées
          </button>
        </div>

        <div className="config-section">
          <h3>Administration</h3>

          <p>
            Accéder au module
            d'administration de la
            plateforme.
          </p>

          <button
            type="button"
            onClick={ouvrirAdministration}
          >
            Ouvrir l'administration
          </button>
        </div>

        <div className="modal-actions">
          <button
            className="cancel-button"
            onClick={fermer}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}