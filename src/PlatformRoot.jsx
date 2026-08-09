import { useEffect, useState } from "react";
import App from "./App";
import AdministrationApp from "./modules/administration/AdministrationApp";
import { useDonneesApplication } from "./hooks/useDonneesApplication";

const ROUTE_ADMINISTRATION = "/administration";

function lireRoute() {
  const route = window.location.hash.replace(/^#/, "");

  return route || "/";
}

function PlatformRoot() {
  const [route, setRoute] = useState(lireRoute);
  const donneesApplication = useDonneesApplication();

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
      joueuses={donneesApplication.joueuses}
      setJoueuses={donneesApplication.setJoueuses}
      officiels={donneesApplication.officiels}
      setOfficiels={donneesApplication.setOfficiels}
    />
  );
}

  return (
    <App
      donneesApplication={donneesApplication}
    />
  );
}

export default PlatformRoot;