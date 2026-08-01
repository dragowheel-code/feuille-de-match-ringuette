function BarreOutilsAffectations({
  equipeSelectionneeId,
  equipesDisponibles,
  changerEquipe,
  obtenirNomEquipe,

  nombreAffectees,
  nombrePE,

  recherche,
  setRecherche,

  affecterToutesLesJoueuses,
  retirerToutesLesJoueuses,
}) {
  return (
    <>
      <label>
        Équipe

        <select
          value={equipeSelectionneeId}
          onChange={changerEquipe}
        >
          <option value="">
            Sélectionner une équipe
          </option>

          {equipesDisponibles.map(
            (equipe) => (
              <option
                key={equipe.id}
                value={equipe.id}
              >
                {obtenirNomEquipe(
                  equipe
                )}
              </option>
            )
          )}
        </select>
      </label>

      {equipeSelectionneeId && (
        <>
          <div className="resume-affectations">
            <strong>
              {nombreAffectees} / 19 joueuses
            </strong>

            {" • "}

            <strong>
              {nombrePE} PE
            </strong>
          </div>

          <div className="affectations-actions-rapides">
            <button
              type="button"
              onClick={
                affecterToutesLesJoueuses
              }
            >
              Tout affecter
            </button>

            <button
              type="button"
              onClick={
                retirerToutesLesJoueuses
              }
            >
              Tout retirer
            </button>
          </div>

          <input
            type="text"
            className="recherche-joueuse"
            placeholder="🔍 Rechercher une joueuse..."
            value={recherche}
            onChange={(evenement) =>
              setRecherche(
                evenement.target.value
              )
            }
          />
        </>
      )}
    </>
  );
}

export default BarreOutilsAffectations;