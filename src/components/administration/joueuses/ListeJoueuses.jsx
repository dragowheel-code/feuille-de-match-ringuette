function ListeJoueuses({
  joueuses = [],
  associations = [],
  equipes = [],
  modifierJoueuse,
  demanderSuppression,
}) {
  if (joueuses.length === 0) {
    return (
      <div className="joueuses-etat-vide">
        <p>Aucune joueuse enregistrée.</p>
      </div>
    );
  }

  function obtenirAssociation(joueuse) {
    return associations.find(
      (association) =>
        association.id === joueuse.associationId
    );
  }

  function obtenirEquipe(joueuse) {
    return equipes.find(
      (equipe) =>
        equipe.id === joueuse.equipeId
    );
  }

  return (
    <div className="joueuses-liste">
      {joueuses.map((joueuse) => {
        const association =
          obtenirAssociation(joueuse);

        const equipe = obtenirEquipe(joueuse);

        return (
          <article
            key={joueuse.id}
            className="joueuse-carte"
          >
            <div className="joueuse-carte-informations">
              <h3>{joueuse.nomComplet}</h3>

              <p>
                <strong>Association :</strong>{" "}
                {association?.nom || "Non définie"}
              </p>

              <p>
                <strong>Équipe :</strong>{" "}
                {equipe?.nom || "Non définie"}
              </p>

              <p>
                <strong>
                  Numéro d'inscription :
                </strong>{" "}
                {joueuse.numeroInscription ||
                  "Non défini"}
              </p>

              <p>
                <strong>Catégorie :</strong>{" "}
                {joueuse.categorie ||
                  "Non définie"}
              </p>

              <p>
                <strong>Saison :</strong>{" "}
                {joueuse.saison || "Non définie"}
              </p>
            </div>

            <div className="joueuse-carte-actions">
              <button
                type="button"
                onClick={() =>
                  modifierJoueuse(joueuse)
                }
              >
                Modifier
              </button>

              <button
                type="button"
                onClick={() =>
                  demanderSuppression(joueuse)
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

export default ListeJoueuses;