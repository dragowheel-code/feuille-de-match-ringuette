export default function RemplacanteModal({
  ouverte,
  equipeRemplacante,

  equipes = [],
  equipeProvenance,
  setEquipeProvenance,

  modeRemplacante,
  setModeRemplacante,

  joueuseSelectionnee,
  setJoueuseSelectionnee,

  numeroRemplacante,
  setNumeroRemplacante,
  nomRemplacante,
  setNomRemplacante,

  confirmerRemplacante,
  fermer,
  joueuses = [],
}) {
  if (!ouverte) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Ajouter une remplaçante</h2>

        <p>
          Équipe : <strong>{equipeRemplacante}</strong>
        </p>
        <label>Type de remplaçante</label>

<select
  value={modeRemplacante}
  onChange={(e) => setModeRemplacante(e.target.value)}
>
  <option value="existante">
    Joueuse existante
  </option>

  <option value="externe">
    Remplaçante externe
  </option>
</select>

{modeRemplacante === "existante" && (
  <>
    <label>Équipe de provenance</label>

    <select
      value={equipeProvenance}
      onChange={(e) => {
        setEquipeProvenance(e.target.value);
        setJoueuseSelectionnee("");
        setNumeroRemplacante("");
        setNomRemplacante("");
      }}
    >
      <option value="">-- Sélectionner --</option>

      {equipes.map((equipe) => (
        <option
          key={equipe.id}
          value={equipe.nom}
        >
          {equipe.nom}
        </option>
      ))}
    </select>

    <label>Joueuse</label>

    <select
      value={joueuseSelectionnee}
      onChange={(e) => {
        const id = e.target.value;

        setJoueuseSelectionnee(id);

        const joueuse = joueuses.find(
         (j) => String(j.id) === id
       );

        if (joueuse) {
          setNumeroRemplacante(joueuse.numero);
          setNomRemplacante(joueuse.nom);
       } else {
         setNumeroRemplacante("");
         setNomRemplacante("");
  }
}}
    >
      <option value="">-- Sélectionner --</option>

      {joueuses
        .filter(
          (joueuse) =>
            joueuse.equipe === equipeProvenance
        )
        .sort(
          (a, b) =>
            Number(a.numero) - Number(b.numero)
        )
        .map((joueuse) => (
          <option
  key={joueuse.id}
  value={String(joueuse.id)}
>
  #{joueuse.numero} {joueuse.nom}
</option>
        ))}
    </select>
  </>
)}

<label>Numéro</label>

<input
  value={numeroRemplacante}
  onChange={(e) =>
    setNumeroRemplacante(e.target.value)
  }
/>

<label>Nom</label>

<input
  value={nomRemplacante}
  onChange={(e) =>
    setNomRemplacante(e.target.value)
  }
/>

        <div className="modal-actions">
          <button onClick={confirmerRemplacante}>
            Ajouter
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