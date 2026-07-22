import PenaliteForm from "../components/PenaliteForm";

export default function PunitionModal({
  ouverte,
  equipePunition,
  setEquipePunition,
  matchInfo,
  penalites,
  setPenalites,
  tempsPunitionTableau,
  setTempsPunitionTableau,
  tempsCorrige,
  joueusePunition,
  setJoueusePunition,
  joueusePurgeePar,
  setJoueusePurgeePar,
  joueusesPunitionDisponibles,
  nombrePenalites,
  setNombrePenalites,
  confirmerPunition,
  fermer,
}) {

  if (!ouverte) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Ajouter une punition</h2>

        <label>Équipe</label>
        <select
          value={equipePunition}
          onChange={(e) => {
            setEquipePunition(e.target.value);
            setJoueusePunition("");
          }}
        >
          <option value="Local">
            {matchInfo.equipeLocale || "Local"}
          </option>

          <option value="Visiteur">
            {matchInfo.equipeVisiteuse || "Visiteur"}
          </option>
        </select>

        <label>Temps affiché au tableau</label>
        <input
          value={tempsPunitionTableau}
          onChange={(e) => setTempsPunitionTableau(e.target.value)}
          placeholder="Exemple : 08:32"
        />

        <p>
          Temps corrigé :{" "}
          <strong>{tempsCorrige || "--:--"}</strong>
        </p>

        <label>Joueuse punie</label>
        <select
          value={joueusePunition}
          onChange={(e) => setJoueusePunition(e.target.value)}
        >
          <option value="">Choisir une joueuse</option>

          {joueusesPunitionDisponibles.map((joueuse) => (
            <option key={joueuse.id} value={joueuse.numero}>
              #{joueuse.numero} — {joueuse.nom}
            </option>
          ))}
        </select>

        <label>Purgée par</label>
        <select
          value={joueusePurgeePar}
          onChange={(e) => setJoueusePurgeePar(e.target.value)}
        >
          <option value="">Même joueuse / aucune</option>

          {joueusesPunitionDisponibles.map((joueuse) => (
            <option key={joueuse.id} value={joueuse.numero}>
              #{joueuse.numero} — {joueuse.nom}
            </option>
          ))}
        </select>

<label>Pénalités imposées</label>

<div className="radio-group">
  <label>
    <input
      type="radio"
      name="nombrePenalites"
      checked={nombrePenalites === 1}
      onChange={() => setNombrePenalites(1)}
    />
    1 pénalité
  </label>

 <input
  type="radio"
  name="nombrePenalites"
  checked={nombrePenalites === 2}
  onChange={() => {
    setNombrePenalites(2);

    setPenalites((anciennesPenalites) => {
      if (anciennesPenalites.length >= 2) {
        return anciennesPenalites;
      }

      return [
        ...anciennesPenalites,
        {
          type: "ACCROCHER / HOOKING",
          duree: 2,
        },
      ];
    });
  }}
/>
    2 pénalités
</div>

        <PenaliteForm
  titre="Pénalité 1"
  penalite={penalites[0]}
  onChange={(nouvellePenalite) => {
    const nouvellesPenalites = [...penalites];
    nouvellesPenalites[0] = nouvellePenalite;
    setPenalites(nouvellesPenalites);
  }}
  setNombrePenalites={setNombrePenalites}
/>        
{nombrePenalites === 2 && (
  <PenaliteForm
    titre="Pénalité 2"
    penalite={
      penalites[1] ?? {
        type: "ACCROCHER / HOOKING",
        duree: 2,
      }
    }
    onChange={(nouvellePenalite) => {
      const nouvellesPenalites = [...penalites];

      while (nouvellesPenalites.length < 2) {
        nouvellesPenalites.push({
          type: "ACCROCHER / HOOKING",
          duree: 2,
        });
      }

      nouvellesPenalites[1] = nouvellePenalite;
      setPenalites(nouvellesPenalites);
    }}
  />
)}
        <div className="modal-actions">
          <button onClick={confirmerPunition}>
            Confirmer la punition
          </button>

          <button
            className="cancel-button"
            onClick={fermer}
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}