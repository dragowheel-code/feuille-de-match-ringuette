import {
  obtenirChandailsDisponibles,
} from "../utils/joueuses";

export default function RemplacanteModal({
  ouverte,
  equipeRemplacante,
  associations = [],
  equipesAdministration = [],
  joueusesAdministration = [],
  affectationsAdministration = [],
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

  function obtenirNomEquipe(equipe) {
  const association =
    associations.find(
      (element) =>
        String(element.id) ===
        String(equipe.associationId)
    );

  const nomAssociation =
    association?.nomEquipes ||
    association?.abreviation ||
    association?.nom ||
    "Association";

  const nomEquipe = [
    equipe.categorie,
    equipe.niveau,
    equipe.numeroEquipe,
  ]
    .filter(Boolean)
    .join(" ");

  return `${nomAssociation} — ${nomEquipe}`;
}

const joueusesEquipeProvenance =
  affectationsAdministration
    .filter(
      (affectation) =>
        affectation.active !== false &&
        String(affectation.equipeId) ===
          String(equipeProvenance)
    )
    .map((affectation) => {
      const joueuse =
        joueusesAdministration.find(
          (element) =>
            String(element.id) ===
            String(affectation.joueuseId)
        );

      if (!joueuse) {
        return null;
      }

      return {
        ...joueuse,
        numero: affectation.numero,
      };
    })
    .filter(Boolean)
    .sort(
      (a, b) =>
        Number(a.numero) - Number(b.numero)
    );
  
  const chandailsDisponibles =
  obtenirChandailsDisponibles(
    joueuses,
    equipeRemplacante
  );
  
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

      {equipesAdministration.map((equipe) => (
  <option
    key={equipe.id}
    value={equipe.id}
  >
    {obtenirNomEquipe(equipe)}
  </option>
))}
    </select>

    <label>Joueuse</label>

    <select
      value={joueuseSelectionnee}
      onChange={(e) => {
        const id = e.target.value;

        setJoueuseSelectionnee(id);

        const joueuse =
  joueusesEquipeProvenance.find(
    (j) =>
      String(j.id) === id
  );

        if (joueuse) {
          setNumeroRemplacante(joueuse.numero);
          setNomRemplacante(joueuse.nomComplet);
       } else {
         setNumeroRemplacante("");
         setNomRemplacante("");
  }
}}
    >
      <option value="">-- Sélectionner --</option>

      {joueusesEquipeProvenance.map(
  (joueuse) => (
    <option
      key={joueuse.id}
      value={String(joueuse.id)}
    >
      #{joueuse.numero}{" "}
      {joueuse.nomComplet}
    </option>
  )
)}
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

{chandailsDisponibles.length > 0 && (
  <div className="chandails-disponibles">
    <span>Chandails disponibles :</span>

    <div className="chandails-disponibles-liste">
      {chandailsDisponibles.map((joueuse) => (
        <button
          key={joueuse.id}
          type="button"
          className="bouton-chandail"
          onClick={() =>
            setNumeroRemplacante(
              String(joueuse.numero)
            )
          }
        >
          #{joueuse.numero}
        </button>
      ))}
    </div>
  </div>
)}

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