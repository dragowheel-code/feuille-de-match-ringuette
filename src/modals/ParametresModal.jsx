import { APP_INFO } from "../constants/version";
export default function ParametresModal({
  ouverte,
  fermer,
  ouvrirImportExcel,
  ouvrirListeOfficiels,
  ouvrirSuppressionEquipe,
  ouvrirSuppressionOfficiel,
  ouvrirSuppressionJoueuse,
  exporterBase,
  importerBase,
  effacerSauvegarde,
}) {
  if (!ouverte) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal config-modal">
        <h2>Paramètres</h2>
        <div className="app-version">
  <strong>{APP_INFO.nom}</strong>

  <div>Version {APP_INFO.version}</div>

  <div>Build {APP_INFO.build}</div>

  <div>{APP_INFO.statut}</div>
</div>

        <div className="config-section">
          <h3>Importation</h3>

          <button onClick={ouvrirImportExcel}>
            Importer Excel
          </button>
        </div>

        <div className="config-section">
          <h3>Base de données</h3>

          <label className="import-button">
            Importer une base de données
            <input
              type="file"
              accept=".json"
              onChange={importerBase}
              hidden
            />
          </label>

          <button onClick={exporterBase}>
            Exporter la base de données
          </button>
        </div>

        <div className="config-section">
          <h3>Officiels</h3>

          <button onClick={ouvrirListeOfficiels}>
  Voir les officiels
</button>

<button onClick={ouvrirSuppressionOfficiel}>
  Supprimer un officiel
</button>
        </div>

        <div className="config-section">
          <h3>Application</h3>

          <button onClick={ouvrirSuppressionJoueuse}>
  Supprimer une joueuse
</button>
<button onClick={ouvrirSuppressionEquipe}>
  Supprimer une équipe
</button>
          <button
            className="delete-button"
            onClick={effacerSauvegarde}
          >
            Effacer les données sauvegardées
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