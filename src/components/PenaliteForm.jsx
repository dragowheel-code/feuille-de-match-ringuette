import { PENALITES } from "../constants/penalites";

export default function PenaliteForm({
  titre,
  penalite,
  onChange,
 }) {
  return (
    <div className="penalite-form">
      <h3>{titre}</h3>

      <label>Type de pénalité</label>

      <select
        value={penalite.type}
        onChange={(e) => {
          const valeur = e.target.value;

          const definitionPenalite = PENALITES.find(
            (element) => element.valeur === valeur
          );

          onChange({
            ...penalite,
            type: valeur,
            duree: definitionPenalite
  ? Number(definitionPenalite.dureeParDefaut)
  : penalite.duree,
          });
        }}
      >
        <option value="">
          Choisir une pénalité
        </option>

        {PENALITES.map((definitionPenalite) => (
          <option
            key={definitionPenalite.valeur}
            value={definitionPenalite.valeur}
          >
            {definitionPenalite.valeur}
          </option>
        ))}
      </select>

      <label>Durée</label>

      <select
        value={penalite.duree}
        onChange={(e) =>
          onChange({
            ...penalite,
            duree: Number(e.target.value),
          })
        }
      >
        <option value={0}>Aucune durée</option>
        <option value={2}>2 min</option>
        <option value={4}>4 min</option>
        <option value={5}>5 min</option>
        <option value={10}>10 min</option>
      </select>
    </div>
  );
}