function LigneJoueuse({
  joueuse,
  etat,
  admissibilite,
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

  function changerAffectation(evenement) {
    const cochee = evenement.target.checked;

    setEtatAffectations((etatActuel) => ({
      ...etatActuel,

      [joueuse.id]: {
        assignee:
          cochee &&
          admissibilite.type === "normale",

        derogationHaut:
          cochee &&
          admissibilite.type === "D+",

        derogationBas:
          cochee &&
          admissibilite.type === "D-",
      },
    }));
  }

  return (
    <tr>
      <td>
        <span
          className={`pastille-categorie pastille-${joueuse.categorie.toLowerCase()}`}
        >
          {joueuse.categorie
            .slice(0, 3)
            .toUpperCase()}
        </span>

        {joueuse.nomComplet}
      </td>

      <td>{libelleAffectation}</td>

      <td>
        <input
          type="checkbox"
          checked={estAffectee}
          onChange={changerAffectation}
        />
      </td>
    </tr>
  );
}

export default LigneJoueuse;