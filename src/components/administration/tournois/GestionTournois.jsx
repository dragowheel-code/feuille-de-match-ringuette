import { useState } from "react";

import ListeTournois from "./ListeTournois";
import TournoiModal from "./TournoiModal";
import FicheTournoiModal from "./FicheTournoiModal";

function GestionTournois({
  retournerAccueil,
  associationActive,
  saisonActive,
  associations,
  equipes,
  officiels,
  gestionTournois,
  gestionInscriptionsTournoi,
}) {
  const {
    tournois,
    ajouterTournoi,
    modifierTournoi,
    supprimerTournoi,
  } = gestionTournois;

  const [modalOuverte, setModalOuverte] =
    useState(false);

  const [formulaire, setFormulaire] =
    useState(null);

    const [
  tournoiConsulte,
  setTournoiConsulte,
] = useState(null);

const {
  supprimerInscriptionsTournoi,
} = gestionInscriptionsTournoi;

  function creerFormulaireVide() {
    return {
      id: null,
      saisonId:
        saisonActive?.id ?? "",
      associationOrganisatriceId:
        associationActive?.id ?? "",
      nom: "",
      dateDebut: "",
      dateFin: "",
      actif: true,
      mode: "ajout",
    };
  }

  function ouvrirFiche(tournoi) {
  setTournoiConsulte(tournoi);
}

function fermerFiche() {
  setTournoiConsulte(null);
}

  function ouvrirAjout() {
    setFormulaire(
      creerFormulaireVide()
    );

    setModalOuverte(true);
  }

  function ouvrirModification(
  tournoi
) {
  setTournoiConsulte(null);

  setFormulaire({
    ...tournoi,
    mode: "modification",
  });

  setModalOuverte(true);
}

  function fermerModal() {
    setModalOuverte(false);
    setFormulaire(null);
  }

  async function confirmer() {
  if (!formulaire) {
    return;
  }

  let resultat;

  if (
    formulaire.mode ===
    "modification"
  ) {
    resultat =
      await modifierTournoi(
        formulaire
      );
  } else {
    resultat =
      await ajouterTournoi({
        ...formulaire,

        saisonId:
          saisonActive?.id ?? "",

        associationOrganisatriceId:
          associationActive?.id ?? "",
      });
  }

  if (!resultat.succes) {
    alert(
      resultat.erreurs?.join(
        "\n"
      ) ||
        "Impossible d'enregistrer le tournoi."
    );

    return;
  }

  fermerModal();
}

  async function supprimer(
  tournoi
) {
  if (
    !confirm(
      `Supprimer le tournoi « ${tournoi.nom} » ?`
    )
  ) {
    return;
  }

  const resultatInscriptions =
    await supprimerInscriptionsTournoi(
      tournoi.id
    );

  if (
    !resultatInscriptions.succes
  ) {
    alert(
      resultatInscriptions.erreurs?.join(
        "\n"
      ) ||
        "Impossible de supprimer les inscriptions du tournoi."
    );

    return;
  }

  const resultatTournoi =
    await supprimerTournoi(
      tournoi.id
    );

  if (!resultatTournoi.succes) {
    alert(
      resultatTournoi.erreurs?.join(
        "\n"
      ) ||
        "Impossible de supprimer le tournoi."
    );

    return;
  }

  setTournoiConsulte(null);
}

  const tournoisDisponibles =
    tournois.filter(
      (tournoi) =>
        String(
          tournoi.associationOrganisatriceId
        ) ===
          String(
            associationActive?.id
          ) &&
        String(
          tournoi.saisonId
        ) ===
          String(
            saisonActive?.id
          )
    );

  if (!associationActive) {
    return (
      <section className="administration-contenu">
        <div className="administration-section-entete">
          <button
            type="button"
            onClick={retournerAccueil}
        >
          Retour aux volets administratifs
          </button>

          <h2>Tournois</h2>

          <p>
            Aucune association
            active.
          </p>
        </div>
      </section>
    );
  }

  if (!saisonActive) {
    return (
      <section className="administration-contenu">
        <div className="administration-section-entete">
          <button
            type="button"
            onClick={retournerAccueil}
        >
          Retour aux volets administratifs
          </button>

          <h2>Tournois</h2>

          <p>
            Aucune saison active.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="administration-contenu">
      <div className="administration-section-entete">
        <div>
          <h2>Tournois</h2>

          <p>
            Gérer les tournois
            organisés par
            l'association active.
          </p>
        </div>

        <button
          type="button"
          onClick={retournerAccueil}
        >
          Retour aux volets administratifs
        </button>
      </div>

      <div className="administration-actions">
        <button
          type="button"
          onClick={ouvrirAjout}
        >
          Ajouter un tournoi
        </button>
      </div>

      <ListeTournois
  tournois={ tournoisDisponibles }
  ouvrirFiche={ouvrirFiche}
  supprimer={supprimer}
/>
<FicheTournoiModal
  tournoi={tournoiConsulte}
  fermer={fermerFiche}
  modifier={ouvrirModification}
  associations={associations}
  equipes={equipes}
  officiels={officiels}
  gestionInscriptionsTournoi={
    gestionInscriptionsTournoi
  }
/>
      <TournoiModal
        ouverte={modalOuverte}
        tournoi={formulaire}
        setTournoi={
          setFormulaire
        }
        confirmer={confirmer}
        fermer={fermerModal}
      />
    </section>
  );
}

export default GestionTournois;