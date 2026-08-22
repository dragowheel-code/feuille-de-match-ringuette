import { useEffect, useState } from "react";
import App from "./App";
import AdministrationApp from "./modules/administration/AdministrationApp";
// Hooks //
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

const ROUTE_ADMINISTRATION = "/administration";

function lireRoute() {
  const route = window.location.hash.replace(/^#/, "");

  return route || "/";
}

function PlatformRoot() {
  const [route, setRoute] = useState(lireRoute);
  const donneesApplication = useDonneesApplication();
  
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

  useEffect(() => {
    function gererChangementRoute() {
      setRoute(lireRoute());
    }

    window.addEventListener("hashchange", gererChangementRoute);

    return () => {
      window.removeEventListener("hashchange", gererChangementRoute);
    };
  }, []);

  const chargementSupabase =
  gestionAssociations.chargement ||
  gestionTournois.chargement ||
  gestionInscriptionsTournoi.chargement ||
  gestionEquipes.chargement ||
  gestionJoueuses.chargement ||
  gestionAffectations.chargement ||
  gestionPersonnelEquipe.chargement ||
  gestionAffectationsPersonnel.chargement ||
  gestionOfficiels.chargement;

  if (chargementSupabase) {
  return (
    <main className="app">
      <p>
        Chargement des données…
      </p>
    </main>
  );
}

  if (route === ROUTE_ADMINISTRATION) {
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
/>
  );
}

  return (
  <App
  donneesApplication={donneesApplication}

  associations={
    gestionAssociations.associations
  }

  tournois={
    gestionTournois.tournois
  }

  equipesAdministration={
    gestionEquipes.equipes
  }

  joueusesAdministration={
    gestionJoueuses.joueuses
  }

  personnelEquipeAdministration={
    gestionPersonnelEquipe.personnelEquipe
  }

  affectationsPersonnelAdministration={
    gestionAffectationsPersonnel.affectationsPersonnel
  }

  affectationsAdministration={
    gestionAffectations.affectations
  }

  officielsAdministration={
    gestionOfficiels.officiels
  }

  inscriptionsEquipesTournoi={
    gestionInscriptionsTournoi
      .inscriptionsEquipesTournoi
  }

  inscriptionsOfficielsTournoi={
    gestionInscriptionsTournoi
      .inscriptionsOfficielsTournoi
  }

  ensemblesChandailsAdministration={
    gestionChandails.ensemblesChandails
  }

  attributionsChandailsAdministration={
    gestionAttributionsChandails.attributionsChandails
  }
/>
);
}

export default PlatformRoot;