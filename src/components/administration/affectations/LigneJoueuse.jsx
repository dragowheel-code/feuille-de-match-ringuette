import { normaliserCategorie } from "../../../domain/categories/normaliserCategorie";

function LigneJoueuse({
  joueuse,
  etat,
  admissibilite,
  autresEquipes = [],
  setEtatAffectations,
}) {
  const libelleAffectation =
    admissibilite.type === "normale"
      ? "Normale"
      : admissibilite.type;

  const estAffectee = Boolean(
    etat.assignee ||
      etat.derogationHaut ||
      etat.derogationBas
  );

  const categorieAffichee =
    normaliserCategorie(
      joueuse.categorie
    );

  function changerAffectation(
    evenement
  ) {
    const cochee =
      evenement.target.checked;

    setEtatAffectations(
      (etatActuel) => ({
        ...etatActuel,

        [joueuse.id]: {
          assignee:
            cochee &&
            admissibilite.type ===
              "normale",

          derogationHaut:
            cochee &&
            admissibilite.type ===
              "D+",

          derogationBas:
            cochee &&
            admissibilite.type ===
              "D-",
        },
      })
    );
  }

  return (
    <tr>
      <td>
        <span
          className={`pastille-categorie pastille-${categorieAffichee.toLowerCase()}`}
        >
          {categorieAffichee
            .slice(0, 3)
            .toUpperCase()}
        </span>

        <div className="ligne-joueuse-identite">
          <span>
            {joueuse.nomComplet}
          </span>

          {autresEquipes.length >
            0 && (
            <small className="ligne-joueuse-autres-equipes">
              Déjà affectée à :{" "}
              {autresEquipes.join(
                " • "
              )}
            </small>
          )}
        </div>
      </td>

      <td>
        {libelleAffectation}
      </td>

      <td>
        <input
          type="checkbox"
          checked={estAffectee}
          onChange={
            changerAffectation
          }
        />
      </td>
    </tr>
  );
}

export default LigneJoueuse;