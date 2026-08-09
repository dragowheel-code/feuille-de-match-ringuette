function ListePersonnelEquipe({
  personnel = [],
  afficherPersonnel,
  modifierPersonnel,
  demanderSuppression,
}) {
  if (personnel.length === 0) {
    return (
      <p>
        Aucun membre du personnel
        enregistré.
      </p>
    );
  }

  return (
    <div className="liste-personnel-equipe">
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>No PNCE</th>
            <th>Introduction</th>
            <th>Éthique sportive</th>
            <th>Compétition</th>
            <th>Actif</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {personnel.map((personne) => (
            <tr key={personne.id}>
              <td>
                <button
                  type="button"
                  className="bouton-lien"
                  onClick={() =>
                    afficherPersonnel(
                      personne
                    )
                  }
                >
                  {personne.nomComplet}
                </button>
              </td>

              <td>
                {personne.pnce?.numero || "—"}
              </td>

              <td>
                {personne.pnce?.introduction
                  ? "✓"
                  : "—"}
              </td>

              <td>
                {personne.pnce?.ethiqueSportive
                  ? "✓"
                  : "—"}
              </td>

              <td>
                {personne.pnce?.competition
                  ? "✓"
                  : "—"}
              </td>

              <td>
                {personne.actif
                  ? "Oui"
                  : "Non"}
              </td>

              <td>
                <button
                  type="button"
                  onClick={() =>
                    modifierPersonnel(
                      personne
                    )
                  }
                >
                  Modifier
                </button>

                <button
                  type="button"
                  onClick={() =>
                    demanderSuppression(
                      personne
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
    </div>
  );
}

export default ListePersonnelEquipe;