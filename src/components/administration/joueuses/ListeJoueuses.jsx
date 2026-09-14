import { useMemo, useState } from 'react'

function ListeJoueuses({
  joueuses = [],
  associations = [],
  affectations = [],
  equipes = [],
  modifierJoueuse,
  demanderSuppression,
}) {
  const [recherche, setRecherche] = useState('')

  const joueusesFiltrees = useMemo(() => {
    const texte = recherche.trim().toLowerCase()

    return [...joueuses]
      .filter((joueuse) => {
        const association = associations.find(
          (element) => String(element.id) === String(joueuse.associationId)
        )

        const affectation = affectations.find(
          (element) =>
            String(element.joueuseId) === String(joueuse.id) &&
            element.active !== false
        )

        const equipe = equipes.find(
          (element) => String(element.id) === String(affectation?.equipeId)
        )

        const categorie = equipe?.categorie ?? ''

        if (!texte) {
          return true
        }

        const contenu = [
          joueuse.nomComplet,
          joueuse.dateNaissance,
          association?.nom,
          categorie,
          joueuse.active !== false ? 'active' : 'inactive',
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()

        return contenu.includes(texte)
      })
      .sort((a, b) =>
        String(a.nomComplet || '').localeCompare(
          String(b.nomComplet || ''),
          'fr',
          {
            sensitivity: 'base',
          }
        )
      )
  }, [joueuses, associations, affectations, equipes, recherche])

  function obtenirCategorie(joueuse) {
    const affectation = affectations.find(
      (element) =>
        String(element.joueuseId) === String(joueuse.id) &&
        element.active !== false
    )

    if (!affectation) {
      return '—'
    }

    const equipe = equipes.find(
      (element) => String(element.id) === String(affectation.equipeId)
    )

    return equipe?.categorie || '—'
  }

  if (joueuses.length === 0) {
    return (
      <div className="joueuses-etat-vide">
        <p>Aucune joueuse enregistrée.</p>
      </div>
    )
  }

  return (
    <div className="joueuses-tableau-conteneur">
      <div className="joueuses-recherche">
        <input
          type="search"
          value={recherche}
          onChange={(event) => setRecherche(event.target.value)}
          placeholder="Rechercher une joueuse..."
        />

        <span>
          {joueusesFiltrees.length} joueuse
          {joueusesFiltrees.length > 1 ? 's' : ''}
        </span>
      </div>

      {joueusesFiltrees.length === 0 ? (
        <div className="joueuses-etat-vide">
          <p>Aucune joueuse ne correspond à la recherche.</p>
        </div>
      ) : (
        <div className="joueuses-tableau-scroll">
          <table className="joueuses-tableau">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Catégorie</th>
                <th>Date de naissance</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {joueusesFiltrees.map((joueuse) => (
                <tr key={joueuse.id}>
                  <td>
                    <button
                      type="button"
                      className="joueuse-nom-bouton"
                      onClick={() => modifierJoueuse(joueuse)}
                    >
                      {joueuse.nomComplet}
                    </button>
                  </td>

                  <td>{obtenirCategorie(joueuse)}</td>

                  <td>{joueuse.dateNaissance || '—'}</td>

                  <td>
                    <span
                      className={
                        joueuse.active !== false
                          ? 'joueuse-statut joueuse-statut-active'
                          : 'joueuse-statut joueuse-statut-inactive'
                      }
                    >
                      {joueuse.active !== false ? 'Active' : 'Inactive'}
                    </span>
                  </td>

                  <td>
                    <div className="joueuse-tableau-actions">
                      <button
                        type="button"
                        onClick={() => modifierJoueuse(joueuse)}
                      >
                        Modifier
                      </button>

                      <button
                        type="button"
                        onClick={() => demanderSuppression(joueuse)}
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ListeJoueuses
