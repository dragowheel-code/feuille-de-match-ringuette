import { useState } from "react";

import ListePantalons from "./ListePantalons";
import PantalonsModal from "./PantalonsModal";
import RemisePantalonModal from "./RemisePantalonModal";
import ListeRemisesPantalons from "./ListeRemisesPantalons";

function GestionPantalons({
  retour,
  associationActive,

  joueuses = [],

  gestionPantalons,
  gestionPantalonsJoueuses,
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

  const [
  fenetreRemiseOuverte,
  setFenetreRemiseOuverte,
] = useState(false);

const [
  erreursRemise,
  setErreursRemise,
] = useState([]);

const formulaireRemiseInitial = {
  equipeId: "",
  affectationId: "",
  pantalonId: "",
  quantite: 1,

  dateRemise:
    new Date()
      .toISOString()
      .slice(0, 10),

  remplacement: false,
  commentaire: "",
};

const [
  formulaireRemise,
  setFormulaireRemise,
] = useState(
  formulaireRemiseInitial
);

  const formulairePantalonsInitial = {
  associationId:
    associationActive?.id || "",

  taille: "",
  quantiteStock: 0,

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

      const joueusesAssociation =
  associationActive
    ? joueuses.filter(
        (joueuse) =>
          String(joueuse.associationId) ===
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

  taille:
    pantalon.taille ?? "",

  quantiteStock:
    pantalon.quantiteStock ?? 0,

  actif:
    pantalon.actif ?? true,
});

    setFenetrePantalonsOuverte(true);
  }

  function fermerPantalons() {
    setErreursPantalons([]);
    setPantalonSelectionne(null);
    setFenetrePantalonsOuverte(false);
  }

  async function enregistrerPantalons(
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

  const resultat =
    pantalonSelectionne
      ? await modifierPantalons({
          ...donneesPantalons,
          id:
            pantalonSelectionne.id,
        })
      : await ajouterPantalons(
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

  async function demanderSuppression(
  pantalon
) {
  const confirmation =
    window.confirm(
      `Supprimer l'inventaire de pantalons taille ${pantalon.taille} ?`
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
    await supprimerPantalons(
      pantalon.id
    );

  if (!resultat.succes) {
    window.alert(
      resultat.erreurs?.join(
        "\n"
      ) ||
        "Impossible de supprimer le pantalon."
    );
  }
}

  function ouvrirRemisePantalon() {
  setErreursRemise([]);

  setFormulaireRemise({
    ...formulaireRemiseInitial,
  });

  setFenetreRemiseOuverte(true);
}

function fermerRemisePantalon() {
  setErreursRemise([]);
  setFenetreRemiseOuverte(false);
}

async function enregistrerRemisePantalon(
  formulaire
) {
  const resultat =
  await gestionPantalonsJoueuses
    .ajouterPantalonJoueuse(
      formulaire
    );

    if (!resultat.succes) {
    setErreursRemise(
      resultat.erreurs ?? []
    );
    return;
  }

  fermerRemisePantalon();
}

const remisesPantalons =
  gestionPantalonsJoueuses
    ?.pantalonsJoueuses ?? [];

  const quantiteTotale =
  pantalonsAssociation.reduce(
    (total, pantalon) =>
      total +
      Number(
        pantalon.quantiteStock || 0
      ),
    0
  );

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
            Retour page equipement
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

          <button
  type="button"
  onClick={ouvrirRemisePantalon}
  disabled={!associationActive}
>
  Remettre un pantalon
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
  <strong>
    Tailles en inventaire :
  </strong>{" "}
  {pantalonsAssociation.length}
</p>

<p>
  <strong>
    Pantalons en stock :
  </strong>{" "}
  {quantiteTotale}
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

          <section className="historique-pantalons">
  <h2>
    Historique des remises
  </h2>

    <ListeRemisesPantalons
     remises={remisesPantalons}
     pantalons={pantalonsAssociation}
     joueuses={joueusesAssociation}
    />
</section>

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
          <RemisePantalonModal
           ouverte={fenetreRemiseOuverte}
           fermer={fermerRemisePantalon}
           enregistrer={enregistrerRemisePantalon}
           formulaire={formulaireRemise}
           setFormulaire={setFormulaireRemise}
           erreurs={erreursRemise}
           joueuses={joueusesAssociation}
           pantalons={pantalonsAssociation}
          />
        </>
      )}
    </section>
  );
}

export default GestionPantalons;