function ListeJoueuses({
  joueuses = [],
  associations = [],
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
        String(association.id) ===
        String(joueuse.associationId)
    );
  }

  return (
    <div className="joueuses-liste">
      {joueuses.map((joueuse) => {
        const association =
          obtenirAssociation(joueuse);

        return (
          <article
            key={joueuse.id}
            className="joueuse-carte"
          >
            <div className="joueuse-carte-informations">
              <h3>
                {joueuse.nomComplet}
              </h3>

              <p>
                <strong>
                  Association :
                </strong>{" "}
                {association?.nom ||
                  "Non définie"}
              </p>

              <p>
                <strong>
                  Numéro d'inscription :
                </strong>{" "}
                {joueuse.numeroInscription ||
                  "Non défini"}
              </p>

              <p>
                <strong>
                  Date de naissance :
                </strong>{" "}
                {joueuse.dateNaissance ||
                  "Non définie"}
              </p>

              <p>
                <strong>
                  Statut :
                </strong>{" "}
                {joueuse.active !== false
                  ? "Active"
                  : "Inactive"}
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
                  demanderSuppression(
                    joueuse
                  )
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