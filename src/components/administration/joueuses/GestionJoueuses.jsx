import { useState } from "react";

import ListeJoueuses from "./ListeJoueuses";
import JoueuseModal from "./JoueuseModal";

function GestionJoueuses({
  retour,
  associations,
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

  nomComplet: "",
  numeroInscription: "",

  adresse: "",
  ville: "",
  codePostal: "",
  telephone: "",

  sexe: "",
  dateNaissance: "",

  active: true,
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

  function ouvrirModificationJoueuse(
  joueuse
) {
  setErreursJoueuse([]);
  setJoueuseSelectionnee(joueuse);

  setFormulaireJoueuse({
    associationId:
      joueuse.associationId ?? "",

    nomComplet:
      joueuse.nomComplet ?? "",

    numeroInscription:
      joueuse.numeroInscription ?? "",

    adresse:
      joueuse.adresse ?? "",

    ville:
      joueuse.ville ?? "",

    codePostal:
      joueuse.codePostal ?? "",

    telephone:
      joueuse.telephone ?? "",

    sexe:
      joueuse.sexe ?? "",

    dateNaissance:
      joueuse.dateNaissance ?? "",

    active:
      joueuse.active !== false,
  });

  setFenetreJoueuseOuverte(true);
}

  async function enregistrerJoueuse(
  donneesJoueuse
) {
  const resultat = joueuseSelectionnee
  ? await modifierJoueuse({
      ...donneesJoueuse,
      id: joueuseSelectionnee.id,
    })
  : await ajouterJoueuse(
      donneesJoueuse
    );

console.log(
  "Résultat enregistrement joueuse :",
  resultat
);
console.log(
  "Erreur exacte :",
  resultat.erreurs?.[0]
);

  if (!resultat.succes) {
    setErreursJoueuse(
      resultat.erreurs ?? []
    );
    return;
  }

  fermerAjoutJoueuse();
}

  async function demanderSuppression(
  joueuse
) {
  const confirmation = window.confirm(
    `Supprimer la joueuse « ${joueuse.nomComplet} » ?`
  );

  if (!confirmation) {
    return;
  }

  const resultat =
    await supprimerJoueuse(
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
        erreurs={erreursJoueuse}
      />
    </section>
  );
}

export default GestionJoueuses;