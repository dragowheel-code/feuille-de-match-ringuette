function GestionEquipements({
  retournerAccueil,
  ouvrirSection,
}) {
  return (
    <section className="gestion-equipements">
      <header className="gestion-equipements-entete">
        <div>
          <h1>Équipements</h1>

          <p>
            Gérez les différentes pièces
            d’équipement de l’association.
          </p>
        </div>

        <button
          type="button"
          onClick={retournerAccueil}
        >
          Retour aux volets administratifs
        </button>
      </header>

      <div className="gestion-equipements-grille">
        <button
          type="button"
          onClick={() =>
            ouvrirSection("chandails")
          }
        >
          Chandails
        </button>

        <button
          type="button"
          onClick={() =>
            ouvrirSection("pantalons")
          }
        >
          Pantalons
        </button>
      </div>
    </section>
  );
}

export default GestionEquipements;