export default function GameClock({
  obtenirHeureActuelle,
  heureDebut,
  heureFin,
  enregistrerHeureDebut,
  enregistrerHeureFin,
}) {
  return (
    <section className="game-clock">
      <div>
        <strong>Heure actuelle</strong>
        <div className="digital-clock">{obtenirHeureActuelle()}</div>
      </div>

      <div>
        <button onClick={enregistrerHeureDebut}>Début</button>
        <button onClick={enregistrerHeureFin}>Fin</button>
      </div>

      <div>
        Début : <strong>{heureDebut || "--:--"}</strong>
        {" | "}
        Fin : <strong>{heureFin || "--:--"}</strong>
      </div>
    </section>
  );
}