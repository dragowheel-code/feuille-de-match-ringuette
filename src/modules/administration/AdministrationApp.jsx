import { useState } from "react";
import AdministrationAccueil from "./AdministrationAccueil";
import ImportationAdministration from "./importation/ImportationAdministration";
import "./administration.css";
// Composants //
import GestionAssociations from "../../components/administration/associations/GestionAssociations";
import GestionSaisons from "../../components/administration/saisons/GestionSaisons";
import GestionEquipes from "../../components/administration/equipes/GestionEquipes";
import GestionJoueuses from "../../components/administration/joueuses/GestionJoueuses";
import GestionAffectations from "../../components/administration/affectations/GestionAffectations";
import GestionEquipements from "../../components/administration/equipements/GestionEquipements";
import GestionChandails from "../../components/administration/equipements/chandails/GestionChandails";
import GestionPantalons from "../../components/administration/equipements/pantalons/GestionPantalons";
// Hooks //
import { useGestionAssociations } from "../../hooks/useGestionAssociations";
import { useGestionAffectations } from "../../hooks/useGestionAffectations";
import { useGestionSaisons } from "../../hooks/useGestionSaisons";
import { useGestionEquipes } from "../../hooks/useGestionEquipes";
import { useGestionJoueuses } from "../../hooks/useGestionJoueuses";
import { useGestionChandails } from "../../hooks/useGestionChandails";
import { useGestionPantalons } from "../../hooks/useGestionPantalons";
import { useGestionAttributionsChandails } from "../../hooks/useGestionAttributionsChandails";

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
  IMPORTATION: "importation",
};

function AdministrationApp() {
  
  const [pageActive, setPageActive] = useState(
    PAGES_ADMINISTRATION.ACCUEIL
  );
  const gestionAssociations = useGestionAssociations();
  const gestionAffectations = useGestionAffectations();
  const gestionSaisons = useGestionSaisons();
  const gestionEquipes = useGestionEquipes();
  const gestionJoueuses = useGestionJoueuses();
  const gestionChandails = useGestionChandails();
  const gestionAttributionsChandails = useGestionAttributionsChandails();
  const gestionPantalons = useGestionPantalons();
  const associationActive =
  gestionAssociations.obtenirAssociationActive();

  const saisonActive =
  gestionSaisons.obtenirSaisonActive();

  function retournerFeuilleMatch() {
    window.location.hash = "";
  }

  function ouvrirSection(sectionId) {
  if (sectionId === "associations") {
    setPageActive(PAGES_ADMINISTRATION.ASSOCIATIONS);
    return;
  }

  if (sectionId === "saisons") {
  setPageActive(PAGES_ADMINISTRATION.SAISONS);
  return;
}

if (sectionId === "affectations") {
  setPageActive(
    PAGES_ADMINISTRATION.AFFECTATIONS
  );
  return;
}

  if (sectionId === "equipes") {
    setPageActive(PAGES_ADMINISTRATION.EQUIPES);
    return;
  }

  if (sectionId === "joueuses") {
    setPageActive(PAGES_ADMINISTRATION.JOUEUSES);
    return;
  }

  if (sectionId === "equipements") {
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

  if (sectionId === "donnees") {
    setPageActive(PAGES_ADMINISTRATION.IMPORTATION);
  }
}

  function retournerAccueilAdministration() {
    setPageActive(PAGES_ADMINISTRATION.ACCUEIL);
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
{pageActive === PAGES_ADMINISTRATION.SAISONS && (
  <GestionSaisons
    retour={retournerAccueilAdministration}
    gestionSaisons={gestionSaisons}
  />
)}
{pageActive === PAGES_ADMINISTRATION.AFFECTATIONS && (
  <GestionAffectations
  retour={retournerAccueilAdministration}
  associationActive={associationActive}
  saisonActive={saisonActive}
  equipes={gestionEquipes.equipes}
  joueuses={gestionJoueuses.joueuses}
  gestionAffectations={gestionAffectations}
/>
)}
{pageActive === PAGES_ADMINISTRATION.EQUIPES && (
  <GestionEquipes
  retour={retournerAccueilAdministration}
  associationActive={associationActive}
  saisonActive={saisonActive}
  gestionEquipes={gestionEquipes}
/>
)}
{pageActive === PAGES_ADMINISTRATION.JOUEUSES && (
  <GestionJoueuses
  retour={retournerAccueilAdministration}
  associations={gestionAssociations.associations}
  equipes={gestionEquipes.equipes}
  gestionJoueuses={gestionJoueuses}
/>
)}
{pageActive ===
  PAGES_ADMINISTRATION.EQUIPEMENTS && (
  <GestionEquipements
    retour={retournerAccueilAdministration}
    ouvrirSection={ouvrirSection}
  />
)}
{pageActive ===
  PAGES_ADMINISTRATION.CHANDAILS && (
  <GestionChandails
  retour={retournerEquipements}
  associationActive={associationActive}
  saisonActive={saisonActive}
  saisons={gestionSaisons.saisons}
  gestionChandails={gestionChandails}
  gestionAttributionsChandails={ gestionAttributionsChandails }
  gestionJoueuses={gestionJoueuses}
/>
)}
{pageActive ===
  PAGES_ADMINISTRATION.PANTALONS && (
  <GestionPantalons
  retour={retournerEquipements}
  associationActive={associationActive}
  gestionPantalons={gestionPantalons}
/>
)}
  {pageActive === PAGES_ADMINISTRATION.IMPORTATION && (
        <ImportationAdministration
  retournerAccueil={retournerAccueilAdministration}
  associationActive={associationActive}
  joueuses={gestionJoueuses.joueuses}
  setJoueuses={gestionJoueuses.setJoueuses}
/>
      )}
    </main>
  );
}

export default AdministrationApp;