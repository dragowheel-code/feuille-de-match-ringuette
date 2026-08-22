function ListePantalons({
  pantalons,
  modifierPantalon,
  demanderSuppression,
}) {
  if (pantalons.length === 0) {
    return (
      <p>
        Aucun pantalon enregistré.
      </p>
    );
  }

  return (
    <table className="table-administration">
      <thead>
        <tr>
          <th>Taille</th>
          <th>Quantité en stock</th>
          <th>Statut</th>
          <th>Modifier</th>
          <th>Supprimer</th>
        </tr>
      </thead>

      <tbody>
        {pantalons.map((pantalon) => (
          <tr key={pantalon.id}>
            <td>
              {pantalon.taille}
            </td>

            <td>
              {pantalon.quantiteStock}
            </td>

            <td>
              {pantalon.actif
                ? "Actif"
                : "Inactif"}
            </td>

            <td>
              <button
                type="button"
                onClick={() =>
                  modifierPantalon(
                    pantalon
                  )
                }
              >
                Modifier
              </button>
            </td>

            <td>
              <button
                type="button"
                onClick={() =>
                  demanderSuppression(
                    pantalon
                  )
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

export default ListePantalons;