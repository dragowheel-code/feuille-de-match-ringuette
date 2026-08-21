import logoDefaut from "../../../assets/logos/association-defaut.png";
import LogoUploader from "../../common/LogoUploader";

function AssociationModal({
  ouverte,
  fermer,
  enregistrer,
  formulaire,
  setFormulaire,
  association = null,
  erreurs = [],
}) {
    
  if (!ouverte) {
    return null;
  }

  function changerChamp(evenement) {
  const { name, value, type, checked } = evenement.target;

  setFormulaire((precedent) => ({
    ...precedent,
    [name]: type === "checkbox" ? checked : value,
  }));
}

  function soumettre(evenement) {
    evenement.preventDefault();
    enregistrer(formulaire);
  }

  return (
    <div className="modal-overlay">
      <div className="modal-contenu">
        <h2>
  {association
    ? "Modifier l'association"
    : "Nouvelle association"}
</h2>

        {erreurs.length > 0 && (
  <div className="association-erreurs">
    {erreurs.map((erreur) => (
      <p key={erreur}>{erreur}</p>
    ))}
  </div>
)}

        <form onSubmit={soumettre}>
          <label>
            Nom
            <input
              type="text"
              name="nom"
              value={formulaire.nom}
              onChange={changerChamp}
            />
          </label>

          <label>
            Abréviation
            <input
              type="text"
              name="abreviation"
              value={formulaire.abreviation}
              onChange={changerChamp}
            />
          </label>

          <label>
  Code
  <input
    type="text"
    name="code"
    value={formulaire.code}
    onChange={changerChamp}
    maxLength={10}
  />
</label>

<label>
  Nom des équipes
  <input
    type="text"
    name="nomEquipes"
    value={formulaire.nomEquipes}
    onChange={changerChamp}
  />
</label>

          <label>
            Ville
            <input
              type="text"
              name="ville"
              value={formulaire.ville}
              onChange={changerChamp}
            />
          </label>

          <label>
  Courriel
  <input
    type="email"
    name="courriel"
    value={formulaire.courriel || ""}
    onChange={changerChamp}
    placeholder="association@exemple.ca"
  />
</label>

          <label>
  Couleur foncée
  <input
    type="color"
    name="couleurFonce"
    value={formulaire.couleurFonce}
    onChange={changerChamp}
  />
</label>

          <label>
  Couleur claire
  <input
    type="color"
    name="couleurClair"
    value={formulaire.couleurClair}
    onChange={changerChamp}
  />
</label>
          
<label>
  <input
    type="checkbox"
    name="active"
    checked={Boolean(formulaire.active)}
    onChange={changerChamp}
  />
  Association active
</label>

<LogoUploader
  valeur={formulaire.logo}
  logoDefaut={logoDefaut}
  onChange={(logo) =>
    setFormulaire((precedent) => ({
      ...precedent,
      logo,
    }))
  }
/>

          <div className="modal-actions">
            <button
              type="button"
              onClick={fermer}
            >
              Annuler
            </button>

            <button type="submit">
  {association ? "Enregistrer" : "Créer"}
</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AssociationModal;