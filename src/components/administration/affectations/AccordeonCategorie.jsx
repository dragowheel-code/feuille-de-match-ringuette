function AccordeonCategorie({
  titre,
  nombre,
  ouvertParDefaut = false,
  enfants,
}) {
  return (
    <details
      className="accordeon-categorie"
      open={ouvertParDefaut}
    >
      <summary className="accordeon-entete">
        <strong>{titre}</strong>

        <span>
          {nombre} joueuse
          {nombre > 1 ? "s" : ""}
        </span>
      </summary>

      <div className="accordeon-contenu">
        {enfants}
      </div>
    </details>
  );
}

export default AccordeonCategorie;