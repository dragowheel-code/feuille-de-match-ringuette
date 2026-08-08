function ListeChandails({
  ensembles,
  modifierEnsemble,
  demanderSuppression,
}) {
  if (ensembles.length === 0) {
    return (
      <p>
        Aucun ensemble de chandails enregistré.
      </p>
    );
  }

  return (
    <table className="table-administration">
      <thead>
        <tr>
          <th>N°</th>
          <th>Taille</th>
          <th>Clair</th>
          <th>Foncé</th>
          <th>Modifier</th>
          <th>Supprimer</th>
        </tr>
      </thead>

      <tbody>
        {ensembles.map((ensemble) => (
          <tr key={ensemble.id}>
            <td>{ensemble.numero}</td>
            <td>{ensemble.taille}</td>
            <td>{ensemble.clair.etat}</td>
            <td>{ensemble.fonce.etat}</td>

            <td>
              <button
                type="button"
                onClick={() =>
                  modifierEnsemble(ensemble)
                }
              >
                Modifier
              </button>
            </td>

            <td>
              <button
                type="button"
                onClick={() =>
                  demanderSuppression(ensemble)
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

export default ListeChandails;