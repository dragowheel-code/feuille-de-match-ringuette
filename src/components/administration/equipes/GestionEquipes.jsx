import { useState } from "react";
import { useGestionEquipes } from "../../../hooks/useGestionEquipes";

import ListeEquipes from "./ListeEquipes";
import EquipeModal from "./EquipeModal";

function GestionEquipes({
  retour,
  associations,
}) {
  const {
    equipes,
    ajouterEquipe,
    modifierEquipe,
    supprimerEquipe,
  } = useGestionEquipes();

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
    associationId: "",
    nom: "",
    abreviation: "",
    calibre: "",
  };

  const [
    formulaireEquipe,
    setFormulaireEquipe,
  ] = useState(formulaireEquipeInitial);

  function ouvrirAjoutEquipe() {
    setErreursEquipe([]);
    setEquipeSelectionnee(null);
    setFormulaireEquipe(formulaireEquipeInitial);
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
      associationId: equipe.associationId,
      nom: equipe.nom,
      abreviation: equipe.abreviation,
      calibre: equipe.calibre,
    });

    setFenetreEquipeOuverte(true);
  }

  function enregistrerEquipe(donneesEquipe) {
    const resultat = equipeSelectionnee
      ? modifierEquipe({
          ...donneesEquipe,
          id: equipeSelectionnee.id,
        })
      : ajouterEquipe(donneesEquipe);

    if (!resultat.succes) {
      setErreursEquipe(resultat.erreurs);
      return;
    }

    fermerAjoutEquipe();
  }

  function demanderSuppression(equipe) {
    const confirmation = window.confirm(
      `Supprimer l'équipe « ${equipe.nom} » ?`
    );

    if (!confirmation) {
      return;
    }

    const resultat = supprimerEquipe(equipe.id);

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
          >
            Nouvelle équipe
          </button>
        </div>
      </header>

      <ListeEquipes
        equipes={equipes}
        associations={associations}
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
        associations={associations}
        erreurs={erreursEquipe}
      />
    </section>
  );
  
}

export default GestionEquipes;