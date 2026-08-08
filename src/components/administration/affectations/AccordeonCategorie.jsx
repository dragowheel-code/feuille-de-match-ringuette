function AccordeonCategorie({
  titre,
  nombre,
  nombreAffectees = 0,
  ouvertParDefaut = false,
  onToutAffecter,
  onToutRetirer,
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
  {nombreAffectees} / {nombre} affectées
</span>
      </summary>

      <div className="accordeon-contenu">
        <div className="accordeon-actions">
  <button
    type="button"
    onClick={onToutAffecter}
  >
    Tout affecter
  </button>

  <button
    type="button"
    onClick={onToutRetirer}
  >
    Tout retirer
  </button>
</div>

{enfants}
        </div>
    </details>
  );
}

export default AccordeonCategorie;