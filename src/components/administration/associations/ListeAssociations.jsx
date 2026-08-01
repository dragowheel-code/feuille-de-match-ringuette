function ListeAssociations({
  associations = [],
  modifierAssociation,
  demanderSuppression,
}) {
  if (associations.length === 0) {
    return (
      <div className="associations-etat-vide">
        <p>Aucune association enregistrée.</p>
      </div>
    );
  }

  return (
    <div className="associations-liste">
      {associations.map((association) => (
        <article
          key={association.id}
          className="association-carte"
        >
          <div className="association-carte-informations">
            <h3>{association.nom}</h3>
            
            {association.active && (
  <p className="association-active">
    ✓ Association active
  </p>
)}

            <p>
              <strong>Abréviation :</strong>{" "}
              {association.abreviation || "Non définie"}
            </p>

            <p>
              <strong>Ville :</strong>{" "}
              {association.ville || "Non définie"}
            </p>
          </div>

          <div className="association-carte-actions">
            <button
              type="button"
              onClick={() => modifierAssociation(association)}
            >
              Modifier
            </button>

            <button
              type="button"
              onClick={() => demanderSuppression(association)}
            >
              Supprimer
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

export default ListeAssociations;