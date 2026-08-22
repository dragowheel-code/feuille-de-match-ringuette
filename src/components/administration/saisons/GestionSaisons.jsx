import { useState } from "react";

import ListeSaisons from "./ListeSaisons";
import SaisonModal from "./SaisonModal";

function GestionSaisons({
  retour,
  associationActive,
  gestionSaisons,
}) {
  const {
    saisons,
    ajouterSaison,
    modifierSaison,
    supprimerSaison,
  } = gestionSaisons;

  const [
    fenetreSaisonOuverte,
    setFenetreSaisonOuverte,
  ] = useState(false);

  const [
    erreursSaison,
    setErreursSaison,
  ] = useState([]);

  const [
    saisonSelectionnee,
    setSaisonSelectionnee,
  ] = useState(null);

  const formulaireSaisonInitial = {
  associationId:
    associationActive?.id || "",

  nom: "",
  anneeReference: "",

  dateDebut: "",
  dateFin: "",

  active: false,
  verrouillee: false,
  notes: "",
};

  const [
    formulaireSaison,
    setFormulaireSaison,
  ] = useState(formulaireSaisonInitial);

  function ouvrirAjoutSaison() {
    setErreursSaison([]);
    setSaisonSelectionnee(null);
    setFormulaireSaison(formulaireSaisonInitial);
    setFenetreSaisonOuverte(true);
  }

  function fermerSaison() {
    setErreursSaison([]);
    setSaisonSelectionnee(null);
    setFenetreSaisonOuverte(false);
  }

  function ouvrirModificationSaison(saison) {
  setErreursSaison([]);
  setSaisonSelectionnee(saison);

  setFormulaireSaison({
    associationId:
      saison.associationId ?? "",

    nom:
      saison.nom ?? "",

    anneeReference:
      saison.anneeReference ?? "",

    dateDebut:
      saison.dateDebut ?? "",

    dateFin:
      saison.dateFin ?? "",

    active:
      saison.active ?? false,

    verrouillee:
      saison.verrouillee ?? false,

    notes:
      saison.notes ?? "",
  });

  setFenetreSaisonOuverte(true);
}

  async function enregistrerSaison(
  donneesSaison
) {
  const anneeReference =
    donneesSaison.dateDebut
      ? new Date(
          donneesSaison.dateDebut
        ).getFullYear()
      : null;

  const donneesCompletes = {
    ...donneesSaison,

    associationId:
      associationActive?.id || "",

    anneeReference,
  };

  const resultat = saisonSelectionnee
    ? await modifierSaison({
        ...donneesCompletes,
        id: saisonSelectionnee.id,
      })
    : await ajouterSaison(
        donneesCompletes
      );

  if (!resultat.succes) {
    setErreursSaison(
      resultat.erreurs ?? []
    );
    return;
  }

  fermerSaison();
}

  async function demanderSuppression(
  saison
) {
  const confirmation = window.confirm(
    `Supprimer la saison « ${saison.nom} » ?`
  );

  if (!confirmation) {
    return;
  }

  const resultat =
    await supprimerSaison(
      saison.id
    );

  if (!resultat.succes) {
    window.alert(
      resultat.erreur ??
        "Impossible de supprimer la saison."
    );
  }
}

  return (
    <section className="gestion-saisons">
      <header className="gestion-saisons-entete">
        <div>
          <h1>Saisons</h1>

          <p>
            Gérez les saisons enregistrées dans la
            base de données.
          </p>
        </div>

        <div className="gestion-saisons-actions">
          <button
            type="button"
            onClick={retour}
          >
            Retour
          </button>

          <button
            type="button"
            onClick={ouvrirAjoutSaison}
          >
            Nouvelle saison
          </button>
        </div>
      </header>

      <ListeSaisons
        saisons={saisons}
        modifierSaison={ouvrirModificationSaison}
        demanderSuppression={demanderSuppression}
      />

      <SaisonModal
        ouverte={fenetreSaisonOuverte}
        fermer={fermerSaison}
        enregistrer={enregistrerSaison}
        formulaire={formulaireSaison}
        setFormulaire={setFormulaireSaison}
        saison={saisonSelectionnee}
        erreurs={erreursSaison}
      />
    </section>
  );
}

export default GestionSaisons;