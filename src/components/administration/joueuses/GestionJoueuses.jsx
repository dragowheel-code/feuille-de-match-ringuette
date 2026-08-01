import { useState } from "react";

import ListeJoueuses from "./ListeJoueuses";
import JoueuseModal from "./JoueuseModal";

function GestionJoueuses({
  retour,
  associations,
  equipes,
  gestionJoueuses,
}) {
  const {
  joueuses,
  ajouterJoueuse,
  modifierJoueuse,
  supprimerJoueuse,
} = gestionJoueuses;

  const [
    fenetreJoueuseOuverte,
    setFenetreJoueuseOuverte,
  ] = useState(false);

  const [
    erreursJoueuse,
    setErreursJoueuse,
  ] = useState([]);

  const [
    joueuseSelectionnee,
    setJoueuseSelectionnee,
  ] = useState(null);

  const formulaireJoueuseInitial = {
    associationId: "",
    equipeId: "",

    nomComplet: "",
    numeroInscription: "",

    adresse: "",
    ville: "",
    codePostal: "",
    telephone: "",

    sexe: "",
    dateNaissance: "",
    age: "",

    categorie: "",
    codeCategorie: "",
    saison: "",
  };

  const [
    formulaireJoueuse,
    setFormulaireJoueuse,
  ] = useState(formulaireJoueuseInitial);

  function ouvrirAjoutJoueuse() {
    setErreursJoueuse([]);
    setJoueuseSelectionnee(null);
    setFormulaireJoueuse(
      formulaireJoueuseInitial
    );
    setFenetreJoueuseOuverte(true);
  }

  function fermerAjoutJoueuse() {
    setErreursJoueuse([]);
    setJoueuseSelectionnee(null);
    setFenetreJoueuseOuverte(false);
  }

  function ouvrirModificationJoueuse(joueuse) {
    setErreursJoueuse([]);
    setJoueuseSelectionnee(joueuse);

    setFormulaireJoueuse({
      associationId:
        joueuse.associationId ?? "",
      equipeId: joueuse.equipeId ?? "",

      nomComplet: joueuse.nomComplet ?? "",
      numeroInscription:
        joueuse.numeroInscription ?? "",

      adresse: joueuse.adresse ?? "",
      ville: joueuse.ville ?? "",
      codePostal: joueuse.codePostal ?? "",
      telephone: joueuse.telephone ?? "",

      sexe: joueuse.sexe ?? "",
      dateNaissance:
        joueuse.dateNaissance ?? "",
      age: joueuse.age ?? "",

      categorie: joueuse.categorie ?? "",
      codeCategorie:
        joueuse.codeCategorie ?? "",
      saison: joueuse.saison ?? "",
    });

    setFenetreJoueuseOuverte(true);
  }

  function enregistrerJoueuse(
    donneesJoueuse
  ) {
    const resultat = joueuseSelectionnee
      ? modifierJoueuse({
          ...donneesJoueuse,
          id: joueuseSelectionnee.id,
        })
      : ajouterJoueuse(donneesJoueuse);

    if (!resultat.succes) {
      setErreursJoueuse(resultat.erreurs);
      return;
    }

    fermerAjoutJoueuse();
  }

  function demanderSuppression(joueuse) {
    const confirmation = window.confirm(
      `Supprimer la joueuse « ${joueuse.nomComplet} » ?`
    );

    if (!confirmation) {
      return;
    }

    const resultat = supprimerJoueuse(
      joueuse.id
    );

    if (!resultat.succes) {
      window.alert(
        resultat.erreur ??
          "Impossible de supprimer la joueuse."
      );
    }
  }

  return (
    <section className="gestion-joueuses">
      <header className="gestion-joueuses-entete">
        <div>
          <h1>Joueuses</h1>

          <p>
            Gérez les joueuses enregistrées dans
            la base de données.
          </p>
        </div>

        <div className="gestion-joueuses-actions">
          <button
            type="button"
            onClick={retour}
          >
            Retour
          </button>

          <button
            type="button"
            onClick={ouvrirAjoutJoueuse}
          >
            Nouvelle joueuse
          </button>
        </div>
      </header>

      <ListeJoueuses
        joueuses={joueuses}
        associations={associations}
        equipes={equipes}
        modifierJoueuse={
          ouvrirModificationJoueuse
        }
        demanderSuppression={
          demanderSuppression
        }
      />

      <JoueuseModal
        ouverte={fenetreJoueuseOuverte}
        fermer={fermerAjoutJoueuse}
        enregistrer={enregistrerJoueuse}
        formulaire={formulaireJoueuse}
        setFormulaire={
          setFormulaireJoueuse
        }
        joueuse={joueuseSelectionnee}
        associations={associations}
        equipes={equipes}
        erreurs={erreursJoueuse}
      />
    </section>
  );
}

export default GestionJoueuses;