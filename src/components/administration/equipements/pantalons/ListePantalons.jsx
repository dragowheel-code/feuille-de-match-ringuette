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
          <th>N°</th>
          <th>Taille</th>
          <th>Clair</th>
          <th>Foncé</th>
          <th>Modifier</th>
          <th>Supprimer</th>
        </tr>
      </thead>

      <tbody>
        {pantalons.map((pantalon) => (
          <tr key={pantalon.id}>
            <td>{pantalon.numero}</td>
            <td>{pantalon.taille}</td>
            <td>{pantalon.etat}</td>
            

            <td>
              <button
                type="button"
                onClick={() =>
                  modifierPantalon(pantalon)
                }
              >
                Modifier
              </button>
            </td>

            <td>
              <button
                type="button"
                onClick={() =>
                  demanderSuppression(pantalon)
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