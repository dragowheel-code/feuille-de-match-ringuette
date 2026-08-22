import { useState } from "react";
import { obtenirNomEquipe } from "../../../domain/equipes/obtenirNomEquipe";

import ListeEquipes from "./ListeEquipes";
import EquipeModal from "./EquipeModal";

function GestionEquipes({
  retour,
  associationActive,
  saisonActive,
  gestionEquipes,
}) {
  const {
  equipes,
  ajouterEquipe,
  modifierEquipe,
  supprimerEquipe,
} = gestionEquipes;

  const [
    fenetreEquipeOuverte,
    setFenetreEquipeOuverte,
  ] = useState(false);

  const [
    erreursEquipe,
    setErreursEquipe,
  ] = useState([]);

  const [
    equipeSelectionnee,
    setEquipeSelectionnee,
  ] = useState(null);

  const formulaireEquipeInitial = {
  saisonId: saisonActive?.id || "",
  associationId:
    associationActive?.id || "",

  categorie: "",
  niveau: "",
  numeroEquipe: "",

  abreviation: "",
};
  const equipesAffichees =
  associationActive && saisonActive
    ? equipes.filter(
        (equipe) =>
          equipe.associationId ===
            associationActive.id &&
          equipe.saisonId ===
            saisonActive.id
      )
    : [];

  const [
    formulaireEquipe,
    setFormulaireEquipe,
  ] = useState(formulaireEquipeInitial);

  function ouvrirAjoutEquipe() {
    setErreursEquipe([]);
    setEquipeSelectionnee(null);
    setFormulaireEquipe({
  ...formulaireEquipeInitial,

  saisonId: saisonActive?.id || "",
  associationId:
    associationActive?.id || "",
});
    setFenetreEquipeOuverte(true);
  }

  function fermerAjoutEquipe() {
    setErreursEquipe([]);
    setEquipeSelectionnee(null);
    setFenetreEquipeOuverte(false);
  }

  function ouvrirModificationEquipe(equipe) {
    setErreursEquipe([]);
    setEquipeSelectionnee(equipe);

    setFormulaireEquipe({
  saisonId: equipe.saisonId ?? "",
  associationId:
    equipe.associationId ?? "",

  categorie: equipe.categorie ?? "",
  niveau: equipe.niveau ?? "",
  numeroEquipe:
    equipe.numeroEquipe ?? "",

  abreviation:
    equipe.abreviation ?? "",
});

    setFenetreEquipeOuverte(true);
  }
  

  async function enregistrerEquipe(
  donneesEquipe
) {
  const resultat = equipeSelectionnee
    ? await modifierEquipe({
        ...donneesEquipe,
        id: equipeSelectionnee.id,
      })
    : await ajouterEquipe(
        donneesEquipe
      );

  if (!resultat.succes) {
    setErreursEquipe(
      resultat.erreurs ?? []
    );
    return;
  }

  fermerAjoutEquipe();
}

  async function demanderSuppression(
  equipe
) {
  const confirmation = window.confirm(
    `Supprimer l'équipe « ${obtenirNomEquipe(equipe)} » ?`
  );

  if (!confirmation) {
    return;
  }

  const resultat =
    await supprimerEquipe(
      equipe.id
    );

  if (!resultat.succes) {
    window.alert(
      resultat.erreur ??
        "Impossible de supprimer l'équipe."
    );
  }
}
  
  return (
    <section className="gestion-equipes">
      <header className="gestion-equipes-entete">
        <div>
          <h1>Équipes</h1>

          <p>
            Gérez les équipes enregistrées dans
            la base de données.
          </p>
        </div>

        <div className="gestion-equipes-actions">
          <button
            type="button"
            onClick={retour}
          >
            Retour
          </button>

          <button
  type="button"
  onClick={ouvrirAjoutEquipe}
  disabled={!associationActive || !saisonActive}
>
  Nouvelle équipe
</button>
        </div>
      </header>

      <ListeEquipes
  equipes={equipesAffichees}
  associations={
    associationActive ? [associationActive] : []
  }
  modifierEquipe={ouvrirModificationEquipe}
  demanderSuppression={demanderSuppression}
/>

      <EquipeModal
  ouverte={fenetreEquipeOuverte}
  fermer={fermerAjoutEquipe}
  enregistrer={enregistrerEquipe}
  formulaire={formulaireEquipe}
  setFormulaire={setFormulaireEquipe}
  equipe={equipeSelectionnee}
  associations={
    associationActive ? [associationActive] : []
  }
  erreurs={erreursEquipe}
/>
    </section>
  );
  
}

export default GestionEquipes;