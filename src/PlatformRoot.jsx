import {
  useEffect,
  useState,
} from "react";

import App from "./App";

import AdministrationApp from "./modules/administration/AdministrationApp";

import ConnexionAdministration from "./components/auth/ConnexionAdministration";

// Hooks

import { useDonneesApplication } from "./hooks/useDonneesApplication";

import { useGestionAssociations } from "./hooks/useGestionAssociations";

import { useGestionTournois } from "./hooks/useGestionTournois";

import { useGestionInscriptionsTournoi } from "./hooks/useGestionInscriptionsTournoi";

import { useGestionEquipes } from "./hooks/useGestionEquipes";

import { useGestionJoueuses } from "./hooks/useGestionJoueuses";

import { useGestionAffectations } from "./hooks/useGestionAffectations";

import { useGestionPersonnelEquipe } from "./hooks/useGestionPersonnelEquipe";

import { useGestionAffectationsPersonnel } from "./hooks/useGestionAffectationsPersonnel";

import { useGestionOfficiels } from "./hooks/useGestionOfficiels";

import { useGestionChandails } from "./hooks/useGestionChandails";

import { useGestionAttributionsChandails } from "./hooks/useGestionAttributionsChandails";

import { useAuthentification } from "./hooks/useAuthentification";

import {
  useDonneesFeuilleMatchPubliques,
} from "./hooks/useDonneesFeuilleMatchPubliques";

const ROUTE_ADMINISTRATION =
  "/administration";

function lireRoute() {
  const route =
    window.location.hash.replace(
      /^#/,
      ""
    );

  return route || "/";
}

function FeuilleMatchRoot() {
  const donneesApplication =
    useDonneesApplication();

  const donneesFeuilleMatch =
    useDonneesFeuilleMatchPubliques();

  if (donneesFeuilleMatch.chargement) {
    return (
      <main className="app">
        <p>Chargement des données…</p>
      </main>
    );
  }

  if (donneesFeuilleMatch.erreur) {
    return (
      <main className="app">
        <p>
          Impossible de charger les données de la
          feuille de match.
        </p>
      </main>
    );
  }

  return (
    <App
      donneesApplication={
        donneesApplication
      }
      associations={
        donneesFeuilleMatch.associations
      }
      equipesAdministration={
        donneesFeuilleMatch.equipes
      }
      chargerAlignementPublic={
        donneesFeuilleMatch.chargerAlignement
      }
      chargerPersonnelPublic={
        donneesFeuilleMatch.chargerPersonnel
      }
      tournois={
        donneesFeuilleMatch.tournois
      }
      officielsAdministration={
        donneesFeuilleMatch.officiels
      }
      inscriptionsEquipesTournoi={
        donneesFeuilleMatch
          .inscriptionsEquipesTournoi
      }
      inscriptionsOfficielsTournoi={
        donneesFeuilleMatch
          .inscriptionsOfficielsTournoi
      }
    />
  );
}

function AdministrationRoot() {
  const authentification =
    useAuthentification();

  if (authentification.chargement) {
    return (
      <main className="app">
        <p>
          Vérification de la session…
        </p>
      </main>
    );
  }

  if (!authentification.estConnecte) {
    return (
      <ConnexionAdministration
        authentification={
          authentification
        }
        fermer={() => {
          window.location.hash = "";
        }}
      />
    );
  }

  return (
    <AdministrationDonneesRoot
      authentification={
        authentification
      }
    />
  );
}

function AdministrationDonneesRoot({
  authentification,
}) {
  const gestionAssociations =
    useGestionAssociations();

  const gestionTournois =
    useGestionTournois();

  const gestionInscriptionsTournoi =
    useGestionInscriptionsTournoi();

  const gestionEquipes =
    useGestionEquipes();

  const gestionJoueuses =
    useGestionJoueuses();

  const gestionAffectations =
    useGestionAffectations();

  const gestionPersonnelEquipe =
    useGestionPersonnelEquipe();

  const gestionAffectationsPersonnel =
    useGestionAffectationsPersonnel();

  const gestionOfficiels =
    useGestionOfficiels();

  const gestionChandails =
    useGestionChandails();

  const gestionAttributionsChandails =
    useGestionAttributionsChandails();

  const chargementAdministration =
    gestionAssociations.chargement ||
    gestionTournois.chargement ||
    gestionInscriptionsTournoi.chargement ||
    gestionEquipes.chargement ||
    gestionJoueuses.chargement ||
    gestionAffectations.chargement ||
    gestionPersonnelEquipe.chargement ||
    gestionAffectationsPersonnel.chargement ||
    gestionOfficiels.chargement ||
    gestionChandails.chargement ||
    gestionAttributionsChandails.chargement;

  if (chargementAdministration) {
    return (
      <main className="app">
        <p>
          Chargement des données administratives…
        </p>
      </main>
    );
  }

  return (
    <AdministrationApp
      gestionAssociations={
        gestionAssociations
      }
      gestionEquipes={
        gestionEquipes
      }
      gestionJoueuses={
        gestionJoueuses
      }
      gestionOfficiels={
        gestionOfficiels
      }
      gestionPersonnelEquipe={
        gestionPersonnelEquipe
      }
      gestionAffectationsPersonnel={
        gestionAffectationsPersonnel
      }
      gestionAffectations={
        gestionAffectations
      }
      gestionTournois={
        gestionTournois
      }
      gestionInscriptionsTournoi={
        gestionInscriptionsTournoi
      }
      gestionChandails={
        gestionChandails
      }
      gestionAttributionsChandails={
        gestionAttributionsChandails
      }
      authentification={
        authentification
      }
    />
  );
}

function PlatformRoot() {
  const [
    route,
    setRoute,
  ] = useState(lireRoute);

  useEffect(() => {
    function gererChangementRoute() {
      setRoute(
        lireRoute()
      );
    }

    window.addEventListener(
      "hashchange",
      gererChangementRoute
    );

    return () => {
      window.removeEventListener(
        "hashchange",
        gererChangementRoute
      );
    };
  }, []);

  if (
    route === ROUTE_ADMINISTRATION
  ) {
    return <AdministrationRoot />;
  }

  return <FeuilleMatchRoot />;
}

export default PlatformRoot;