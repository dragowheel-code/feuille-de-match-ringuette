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
  id: "saisons",
  titre: "Saisons",
  description:
    "Créer et gérer les saisons utilisées pour les affectations, les équipes et les historiques.",
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
  statut: "En développement",
  active: true,
},
{
  id: "affectations",
  titre: "Affectations",
  description:
    "Attribuer les joueuses aux équipes pour chaque saison.",
  statut: "En développement",
  active: true,
},
{
  id: "equipements",
  titre: "Équipements",
  description:
    "Gérer les équipements physiques, leur disponibilité et leurs affectations.",
  statut: "En développement",
  active: true,
},
  {
  id: "personnel-equipe",
  titre: "Personnel d'équipe",
  description:
    "Créer et gérer le personnel d'équipe, les numéros PNCE et les certifications.",
  statut: "En développement",
  active: true,
},
{
  id: "affectations-personnel",
  titre: "Affectations du personnel",
  description:
    "Attribuer le personnel d'équipe aux équipes de l'association active pour la saison active.",
  statut: "En développement",
  active: true,
},
  {
  id: "officiels",
  titre: "Officiels",
  description:
    "Gérer les officiels et les rôles qu'ils peuvent occuper.",
  statut: "En développement",
  active: true,
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