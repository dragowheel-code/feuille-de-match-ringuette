import { useState } from "react";

import ListePersonnelEquipe from "./ListePersonnelEquipe";
import PersonnelEquipeModal from "./PersonnelEquipeModal";
import FichePersonnelEquipeModal from "./FichePersonnelEquipeModal";

function GestionPersonnelEquipe({
  retour,
  associationActive,
  gestionPersonnelEquipe,
}) {
  const {
    personnelEquipe,
    ajouterPersonnel,
    modifierPersonnel,
    supprimerPersonnel,
  } = gestionPersonnelEquipe;

  const [
    fenetrePersonnelOuverte,
    setFenetrePersonnelOuverte,
  ] = useState(false);

  const [
    erreursPersonnel,
    setErreursPersonnel,
  ] = useState([]);

  const [
    personnelSelectionne,
    setPersonnelSelectionne,
  ] = useState(null);

  const [
    fenetreFicheOuverte,
    setFenetreFicheOuverte,
  ] = useState(false);

  const [
    personnelAffiche,
    setPersonnelAffiche,
  ] = useState(null);

  const formulaireInitial = {
    associationId:
      associationActive?.id || "",

    nomComplet: "",
    courriel: "",
    telephone: "",

    pnce: {
      numero: "",
      introduction: false,
      ethiqueSportive: false,
      competition: false,
    },

    actif: true,
  };

  const [
    formulairePersonnel,
    setFormulairePersonnel,
  ] = useState(
    formulaireInitial
  );

  const personnelAssociation =
    associationActive
      ? personnelEquipe.filter(
          (personnel) =>
            String(
              personnel.associationId
            ) ===
            String(
              associationActive.id
            )
        )
      : [];

  const personnelTries =
    [...personnelAssociation].sort(
      (a, b) =>
        String(
          a.nomComplet
        ).localeCompare(
          String(
            b.nomComplet
          ),
          "fr-CA"
        )
    );

  function ouvrirAjoutPersonnel() {
    setErreursPersonnel([]);

    setPersonnelSelectionne(
      null
    );

    setFormulairePersonnel({
      ...formulaireInitial,

      associationId:
        associationActive?.id ||
        "",
    });

    setFenetrePersonnelOuverte(
      true
    );
  }

  function ouvrirModificationPersonnel(
    personnel
  ) {
    setErreursPersonnel([]);

    setPersonnelSelectionne(
      personnel
    );

    setFormulairePersonnel({
      associationId:
        personnel.associationId ??
        "",

      nomComplet:
        personnel.nomComplet ??
        "",

      courriel:
        personnel.courriel ??
        "",

      telephone:
        personnel.telephone ??
        "",

      pnce: {
        numero:
          personnel.pnce
            ?.numero ??
          "",

        introduction:
          personnel.pnce
            ?.introduction ??
          false,

        ethiqueSportive:
          personnel.pnce
            ?.ethiqueSportive ??
          false,

        competition:
          personnel.pnce
            ?.competition ??
          false,
      },

      actif:
        personnel.actif ??
        true,
    });

    setFenetrePersonnelOuverte(
      true
    );
  }

  function fermerPersonnel() {
    setErreursPersonnel([]);

    setPersonnelSelectionne(
      null
    );

    setFenetrePersonnelOuverte(
      false
    );
  }

  function enregistrerPersonnel(
    donneesPersonnel
  ) {
    const resultat =
      personnelSelectionne
        ? modifierPersonnel({
            ...donneesPersonnel,

            id:
              personnelSelectionne.id,
          })
        : ajouterPersonnel(
            donneesPersonnel
          );

    if (!resultat.succes) {
      setErreursPersonnel(
        resultat.erreurs ??
          []
      );

      return;
    }

    fermerPersonnel();
  }

  function demanderSuppression(
    personnel
  ) {
    const confirmation =
      window.confirm(
        `Supprimer ${personnel.nomComplet} du personnel d'équipe ?`
      );

    if (!confirmation) {
      return;
    }

    const resultat =
      supprimerPersonnel(
        personnel.id
      );

    if (!resultat.succes) {
      window.alert(
        resultat.erreurs?.join(
          "\n"
        ) ||
          "Impossible de supprimer ce membre du personnel."
      );
    }
  }

  function afficherPersonnel(
  personnel
) {
  setPersonnelAffiche(
    personnel
  );

  setFenetreFicheOuverte(
    true
  );
}

function fermerFichePersonnel() {
  setFenetreFicheOuverte(
    false
  );

  setPersonnelAffiche(
    null
  );
}

  return (
    <section className="gestion-personnel-equipe">
      <header className="gestion-personnel-equipe-entete">
        <div>
          <h1>
            Personnel d'équipe
          </h1>

          <p>
            Gérez la liste du personnel
            disponible pour
            l'association active.
          </p>
        </div>

        <div className="gestion-personnel-equipe-actions">
          <button
            type="button"
            onClick={retour}
          >
            Retour
          </button>

          <button
            type="button"
            onClick={
              ouvrirAjoutPersonnel
            }
            disabled={
              !associationActive
            }
          >
            Nouveau membre
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
            {
              personnelTries.length
            }{" "}
            membre
            {personnelTries.length >
            1
              ? "s"
              : ""}
          </p>

          <ListePersonnelEquipe
           personnel={
           personnelTries
           }
           afficherPersonnel={
           afficherPersonnel
           }
           modifierPersonnel={
           ouvrirModificationPersonnel
           }
           demanderSuppression={
           demanderSuppression
           }
          />

          <PersonnelEquipeModal
            ouverte={
              fenetrePersonnelOuverte
            }
            fermer={
              fermerPersonnel
            }
            enregistrer={
              enregistrerPersonnel
            }
            formulaire={
              formulairePersonnel
            }
            setFormulaire={
              setFormulairePersonnel
            }
            personnel={
              personnelSelectionne
            }
            erreurs={
              erreursPersonnel
            }
          />
          <FichePersonnelEquipeModal
           ouverte={
           fenetreFicheOuverte
           }
           fermer={
           fermerFichePersonnel
           }
           personnel={
           personnelAffiche
           }
          />
        </>
      )}
    </section>
  );
}

export default GestionPersonnelEquipe;