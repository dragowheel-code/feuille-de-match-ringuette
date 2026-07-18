export default function Actions({
  ouvrirConfiguration,
  nouvellePartie,
  ouvrirFenetrePunition,
  ouvrirFenetreTempsMort,
  ouvrirFenetreGardienne,
  ouvrirFenetreTirBarrage,
  exporterPDF,
  envoyerPDF,
}) {
  return (
    <section className="actions">
      <button onClick={ouvrirConfiguration}>
        Configuration du match
      </button>

      <button onClick={nouvellePartie}>
        Nouvelle partie
      </button>

      <button onClick={ouvrirFenetrePunition}>
        Ajouter une punition
      </button>

      <button onClick={ouvrirFenetreTempsMort}>
        Temps mort
      </button>

      <button onClick={ouvrirFenetreGardienne}>
        Changement de gardienne
      </button>

      <button onClick={ouvrirFenetreTirBarrage}>
        Tir de barrage
      </button>

      <button onClick={exporterPDF}>
        Exporter PDF
      </button>

      <button onClick={envoyerPDF}>
        Envoyer PDF
      </button>
    </section>
  );
}