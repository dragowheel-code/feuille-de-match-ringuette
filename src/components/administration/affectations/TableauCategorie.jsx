import LigneJoueuse from "./LigneJoueuse";

function TableauCategorie({
  joueuses,
  etatAffectations,
  setEtatAffectations,
  obtenirAdmissibilite,
}) {
  return (
    <table className="table-administration table-affectations">
      <thead>
        <tr>
          <th>Joueuse</th>
          <th>Type</th>
          <th>Affecter</th>
        </tr>
      </thead>

      <tbody>
        {joueuses.map((joueuse) => {
          const etat =
            etatAffectations[joueuse.id] ?? {
              assignee: false,
              derogationHaut: false,
              derogationBas: false,
            };

          const admissibilite =
            obtenirAdmissibilite(joueuse);

          return (
            <LigneJoueuse
              key={joueuse.id}
              joueuse={joueuse}
              etat={etat}
              admissibilite={admissibilite}
              setEtatAffectations={
                setEtatAffectations
              }
            />
          );
        })}
      </tbody>
    </table>
  );
}

export default TableauCategorie;