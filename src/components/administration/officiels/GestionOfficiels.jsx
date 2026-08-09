import { useState } from "react";

import {
  creerOfficiel,
  modifierOfficiel,
  supprimerOfficiel,
} from "../../../domain/officiels";

import OfficielModal from "../../../modals/OfficielModal";
import ListeOfficiels from "./ListeOfficiels";
import FicheOfficielModal from "./FicheOfficielModal";

function creerFormulaireVide() {
  return {
    id: null,
    nom: "",
    arbitre: false,
    chronometreur: false,
    marqueur: false,
    operateur30s: false,
    mode: "ajout",
    actif: true,
  };
}

function GestionOfficiels({
  retour,
  associationActive,
  officiels,
  setOfficiels,
}) {

    const officielsAssociation = officiels.filter(
  (officiel) =>
    (
      !officiel.associationId ||
      String(officiel.associationId) ===
        String(associationActive?.id)
    ) &&
    officiel.actif !== false
);

  const [
    officielFormulaire,
    setOfficielFormulaire,
  ] = useState(creerFormulaireVide);

  const [
    modalEditionOuverte,
    setModalEditionOuverte,
  ] = useState(false);

  const [
    officielConsulte,
    setOfficielConsulte,
  ] = useState(null);

  function ouvrirAjout() {
    setOfficielFormulaire(
      creerFormulaireVide()
    );

    setModalEditionOuverte(true);
  }

  function ouvrirFiche(officiel) {
    setOfficielConsulte(officiel);
  }

  function fermerFiche() {
    setOfficielConsulte(null);
  }

  function ouvrirModification(officiel) {
    setOfficielFormulaire({
      ...officiel,
      mode: "modification",
    });

    setOfficielConsulte(null);
    setModalEditionOuverte(true);
  }

  function fermerEdition() {
    setModalEditionOuverte(false);

    setOfficielFormulaire(
      creerFormulaireVide()
    );
  }

  function validerFormulaire() {
    const nom =
      officielFormulaire.nom.trim();

    if (!nom) {
      alert(
        "Entre le nom de l’officiel."
      );
      return false;
    }

    const auMoinsUnRole =
      officielFormulaire.arbitre ||
      officielFormulaire.chronometreur ||
      officielFormulaire.marqueur ||
      officielFormulaire.operateur30s;

    if (!auMoinsUnRole) {
      alert(
        "Choisis au moins un rôle pour cet officiel."
      );
      return false;
    }

    const nomExisteDeja =
      officiels.some((officiel) => {
        const memeNom =
          officiel.nom
            .trim()
            .toLocaleLowerCase(
              "fr-CA"
            ) ===
          nom.toLocaleLowerCase(
            "fr-CA"
          );

        if (
          officielFormulaire.mode ===
          "modification"
        ) {
          return (
            memeNom &&
            String(officiel.id) !==
              String(
                officielFormulaire.id
              )
          );
        }

        return memeNom;
      });

    if (nomExisteDeja) {
      alert(
        "Cet officiel existe déjà."
      );
      return false;
    }

    return true;
  }

  function confirmerEdition() {
    if (!validerFormulaire()) {
      return;
    }

    const nom =
      officielFormulaire.nom.trim();

    if (
      officielFormulaire.mode ===
      "modification"
    ) {
      setOfficiels(
        (anciensOfficiels) =>
          modifierOfficiel(
  anciensOfficiels,
  officielFormulaire.id,
  {
    associationId:
      officielFormulaire.associationId ||
      associationActive?.id ||
      "",
    nom,
    arbitre:
      officielFormulaire.arbitre,
    chronometreur:
      officielFormulaire.chronometreur,
    marqueur:
      officielFormulaire.marqueur,
    operateur30s:
      officielFormulaire.operateur30s,
    actif:
      officielFormulaire.actif !== false,
  }
)
      );

      fermerEdition();
      return;
    }

    const nouvelOfficiel =
  creerOfficiel({
    id: crypto.randomUUID(),
    associationId:
      associationActive?.id ?? "",
    nom,
    arbitre:
      officielFormulaire.arbitre,
    chronometreur:
      officielFormulaire.chronometreur,
    marqueur:
      officielFormulaire.marqueur,
    operateur30s:
      officielFormulaire.operateur30s,
    actif: true,
  });

    setOfficiels(
      (anciensOfficiels) => [
        ...anciensOfficiels,
        nouvelOfficiel,
      ]
    );

    fermerEdition();
  }

  function demanderSuppression(
    officiel
  ) {
    if (
      !confirm(
        `Supprimer ${officiel.nom} ?`
      )
    ) {
      return;
    }

    setOfficiels(
      (anciensOfficiels) =>
        supprimerOfficiel(
          anciensOfficiels,
          officiel.id
        )
    );

    setOfficielConsulte(null);
  }

  return (
    <section className="administration-contenu">
      <div className="administration-section-entete">
        <div>
          <h2>Officiels</h2>

          <p>
            Gérer les officiels et les
            rôles qu'ils peuvent
            occuper.
          </p>
        </div>

        <button
          type="button"
          onClick={retour}
        >
          Retour
        </button>
      </div>

      <div className="administration-actions">
        <button
          type="button"
          onClick={ouvrirAjout}
        >
          Ajouter un officiel
        </button>
      </div>

      <ListeOfficiels
  officiels={officielsAssociation}
  ouvrirFiche={ouvrirFiche}
/>

      <FicheOfficielModal
        officiel={officielConsulte}
        fermer={fermerFiche}
        modifier={ouvrirModification}
        supprimer={
          demanderSuppression
        }
      />

      <OfficielModal
        ouverte={modalEditionOuverte}
        officiel={
          officielFormulaire
        }
        setOfficiel={
          setOfficielFormulaire
        }
        confirmer={
          confirmerEdition
        }
        fermer={fermerEdition}
      />
    </section>
  );
}

export default GestionOfficiels;