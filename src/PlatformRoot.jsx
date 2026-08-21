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

  useEffect(() => {
    function gererChangementRoute() {
      setRoute(lireRoute());
    }

    window.addEventListener("hashchange", gererChangementRoute);

    return () => {
      window.removeEventListener("hashchange", gererChangementRoute);
    };
  }, []);

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

  gestionAffectations={
    gestionAffectations
  }

  gestionTournois={
    gestionTournois
  }

  gestionInscriptionsTournoi={
    gestionInscriptionsTournoi
  }

  officiels={
    donneesApplication.officiels
  }

  setOfficiels={
    donneesApplication.setOfficiels
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

  affectationsAdministration={
    gestionAffectations.affectations
  }

  inscriptionsEquipesTournoi={
    gestionInscriptionsTournoi
      .inscriptionsEquipesTournoi
  }

  inscriptionsOfficielsTournoi={
    gestionInscriptionsTournoi
      .inscriptionsOfficielsTournoi
  }
/>
);
}

export default PlatformRoot;