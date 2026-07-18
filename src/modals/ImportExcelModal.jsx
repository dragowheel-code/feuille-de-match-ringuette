export default function ImportExcelModal({
  ouverte,
  fermer,
  importerAlignementTournoi,
  importerEquipes,
  importerJoueuses,
  importerOfficiels,
}) {
  if (!ouverte) return null;

  return (
    <div className="modal-backdrop import-modal-backdrop">
      <div className="modal config-modal">
        <h2>Importer Excel</h2>

        <div className="config-section">
          <h3>Import principal</h3>

          <label className="import-button">
            Importer alignement tournoi
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={importerAlignementTournoi}
              hidden
            />
          </label>
        </div>

        <div className="config-section">
          <h3>Import avancé</h3>

          <label className="import-button">
            Importer équipes seulement
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={importerEquipes}
              hidden
            />
          </label>

          <label className="import-button">
            Importer joueuses seulement
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={importerJoueuses}
              hidden
            />
          </label>

          <label className="import-button">
            Importer officiels
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={importerOfficiels}
              hidden
            />
          </label>
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