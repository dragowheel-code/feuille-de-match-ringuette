function formaterDate(date) {
  if (!date) {
    return "";
  }

  const [annee, mois, jour] =
    date.split("-");

  if (
    !annee ||
    !mois ||
    !jour
  ) {
    return date;
  }

  return `${jour}/${mois}/${annee}`;
}

function ListeTournois({
  tournois,
  ouvrirFiche,
  supprimer,
}) {
  const tournoisTries = [
    ...tournois,
  ].sort((a, b) =>
    String(a.dateDebut).localeCompare(
      String(b.dateDebut)
    )
  );

  if (
    tournoisTries.length === 0
  ) {
    return (
      <p>
        Aucun tournoi n'est
        enregistré pour la saison
        active.
      </p>
    );
  }

  return (
    <div className="administration-tableau-conteneur">
      <table className="administration-tableau">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Début</th>
            <th>Fin</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tournoisTries.map(
            (tournoi) => (
              <tr key={tournoi.id}>
                <td>
  <button
    type="button"
    className="administration-lien"
    onClick={() =>
      ouvrirFiche(
        tournoi
      )
    }
  >
    {tournoi.nom}
  </button>
</td>

                <td>
                  {formaterDate(
                    tournoi.dateDebut
                  )}
                </td>

                <td>
                  {formaterDate(
                    tournoi.dateFin
                  )}
                </td>

                <td>
                  {tournoi.actif !==
                  false
                    ? "Actif"
                    : "Inactif"}
                </td>

                <td>
  <button
    type="button"
    onClick={() =>
      supprimer(
        tournoi
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
    </div>
  );
}

export default ListeTournois;