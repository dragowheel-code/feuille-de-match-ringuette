export default function OfficielModal({
  ouverte,
  officiel,
  setOfficiel,
  confirmer,
  fermer,
}) {
  if (!ouverte) return null

  const modeModification = officiel.mode === 'modification'

  function modifierChamp(event) {
    const { name, value, type, checked } = event.target

    setOfficiel((ancienOfficiel) => ({
      ...ancienOfficiel,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  function soumettreFormulaire(event) {
    event.preventDefault()
    confirmer()
  }

  return (
    <div className="modal-backdrop">
      <div className="modal config-modal">
        <h2>
          {modeModification ? 'Modifier un officiel' : 'Ajouter un officiel'}
        </h2>

        <form onSubmit={soumettreFormulaire}>
          <div className="config-section">
            <label htmlFor="prenom-officiel">Prénom</label>

            <input
              id="prenom-officiel"
              name="prenom"
              type="text"
              value={officiel.prenom ?? ''}
              onChange={modifierChamp}
              autoFocus
            />

            <label htmlFor="nom-famille-officiel">Nom</label>

            <input
              id="nom-famille-officiel"
              name="nomFamille"
              type="text"
              value={officiel.nomFamille ?? ''}
              onChange={modifierChamp}
            />

            <label htmlFor="courriel-officiel">Courriel</label>

            <input
              id="courriel-officiel"
              name="courriel"
              type="email"
              value={officiel.courriel ?? ''}
              onChange={modifierChamp}
            />

            <label htmlFor="telephone-officiel">Téléphone</label>

            <input
              id="telephone-officiel"
              name="telephone"
              type="tel"
              value={officiel.telephone ?? ''}
              onChange={modifierChamp}
            />
          </div>

          <div className="config-section">
            <h3>Rôles disponibles</h3>

            <label>
              <input
                type="checkbox"
                name="arbitre"
                checked={officiel.arbitre}
                onChange={modifierChamp}
              />
              Arbitre
            </label>

            <label>
              <input
                type="checkbox"
                name="chronometreur"
                checked={officiel.chronometreur}
                onChange={modifierChamp}
              />
              Chronométreur
            </label>

            <label>
              <input
                type="checkbox"
                name="marqueur"
                checked={officiel.marqueur}
                onChange={modifierChamp}
              />
              Marqueur
            </label>

            <label>
              <input
                type="checkbox"
                name="operateur30s"
                checked={officiel.operateur30s}
                onChange={modifierChamp}
              />
              Opérateur 30 secondes
            </label>
          </div>

          <div className="modal-actions">
            <button type="submit">
              {modeModification
                ? 'Enregistrer les modifications'
                : 'Ajouter l’officiel'}
            </button>

            <div className="config-section">
              <h3>Statut</h3>

              <label>
                <input
                  type="checkbox"
                  name="actif"
                  checked={officiel.actif !== false}
                  onChange={modifierChamp}
                />
                Actif
              </label>
            </div>

            <button type="button" className="cancel-button" onClick={fermer}>
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
