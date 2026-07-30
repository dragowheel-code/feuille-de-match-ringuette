import { useState } from "react";
import AdministrationAccueil from "./AdministrationAccueil";
import ImportationAdministration from "./importation/ImportationAdministration";
import "./administration.css";
import GestionAssociations from "../../components/administration/associations/GestionAssociations";
import GestionEquipes from "../../components/administration/equipes/GestionEquipes";
import { useGestionAssociations } from "../../hooks/useGestionAssociations";

const PAGES_ADMINISTRATION = {
  ACCUEIL: "accueil",
  ASSOCIATIONS: "associations",
  EQUIPES: "equipes",
  IMPORTATION: "importation",
};

function AdministrationApp({
  joueuses,
  setJoueuses,
}) {
  const [pageActive, setPageActive] = useState(
    PAGES_ADMINISTRATION.ACCUEIL
  );
  const gestionAssociations = useGestionAssociations();

  function retournerFeuilleMatch() {
    window.location.hash = "";
  }

  function ouvrirSection(sectionId) {
  if (sectionId === "associations") {
    setPageActive(PAGES_ADMINISTRATION.ASSOCIATIONS);
    return;
  }
  if (sectionId === "equipes") {
  setPageActive(PAGES_ADMINISTRATION.EQUIPES);
  return;
}

  if (sectionId === "donnees") {
    setPageActive(PAGES_ADMINISTRATION.IMPORTATION);
  }
}

  function retournerAccueilAdministration() {
    setPageActive(PAGES_ADMINISTRATION.ACCUEIL);
  }

  return (
    <main className="administration-app">
      <header className="administration-entete">
        <div>
          <p className="administration-surtitre">
            Plateforme de gestion de la ringuette
          </p>

          <h1>Administration</h1>

          <p className="administration-description">
            Gestion des données permanentes utilisées par la plateforme.
          </p>
        </div>

        <button
          type="button"
          className="administration-bouton-retour"
          onClick={retournerFeuilleMatch}
        >
          Retour à la feuille de match
        </button>
      </header>

      {pageActive === PAGES_ADMINISTRATION.ACCUEIL && (
        <AdministrationAccueil
          ouvrirSection={ouvrirSection}
        />
      )}

      {pageActive === PAGES_ADMINISTRATION.ASSOCIATIONS && (
  <GestionAssociations
    retour={retournerAccueilAdministration}
    gestionAssociations={gestionAssociations}
  />
)}
{pageActive === PAGES_ADMINISTRATION.EQUIPES && (
  <GestionEquipes
    retour={retournerAccueilAdministration}
    associations={gestionAssociations.associations}
  />
)}
      {pageActive === PAGES_ADMINISTRATION.IMPORTATION && (
        <ImportationAdministration
          retournerAccueil={retournerAccueilAdministration}
          joueuses={joueuses}
          setJoueuses={setJoueuses}
        />
      )}
    </main>
  );
}

export default AdministrationApp;