function ListeSaisons({
  saisons,
  modifierSaison,
  demanderSuppression,
}) {
  if (saisons.length === 0) {
    return (
      <p>
        Aucune saison n'est actuellement enregistrée.
      </p>
    );
  }

  return (
    <table className="table-administration">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Début</th>
          <th>Fin</th>
          <th>Active</th>
          <th>Verrouillée</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {saisons.map((saison) => (
          <tr key={saison.id}>
            <td>{saison.nom}</td>

            <td>{saison.dateDebut}</td>

            <td>{saison.dateFin}</td>

            <td>
              {saison.active ? "Oui" : "Non"}
            </td>

            <td>
              {saison.verrouillee ? "Oui" : "Non"}
            </td>

            <td>
              <button
                type="button"
                onClick={() =>
                  modifierSaison(saison)
                }
              >
                Modifier
              </button>

              <button
                type="button"
                onClick={() =>
                  demanderSuppression(saison)
                }
              >
                Supprimer
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ListeSaisons;