function obtenirRoles(officiel) {
  const roles = [];

  if (officiel.arbitre) {
    roles.push("Arbitre");
  }

  if (officiel.chronometreur) {
    roles.push("Chronométreur");
  }

  if (officiel.marqueur) {
    roles.push("Marqueur");
  }

  if (officiel.operateur30s) {
    roles.push(
      "Opérateur 30 secondes"
    );
  }

  return roles.join(", ");
}

function ListeOfficiels({
  officiels,
  ouvrirFiche,
}) {
  const officielsTries = [
    ...officiels,
  ].sort((a, b) =>
    a.nom.localeCompare(
      b.nom,
      "fr-CA"
    )
  );

  if (
    officielsTries.length === 0
  ) {
    return (
      <p>
        Aucun officiel n'est
        enregistré.
      </p>
    );
  }

  return (
    <div className="administration-tableau-conteneur">
      <table className="administration-tableau">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Rôles</th>
          </tr>
        </thead>

        <tbody>
          {officielsTries.map(
            (officiel) => (
              <tr key={officiel.id}>
                <td>
                  <button
                    type="button"
                    className="administration-lien"
                    onClick={() =>
                      ouvrirFiche(
                        officiel
                      )
                    }
                  >
                    {officiel.nom}
                  </button>
                </td>

                <td>
                  {obtenirRoles(
                    officiel
                  )}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListeOfficiels;