import { useState } from "react";

import ListeAssociations from "./ListeAssociations";
import AssociationModal from "./AssociationModal";

function GestionAssociations({
  retournerAccueil,
  gestionAssociations,
}) {
  
  const {
  associations,
  ajouterAssociation,
  modifierAssociation,
  supprimerAssociation,
} = gestionAssociations;

  const [
    fenetreAssociationOuverte,
    setFenetreAssociationOuverte,
  ] = useState(false);

  const [
    erreursAssociation,
    setErreursAssociation,
  ] = useState([]);

  const [associationSelectionnee, setAssociationSelectionnee] = useState(null);

  const formulaireAssociationInitial = {
  active: false,
  code: "",
  nom: "",
  abreviation: "",
  ville: "",
  courriel: "",
  nomEquipes: "",
  logo: null,
  couleurFonce: "#000000",
  couleurClair: "#FFFFFF",
};

const [
  formulaireAssociation,
  setFormulaireAssociation,
] = useState(formulaireAssociationInitial);


  function ouvrirAjoutAssociation() {
  setErreursAssociation([]);
  setAssociationSelectionnee(null);
  setFormulaireAssociation(formulaireAssociationInitial);
  setFenetreAssociationOuverte(true);
}

  function fermerAjoutAssociation() {
  setErreursAssociation([]);
  setAssociationSelectionnee(null);
  setFenetreAssociationOuverte(false);
}

function ouvrirModificationAssociation(association) {
  setErreursAssociation([]);

  setAssociationSelectionnee(association);

  setFormulaireAssociation({
    active: Boolean(association.active),
    code: association.code,
    nom: association.nom,
    abreviation: association.abreviation,
    ville: association.ville,
    courriel: association.courriel ?? "",
    nomEquipes: association.nomEquipes,
    logo: association.logo,
    couleurFonce: association.couleurFonce,
    couleurClair: association.couleurClair,
  });

  setFenetreAssociationOuverte(true);
}

  async function enregistrerAssociation(donneesAssociation) 
  {
  const resultat = associationSelectionnee
  ? await modifierAssociation({
      ...donneesAssociation,
      id: associationSelectionnee.id,
    })
  : await ajouterAssociation(
      donneesAssociation
    );

  if (!resultat?.succes) {
    setErreursAssociation(
      resultat?.erreurs ?? [
        "Impossible d'enregistrer l'association.",
      ]
    );
    return;
  }

  setErreursAssociation([]);
  setAssociationSelectionnee(null);
  setFenetreAssociationOuverte(false);
}

async function demanderSuppression(association) 
{
  const confirmation = window.confirm(
    `Supprimer l'association « ${association.nom} » ?`
  );

  if (!confirmation) {
    return;
  }

  const resultat =
  await supprimerAssociation(
    association.id
  );

  if (!resultat.succes) {
    window.alert(
      resultat.erreur ?? "Impossible de supprimer l'association."
    );
  }
}
  return (
    <section className="gestion-associations">
      <header className="gestion-associations-entete">
        <div>
          <h1>Associations</h1>
          <p>
            Gérez les associations enregistrées dans
            la base de données.
          </p>
        </div>

        <div className="gestion-associations-actions">
          <button
            type="button"
            onClick={retournerAccueil}
        >
          Retour aux volets administratifs
          </button>

          <button
            type="button"
            onClick={ouvrirAjoutAssociation}
          >
            Nouvelle association
          </button>
        </div>
      </header>

      <ListeAssociations
  associations={associations}
  modifierAssociation={ouvrirModificationAssociation}
  demanderSuppression={demanderSuppression}
/>

  <AssociationModal
  ouverte={fenetreAssociationOuverte}
  fermer={fermerAjoutAssociation}
  enregistrer={enregistrerAssociation}
  formulaire={formulaireAssociation}
  setFormulaire={setFormulaireAssociation}
  association={associationSelectionnee}
  erreurs={erreursAssociation}
/>

    </section>
  );
}

export default GestionAssociations;