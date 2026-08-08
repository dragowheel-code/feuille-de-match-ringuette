import { obtenirStatutEnsembleChandails, } from "../../../../domain/equipements";

function FicheChandail({
  ensemble,
  modifierEnsemble,
  supprimerEnsemble,
}) {
  if (!ensemble) {
    return (
      <FicheChandail
  ensemble={ensembleAffiche}
  modifierEnsemble={
    ouvrirModificationEnsemble
  }
  supprimerEnsemble={
    demanderSuppression
  }
/>
    );
  }

  const statut =
  obtenirStatutEnsembleChandails(
    ensemble
  );

const libellesStatut = {
  disponible: "Disponible",
  attribue: "Attribué",
  attention: "À réparer",
  incomplet: "Incomplet",
  perdu: "Perdu",
};

const libelleStatut =
  libellesStatut[statut] ?? statut;

  return (
  <aside className="fiche-chandail">
    <div className="fiche-chandail-entete">
      <div>
        <h2>
          Ensemble #{ensemble.numero}
        </h2>

        <span
          className={`badge-statut badge-statut-${statut}`}
        >
          {libelleStatut}
        </span>
      </div>

      <strong className="fiche-chandail-taille">
        {ensemble.taille}
      </strong>
    </div>

    <div className="fiche-chandail-section">
      <h3>Chandail clair</h3>

      <p>
        <strong>État :</strong>{" "}
        {ensemble.clair?.etat}
      </p>

      <p>
        <strong>Notes :</strong>{" "}
        {ensemble.clair?.notes ||
          "Aucune"}
      </p>
    </div>

    <div className="fiche-chandail-section">
      <h3>Chandail foncé</h3>

      <p>
        <strong>État :</strong>{" "}
        {ensemble.fonce?.etat}
      </p>

      <p>
        <strong>Notes :</strong>{" "}
        {ensemble.fonce?.notes ||
          "Aucune"}
      </p>
    </div>

    <div className="fiche-chandail-section">
      <h3>Attribution</h3>

      <p>
        Aucune attribution active.
      </p>
    </div>

    <div className="fiche-chandail-actions">
      <button
        type="button"
        onClick={() =>
          modifierEnsemble(ensemble)
        }
      >
        Modifier
      </button>

      <button
        type="button"
        onClick={() =>
          supprimerEnsemble(ensemble)
        }
      >
        Supprimer
      </button>
    </div>
  </aside>
);
}

export default FicheChandail;