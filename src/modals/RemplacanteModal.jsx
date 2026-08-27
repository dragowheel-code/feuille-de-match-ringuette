import {
  useEffect,
  useState,
} from "react";

import {
  obtenirChandailsDisponibles,
} from "../utils/joueuses";

export default function RemplacanteModal({
  ouverte,
  equipeRemplacante,
  associations = [],
  equipesAdministration = [],
  chargerAlignementPublic,
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

const [
  joueusesEquipeProvenance,
  setJoueusesEquipeProvenance,
] = useState([]);

useEffect(() => {
  let actif = true;

  async function charger() {
    if (
      !ouverte ||
      modeRemplacante !== "existante" ||
      !equipeProvenance ||
      !chargerAlignementPublic
    ) {
      if (actif) {
        setJoueusesEquipeProvenance([]);
      }

      return;
    }

    const resultat =
      await chargerAlignementPublic(
        equipeProvenance
      );

    if (!actif) {
      return;
    }

    if (resultat.succes) {
      setJoueusesEquipeProvenance(
        [...resultat.joueuses].sort(
          (a, b) =>
            Number(a.numero || 0) -
            Number(b.numero || 0)
        )
      );
    } else {
      setJoueusesEquipeProvenance([]);
    }
  }

  charger();

  return () => {
    actif = false;
  };
}, [
  ouverte,
  modeRemplacante,
  equipeProvenance,
  chargerAlignementPublic,
]);

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
  setNumeroRemplacante(
    String(joueuse.numero ?? "")
  );

  setNomRemplacante(
    joueuse.nomComplet ??
      joueuse.nom ??
      ""
  );
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
          <button
  onClick={() => {
    const joueuseSelectionneeComplete =
      modeRemplacante === "existante"
        ? joueusesEquipeProvenance.find(
            (joueuse) =>
              String(joueuse.id) ===
              String(joueuseSelectionnee)
          )
        : null;

    confirmerRemplacante(
      joueuseSelectionneeComplete
    );
  }}
>
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