import { obtenirNomEquipe } from "../../../domain/equipes/obtenirNomEquipe";

function ListeEquipes({
  equipes = [],
  modifierEquipe,
  demanderSuppression,
}) {
  if (equipes.length === 0) {
    return (
      <div className="equipes-etat-vide">
        <p>Aucune équipe enregistrée.</p>
      </div>
    );
  }

  return (
    <div className="equipes-liste">
      {equipes.map((equipe) => (
  <article
    key={equipe.id}
    className="equipe-carte"
  >
    <div className="equipe-carte-informations">
      <h3>{obtenirNomEquipe(equipe)}</h3>

      <p>
        <strong>Catégorie :</strong>{" "}
        {equipe.categorie || "Non définie"}
      </p>

      <p>
        <strong>Niveau :</strong>{" "}
        {equipe.niveau || "Non défini"}
      </p>

      <p>
        <strong>Équipe :</strong>{" "}
        {equipe.numeroEquipe || "Aucun numéro"}
      </p>

      <p>
        <strong>Code SportPlus :</strong>{" "}
        {equipe.abreviation || "Non défini"}
      </p>
    </div>

    <div className="equipe-carte-actions">
      <button
        type="button"
        onClick={() => modifierEquipe(equipe)}
      >
        Modifier
      </button>

      <button
        type="button"
        onClick={() =>
          demanderSuppression(equipe)
        }
      >
        Supprimer
      </button>
    </div>
  </article>
))}
    </div>
  );
}

export default ListeEquipes;