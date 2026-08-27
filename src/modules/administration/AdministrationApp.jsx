import { useState } from "react";

import AdministrationAccueil from "./AdministrationAccueil";
import ImportationAdministration from "./importation/ImportationAdministration";

import "./administration.css";

// Composants
import GestionAssociations from "../../components/administration/associations/GestionAssociations";
import GestionSaisons from "../../components/administration/saisons/GestionSaisons";
import GestionEquipes from "../../components/administration/equipes/GestionEquipes";
import GestionJoueuses from "../../components/administration/joueuses/GestionJoueuses";
import GestionAffectations from "../../components/administration/affectations/GestionAffectations";
import GestionEquipements from "../../components/administration/equipements/GestionEquipements";
import GestionChandails from "../../components/administration/equipements/chandails/GestionChandails";
import GestionPantalons from "../../components/administration/equipements/pantalons/GestionPantalons";
import GestionPersonnelEquipe from "../../components/administration/personnelEquipe/GestionPersonnelEquipe";
import GestionAffectationsPersonnel from "../../components/administration/personnelEquipe/GestionAffectationsPersonnel";
import GestionOfficiels from "../../components/administration/officiels/GestionOfficiels";
import GestionTournois from "../../components/administration/tournois/GestionTournois";

// Hooks
import { useGestionSaisons } from "../../hooks/useGestionSaisons";
import { useGestionPantalons } from "../../hooks/useGestionPantalons";
import { useGestionPantalonsJoueuses } from "../../hooks/useGestionPantalonsJoueuses";

const PAGES_ADMINISTRATION = {
  ACCUEIL: "accueil",
  ASSOCIATIONS: "associations",
  SAISONS: "saisons",
  AFFECTATIONS: "affectations",
  EQUIPES: "equipes",
  JOUEUSES: "joueuses",
  EQUIPEMENTS: "equipements",
  CHANDAILS: "chandails",
  PANTALONS: "pantalons",
  PERSONNEL_EQUIPE: "personnel-equipe",
  AFFECTATIONS_PERSONNEL:
    "affectations-personnel",
  OFFICIELS: "officiels",
  TOURNOIS: "tournois",
  IMPORTATION: "importation",
};

function AdministrationApp({
  gestionAssociations,
  gestionEquipes,
  gestionJoueuses,
  gestionAffectations,
  gestionTournois,
  gestionInscriptionsTournoi,
  gestionOfficiels,

  gestionPersonnelEquipe,
  gestionAffectationsPersonnel,

  gestionChandails,
  gestionAttributionsChandails,

  authentification,
}) {
  const [
    pageActive,
    setPageActive,
  ] = useState(
    PAGES_ADMINISTRATION.ACCUEIL
  );

  const gestionSaisons =
    useGestionSaisons();

  const gestionPantalons =
    useGestionPantalons();

  const gestionPantalonsJoueuses =
    useGestionPantalonsJoueuses({
      pantalons:
        gestionPantalons.pantalons,

      setPantalons:
        gestionPantalons.setPantalons,
    });

  const estPlateforme =
    authentification?.estPlateforme ===
    true;

  const estAssociation =
    authentification?.estAssociation ===
    true;

  /*
   * Pour le compte plateforme :
   * on conserve le fonctionnement
   * actuel avec l'association active.
   *
   * Pour un compte association :
   * l'association est imposée par
   * le compte connecté.
   */
  const associationActive =
    estAssociation
      ? gestionAssociations.associations.find(
          (association) =>
            String(
              association.id
            ) ===
            String(
              authentification
                ?.utilisateur
                ?.associationId
            )
        ) ?? null
      : gestionAssociations
          .obtenirAssociationActive();

  /*
   * Un compte association ne doit
   * jamais recevoir les autres
   * associations dans les sélecteurs.
   */
  const associationsDisponibles =
    estPlateforme
      ? gestionAssociations.associations
      : associationActive
      ? [associationActive]
      : [];

  const saisonActive =
    gestionSaisons
      .obtenirSaisonActive();

  function retournerFeuilleMatch() {
    window.location.hash = "";
  }

  function ouvrirSection(
    sectionId
  ) {
    /*
     * Protection interface :
     * seul le compte plateforme
     * peut accéder à Associations.
     */
    if (
      sectionId === "associations"
    ) {
      if (!estPlateforme) {
        return;
      }

      setPageActive(
        PAGES_ADMINISTRATION.ASSOCIATIONS
      );

      return;
    }

    if (sectionId === "saisons") {
      setPageActive(
        PAGES_ADMINISTRATION.SAISONS
      );

      return;
    }

    if (
      sectionId === "affectations"
    ) {
      setPageActive(
        PAGES_ADMINISTRATION.AFFECTATIONS
      );

      return;
    }

    if (sectionId === "equipes") {
      setPageActive(
        PAGES_ADMINISTRATION.EQUIPES
      );

      return;
    }

    if (sectionId === "joueuses") {
      setPageActive(
        PAGES_ADMINISTRATION.JOUEUSES
      );

      return;
    }

    if (
      sectionId === "equipements"
    ) {
      setPageActive(
        PAGES_ADMINISTRATION.EQUIPEMENTS
      );

      return;
    }

    if (sectionId === "chandails") {
      setPageActive(
        PAGES_ADMINISTRATION.CHANDAILS
      );

      return;
    }

    if (sectionId === "pantalons") {
      setPageActive(
        PAGES_ADMINISTRATION.PANTALONS
      );

      return;
    }

    if (
      sectionId ===
      "personnel-equipe"
    ) {
      setPageActive(
        PAGES_ADMINISTRATION.PERSONNEL_EQUIPE
      );

      return;
    }

    if (
      sectionId ===
      "affectations-personnel"
    ) {
      setPageActive(
        PAGES_ADMINISTRATION.AFFECTATIONS_PERSONNEL
      );

      return;
    }

    if (sectionId === "officiels") {
      setPageActive(
        PAGES_ADMINISTRATION.OFFICIELS
      );

      return;
    }

    if (sectionId === "tournois") {
      setPageActive(
        PAGES_ADMINISTRATION.TOURNOIS
      );

      return;
    }

    if (sectionId === "donnees") {
      setPageActive(
        PAGES_ADMINISTRATION.IMPORTATION
      );
    }
  }

  function retournerAccueilAdministration() {
    setPageActive(
      PAGES_ADMINISTRATION.ACCUEIL
    );
  }

  function retournerEquipements() {
    setPageActive(
      PAGES_ADMINISTRATION.EQUIPEMENTS
    );
  }

  return (
    <main className="administration-app">
      <header className="administration-entete">
        <div>
          <p className="administration-surtitre">
            Plateforme de gestion de la
            ringuette
          </p>

          <h1>
            Administration
          </h1>

          <p className="administration-description">
            {estPlateforme
              ? "Gestion globale des données permanentes utilisées par la plateforme."
              : associationActive
              ? `Administration — ${associationActive.nom}`
              : "Administration de l'association."}
          </p>
        </div>

        <div className="administration-actions-entete">
  <button
    type="button"
    className="administration-bouton-retour"
    onClick={retournerFeuilleMatch}
  >
    Retour à la feuille de match
  </button>

  <button
    type="button"
    className="administration-bouton-retour"
    onClick={async () => {
      const resultat =
        await authentification.deconnecter();

      if (resultat.succes) {
        window.location.hash =
          "/administration";
      }
    }}
  >
    Déconnexion
  </button>
</div>
      </header>

      {pageActive ===
        PAGES_ADMINISTRATION.ACCUEIL && (
        <AdministrationAccueil
          ouvrirSection={
            ouvrirSection
          }
          estPlateforme={
            estPlateforme
          }
        />
      )}

      {pageActive ===
        PAGES_ADMINISTRATION.ASSOCIATIONS &&
        estPlateforme && (
          <GestionAssociations
            retournerAccueil={
              retournerAccueilAdministration
            }
            gestionAssociations={
              gestionAssociations
            }
          />
        )}

      {pageActive ===
        PAGES_ADMINISTRATION.SAISONS && (
        <GestionSaisons
          retournerAccueil={
            retournerAccueilAdministration
          }
          associationActive={
            associationActive
          }
          gestionSaisons={
            gestionSaisons
          }
        />
      )}

      {pageActive ===
        PAGES_ADMINISTRATION.AFFECTATIONS && (
        <GestionAffectations
          retournerAccueil={
            retournerAccueilAdministration
          }
          associationActive={
            associationActive
          }
          saisonActive={
            saisonActive
          }
          equipes={
            gestionEquipes.equipes
          }
          joueuses={
            gestionJoueuses.joueuses
          }
          gestionAffectations={
            gestionAffectations
          }
        />
      )}

      {pageActive ===
        PAGES_ADMINISTRATION.EQUIPES && (
        <GestionEquipes
          retournerAccueil={
            retournerAccueilAdministration
          }
          associationActive={
            associationActive
          }
          saisonActive={
            saisonActive
          }
          gestionEquipes={
            gestionEquipes
          }
        />
      )}

      {pageActive ===
        PAGES_ADMINISTRATION.JOUEUSES && (
        <GestionJoueuses
          retournerAccueil={
            retournerAccueilAdministration
          }
          associations={
            associationsDisponibles
          }
          gestionJoueuses={
            gestionJoueuses
          }
        />
      )}

      {pageActive ===
        PAGES_ADMINISTRATION.EQUIPEMENTS && (
        <GestionEquipements
          retournerAccueil={
            retournerAccueilAdministration
          }
          ouvrirSection={
            ouvrirSection
          }
        />
      )}

      {pageActive ===
        PAGES_ADMINISTRATION.CHANDAILS && (
        <GestionChandails
          retour={
            retournerEquipements
          }
          associationActive={
            associationActive
          }
          saisonActive={
            saisonActive
          }
          saisons={
            gestionSaisons.saisons
          }
          gestionChandails={
            gestionChandails
          }
          gestionAttributionsChandails={
            gestionAttributionsChandails
          }
          gestionJoueuses={
            gestionJoueuses
          }
          affectations={
            gestionAffectations.affectations
          }
        />
      )}

      {pageActive ===
        PAGES_ADMINISTRATION.PANTALONS && (
        <GestionPantalons
          retour={
            retournerEquipements
          }
          associationActive={
            associationActive
          }
          joueuses={
            gestionJoueuses.joueuses
          }
          gestionPantalons={
            gestionPantalons
          }
          gestionPantalonsJoueuses={
            gestionPantalonsJoueuses
          }
        />
      )}

      {pageActive ===
        PAGES_ADMINISTRATION.PERSONNEL_EQUIPE && (
        <GestionPersonnelEquipe
          retournerAccueil={
            retournerAccueilAdministration
          }
          associationActive={
            associationActive
          }
          gestionPersonnelEquipe={
            gestionPersonnelEquipe
          }
        />
      )}

      {pageActive ===
        PAGES_ADMINISTRATION.AFFECTATIONS_PERSONNEL && (
        <GestionAffectationsPersonnel
          retournerAccueil={
            retournerAccueilAdministration
          }
          associationActive={
            associationActive
          }
          saisonActive={
            saisonActive
          }
          equipes={
            gestionEquipes.equipes
          }
          personnel={
            gestionPersonnelEquipe.personnelEquipe
          }
          gestionAffectationsPersonnel={
            gestionAffectationsPersonnel
          }
        />
      )}

      {pageActive ===
        PAGES_ADMINISTRATION.OFFICIELS && (
        <GestionOfficiels
          retournerAccueil={
            retournerAccueilAdministration
          }
          associationActive={
            associationActive
          }
          gestionOfficiels={
            gestionOfficiels
          }
        />
      )}

      {pageActive ===
        PAGES_ADMINISTRATION.TOURNOIS && (
        <GestionTournois
          retournerAccueil={
            retournerAccueilAdministration
          }
          associationActive={
            associationActive
          }
          saisonActive={
            saisonActive
          }
          associations={
            associationsDisponibles
          }
          equipes={
            gestionEquipes.equipes
          }
          officiels={
            gestionOfficiels.officiels
          }
          gestionTournois={
            gestionTournois
          }
          gestionInscriptionsTournoi={
            gestionInscriptionsTournoi
          }
        />
      )}

      {pageActive ===
        PAGES_ADMINISTRATION.IMPORTATION && (
        <ImportationAdministration
          retournerAccueil={
            retournerAccueilAdministration
          }
          associationActive={
            associationActive
          }
          joueuses={
            gestionJoueuses.joueuses
          }
          importerJoueuses={
            gestionJoueuses.importerJoueuses
          }
        />
      )}
    </main>
  );
}

export default AdministrationApp;