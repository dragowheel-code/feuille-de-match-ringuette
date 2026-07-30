function ListeEquipes({
  equipes = [],
  associations = [],
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

  function obtenirAssociation(equipe) {
    return associations.find(
      (association) =>
        association.id === equipe.associationId
    );
  }

  return (
    <div className="equipes-liste">
      {equipes.map((equipe) => {
        const association = obtenirAssociation(equipe);

        return (
          <article
            key={equipe.id}
            className="equipe-carte"
          >
            <div className="equipe-carte-informations">
              <h3>{equipe.nom}</h3>

              <p>
                <strong>Association :</strong>{" "}
                {association?.nom || "Non définie"}
              </p>

              <p>
                <strong>Abréviation :</strong>{" "}
                {equipe.abreviation || "Non définie"}
              </p>

              <p>
                <strong>Calibre :</strong>{" "}
                {equipe.calibre || "Non défini"}
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
        );
      })}
    </div>
  );
}

export default ListeEquipes;