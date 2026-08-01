function ListeAffectations({
  affectations,
  saisons,
  equipes,
  joueuses,
  modifierAffectation,
  demanderSuppression,
}) {
  function obtenirNomSaison(id) {
    return (
      saisons.find(
        (saison) => saison.id === id
      )?.nom ?? "-"
    );
  }

  function obtenirNomEquipe(id) {
    return (
      equipes.find(
        (equipe) => equipe.id === id
      )?.nom ?? "-"
    );
  }

  function obtenirNomJoueuse(id) {
  const joueuse = joueuses.find(
    (joueuse) => String(joueuse.id) === String(id)
  );

  if (!joueuse) {
    return "-";
  }

  if (joueuse.nomComplet) {
    return joueuse.nomComplet;
  }

  return [
    joueuse.prenom,
    joueuse.nom,
  ]
    .filter(Boolean)
    .join(" ");
}

  if (affectations.length === 0) {
    return (
      <p>
        Aucune affectation n'est
        actuellement enregistrée.
      </p>
    );
  }
console.table(affectations);
  return (
    <table className="table-administration">
      <thead>
        <tr>
          <th>Saison</th>
          <th>Équipe</th>
          <th>Joueuse</th>
          <th>#</th>
          <th>G</th>
          <th>C</th>
          <th>A</th>
          <th>Active</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {affectations.map(
          (affectation) => (
            <tr key={affectation.id}>
              <td>
                {obtenirNomSaison(
                  affectation.saisonId
                )}
              </td>

              <td>
                {obtenirNomEquipe(
                  affectation.equipeId
                )}
              </td>

              <td>
                {obtenirNomJoueuse(
                  affectation.joueuseId
                )}
              </td>

              <td>
                {affectation.numero}
              </td>

              <td>
                {affectation.gardienne
                  ? "✓"
                  : ""}
              </td>

              <td>
                {affectation.capitaine
                  ? "C"
                  : ""}
              </td>

              <td>
                {affectation.assistante
                  ? "A"
                  : ""}
              </td>

              <td>
                {affectation.active
                  ? "Oui"
                  : "Non"}
              </td>

              <td>
                <button
                  type="button"
                  onClick={() =>
                    modifierAffectation(
                      affectation
                    )
                  }
                >
                  Modifier
                </button>

                <button
                  type="button"
                  onClick={() =>
                    demanderSuppression(
                      affectation
                    )
                  }
                >
                  Supprimer
                </button>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}

export default ListeAffectations;