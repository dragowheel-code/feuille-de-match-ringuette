function ListeRemisesPantalons({
  remises = [],
  pantalons = [],
  joueuses = [],
}) {
  if (remises.length === 0) {
    return (
      <p>
        Aucune remise de pantalon
        enregistrée.
      </p>
    );
  }

  function obtenirInformations(
    remise
  ) {
    const joueuse =
      joueuses.find(
        (element) =>
          String(element.id) ===
          String(remise.joueuseId)
      );

    const pantalon =
      pantalons.find(
        (element) =>
          String(element.id) ===
          String(remise.pantalonId)
      );

    return {
      joueuse:
        joueuse?.nomComplet ||
        "Joueuse inconnue",

      taille:
        pantalon?.taille || "—",
    };
  }

  const remisesTriees = [
    ...remises,
  ].sort((a, b) =>
    String(
      b.dateRemise || ""
    ).localeCompare(
      String(a.dateRemise || "")
    )
  );

  return (
    <table className="table-administration">
      <thead>
        <tr>
          <th>Date</th>
          <th>Joueuse</th>
          <th>Taille</th>
          <th>Quantité</th>
          <th>Type</th>
          <th>Commentaire</th>
        </tr>
      </thead>

      <tbody>
        {remisesTriees.map(
          (remise) => {
            const informations =
              obtenirInformations(
                remise
              );

            return (
              <tr key={remise.id}>
                <td>
                  {remise.dateRemise}
                </td>

                <td>
                  {
                    informations.joueuse
                  }
                </td>

                <td>
                  {
                    informations.taille
                  }
                </td>

                <td>
                  {remise.quantite}
                </td>

                <td>
                  {remise.remplacement
                    ? "Remplacement"
                    : "Remise initiale"}
                </td>

                <td>
                  {remise.commentaire ||
                    "—"}
                </td>
              </tr>
            );
          }
        )}
      </tbody>
    </table>
  );
}

export default ListeRemisesPantalons;