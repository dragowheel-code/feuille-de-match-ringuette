import { PERIODES } from "../constants/periodes";
import { DUREES_PERIODE } from "../constants/dureesPeriode";
export default function Scoreboard({
  matchInfo,
  scoreLocal,
  scoreVisiteur,
  periode,
  setPeriode,
  dureePeriode,
  setDureePeriode,
  ouvrirFenetreBut,
  retirerDernierBut,
}) {
  return (
    <section className="scoreboard">
      <div className="team-card">
        <h2>{matchInfo.equipeLocale || "Équipe locale"}</h2>
        <div className="score">{scoreLocal}</div>
        <button onClick={() => ouvrirFenetreBut("Local")}>+ But local</button>
        <button onClick={() => retirerDernierBut("Local")}>- But local</button>
      </div>

      <div className="period-card">
        <label>Période</label>
        <select
  value={periode}
  onChange={(e) => setPeriode(e.target.value)}
>
  {PERIODES.map((periodeOption) => (
    <option
      key={periodeOption.valeur}
      value={periodeOption.valeur}
    >
      {periodeOption.libelle}
    </option>
  ))}
</select>

        <label>Durée</label>
        <select
          value={dureePeriode}
          onChange={(e) => setDureePeriode(Number(e.target.value))}
        >
          {DUREES_PERIODE.map((duree) => (
  <option key={duree} value={duree}>
    {duree} min
  </option>
))}
        </select>
      </div>

      <div className="team-card">
        <h2>{matchInfo.equipeVisiteuse || "Équipe visiteuse"}</h2>
        <div className="score">{scoreVisiteur}</div>
        <button onClick={() => ouvrirFenetreBut("Visiteur")}>
          + But visiteur
        </button>
        <button onClick={() => retirerDernierBut("Visiteur")}>
          - But visiteur
        </button>
      </div>
    </section>
  );
}