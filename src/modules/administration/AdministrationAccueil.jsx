const SECTIONS_ADMINISTRATION = [
  {
    id: "associations",
    titre: "Associations",
    description:
      "Créer et gérer les associations, leurs coordonnées, leurs logos et leurs couleurs.",
    statut: "En développement",
    active: true,
  },
  {
  id: "equipes",
  titre: "Équipes",
  description:
    "Gérer les équipes appartenant aux différentes associations.",
  statut: "En développement",
  active: true,
},
  {
    id: "joueuses",
    titre: "Joueuses",
    description:
      "Gérer les joueuses et leurs affectations saisonnières.",
    statut: "À venir",
    active: false,
  },
  {
    id: "personnel",
    titre: "Personnel d'équipe",
    description:
      "Gérer les entraîneurs, les assistants et les gérants d'équipe.",
    statut: "À venir",
    active: false,
  },
  {
    id: "officiels",
    titre: "Officiels",
    description:
      "Gérer les officiels et leur association d'appartenance.",
    statut: "À venir",
    active: false,
  },
  {
    id: "donnees",
    titre: "Importation et exportation",
    description:
      "Importer, exporter et publier les données d'une association.",
    statut: "En fonction",
    active: true,
  },
];

function AdministrationAccueil({ ouvrirSection }) {
  return (
    <section className="administration-contenu">
      <div className="administration-section-entete">
        <h2>Volets administratifs</h2>

        <p>
          Ce module est développé indépendamment de la feuille de match. Les
          fonctions seront activées progressivement.
        </p>
      </div>

      <div className="administration-grille">
        {SECTIONS_ADMINISTRATION.map((section) => (
          <article
            key={section.id}
            className="administration-carte"
          >
            <div className="administration-carte-entete">
              <h3>{section.titre}</h3>

              <span className="administration-statut">
                {section.statut}
              </span>
            </div>

            <p>{section.description}</p>

            <button
              type="button"
              disabled={!section.active}
              title={
                section.active
                  ? `Ouvrir le volet ${section.titre}`
                  : "Cette fonction sera développée prochainement."
              }
              onClick={() => ouvrirSection(section.id)}
            >
              Ouvrir
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default AdministrationAccueil;