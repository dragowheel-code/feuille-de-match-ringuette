import { useState } from "react";

import ListePantalons from "./ListePantalons";
import PantalonsModal from "./PantalonsModal";

function GestionPantalons({
  retour,
  associationActive,
  gestionPantalons,
}) {
  const {
    pantalons = [],
    ajouterPantalons,
    modifierPantalons,
    supprimerPantalons,
  } = gestionPantalons ?? {};

  const [
    fenetrePantalonsOuverte,
    setFenetrePantalonsOuverte,
  ] = useState(false);

  const [
    erreursPantalons,
    setErreursPantalons,
  ] = useState([]);

  const [
    pantalonSelectionne,
    setPantalonSelectionne,
  ] = useState(null);

  const formulairePantalonsInitial = {
    associationId:
      associationActive?.id || "",

    numero: "",
    taille: "",
    etat: "Bon",
    notes: "",

    actif: true,
  };

  const [
    formulairePantalons,
    setFormulairePantalons,
  ] = useState(formulairePantalonsInitial);

  const pantalonsAssociation =
    associationActive
      ? pantalons.filter(
          (pantalon) =>
            String(pantalon.associationId) ===
            String(associationActive.id)
        )
      : [];

  function ouvrirAjoutPantalons() {
    setErreursPantalons([]);
    setPantalonSelectionne(null);

    setFormulairePantalons({
      ...formulairePantalonsInitial,

      associationId:
        associationActive?.id || "",
    });

    setFenetrePantalonsOuverte(true);
  }

  function ouvrirModificationPantalons(
    pantalon
  ) {
    setErreursPantalons([]);
    setPantalonSelectionne(pantalon);

    setFormulairePantalons({
      associationId:
        pantalon.associationId ?? "",

      numero: pantalon.numero ?? "",
      taille: pantalon.taille ?? "",
      etat: pantalon.etat ?? "Bon",
      notes: pantalon.notes ?? "",

      actif: pantalon.actif ?? true,
    });

    setFenetrePantalonsOuverte(true);
  }

  function fermerPantalons() {
    setErreursPantalons([]);
    setPantalonSelectionne(null);
    setFenetrePantalonsOuverte(false);
  }

  function enregistrerPantalons(
    donneesPantalons
  ) {
    if (
      typeof ajouterPantalons !==
        "function" ||
      typeof modifierPantalons !==
        "function"
    ) {
      setErreursPantalons([
        "La gestion des pantalons n'est pas correctement initialisée.",
      ]);
      return;
    }

    const resultat = pantalonSelectionne
      ? modifierPantalons({
          ...donneesPantalons,
          id: pantalonSelectionne.id,
        })
      : ajouterPantalons(
          donneesPantalons
        );

    if (!resultat.succes) {
      setErreursPantalons(
        resultat.erreurs ?? []
      );
      return;
    }

    fermerPantalons();
  }

  function demanderSuppression(pantalon) {
    const confirmation = window.confirm(
      `Supprimer le pantalon numéro ${pantalon.numero}, taille ${pantalon.taille} ?`
    );

    if (!confirmation) {
      return;
    }

    if (
      typeof supprimerPantalons !==
      "function"
    ) {
      window.alert(
        "La gestion des pantalons n'est pas correctement initialisée."
      );
      return;
    }

    const resultat =
      supprimerPantalons(pantalon.id);

    if (!resultat.succes) {
      window.alert(
        resultat.erreurs?.join("\n") ||
          "Impossible de supprimer le pantalon."
      );
    }
  }

  return (
    <section className="gestion-pantalons">
      <header className="gestion-pantalons-entete">
        <div>
          <h1>
            Équipements — Pantalons
          </h1>

          <p>
            Gérez l’inventaire des
            pantalons de l’association active.
          </p>
        </div>

        <div className="gestion-pantalons-actions">
          <button
            type="button"
            onClick={retour}
          >
            Retour
          </button>

          <button
            type="button"
            onClick={
              ouvrirAjoutPantalons
            }
            disabled={
              !associationActive ||
              typeof ajouterPantalons !==
                "function"
            }
          >
            Nouveau pantalon
          </button>
        </div>
      </header>

      {!associationActive ? (
        <p>
          Une association active est
          requise.
        </p>
      ) : (
        <>
          <p>
            <strong>
              Association :
            </strong>{" "}
            {associationActive.nom}
          </p>

          <p>
            {pantalonsAssociation.length}{" "}
            pantalon
            {pantalonsAssociation.length >
            1
              ? "s"
              : ""}
          </p>

          <ListePantalons
            pantalons={
              pantalonsAssociation
            }
            modifierPantalon={
              ouvrirModificationPantalons
            }
            demanderSuppression={
              demanderSuppression
            }
          />

          <PantalonsModal
            ouverte={
              fenetrePantalonsOuverte
            }
            fermer={fermerPantalons}
            enregistrer={
              enregistrerPantalons
            }
            formulaire={
              formulairePantalons
            }
            setFormulaire={
              setFormulairePantalons
            }
            pantalon={
              pantalonSelectionne
            }
            erreurs={erreursPantalons}
          />
        </>
      )}
    </section>
  );
}

export default GestionPantalons;