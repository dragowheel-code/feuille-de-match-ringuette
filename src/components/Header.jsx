export default function Header({
  appInfo,
  matchInfo,
  ouvrirParametres,
}) {
  return (
    <header className="header">
      <h1>{appInfo.nom}</h1>

      <p>Centre de Contrôle</p>

      <p>
        Partie #{matchInfo.numeroPartie || "---"} —{" "}
        {matchInfo.date || "Date à déterminer"} —{" "}
        {matchInfo.calibre}
      </p>

      <button
        className="settings-button"
        onClick={ouvrirParametres}
        aria-label="Ouvrir les paramètres"
        title="Paramètres"
      >
        <span aria-hidden="true">⚙️</span>
      </button>
    </header>
  );
}