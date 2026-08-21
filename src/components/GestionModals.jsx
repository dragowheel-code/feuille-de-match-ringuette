import ConfigurationModal from "../modals/ConfigurationModal";
import ImportExcelModal from "../modals/ImportExcelModal";
import ParametresModal from "../modals/ParametresModal";
import ListeOfficielsModal from "../modals/ListeOfficielsModal";
import SuppressionOfficielModal from "../modals/SuppressionOfficielModal";
import SuppressionEquipeModal from "../modals/SuppressionEquipeModal";
import SuppressionJoueuseModal from "../modals/SuppressionJoueuseModal";
import { useState } from "react";

import OfficielModal from "../modals/OfficielModal";

import {
  importerAlignementTournoiExcel,
  importerEquipesExcel,
  importerJoueusesExcel,
} from "../services/importExcel";

import { importerOfficielsExcel } from "../services/importOfficiels";

import {
  exporterBaseDeDonnees,
  importerBaseDeDonnees,
} from "../services/database";

function GestionModals({
  modales,
  couleurs,

  matchInfo,
  setMatchInfo,

  associations,
  tournois,

  equipesAdministration,
  joueusesAdministration,
  affectationsAdministration,

  inscriptionsEquipesTournoi,
  inscriptionsOfficielsTournoi,

  dureePeriode,
  setDureePeriode,

  equipes,
  setEquipes,

  joueuses,
  setJoueuses,

  officiels,
  setOfficiels,

  equipeLocaleData,
  equipeVisiteuseData,
  destinataires,

  setPageActive,
  effacerSauvegarde,

  ajouterOfficiel,
  modifierOfficiel,
  suppressionOfficiel,
  supprimerOfficiel,

  suppressionEquipe,
  supprimerEquipe,

  suppressionJoueuse,
  supprimerJoueuse,
}) {
  const OFFICIEL_VIDE = {
  mode: "ajout",
  id: null,
  nom: "",
  arbitre: false,
  chronometreur: false,
  marqueur: false,
  operateur30s: false,
};

function ouvrirAjoutOfficiel() {
  setOfficielFormulaire({
    ...OFFICIEL_VIDE,
  });

  modales.fermerParametres();
  modales.ouvrirAjoutOfficiel();
}

function ouvrirModificationOfficiel(officiel) {
  setOfficielFormulaire({
    mode: "modification",
    id: officiel.id,
    nom: officiel.nom ?? "",
    arbitre: Boolean(officiel.arbitre),
    chronometreur: Boolean(officiel.chronometreur),
    marqueur: Boolean(officiel.marqueur),
    operateur30s: Boolean(officiel.operateur30s),
  });

  modales.fermerListeOfficiels();
  modales.ouvrirAjoutOfficiel();
}

function confirmerOfficiel() {
  const nomNettoye = officielFormulaire.nom.trim();

  if (!nomNettoye) {
    alert("Le nom de l’officiel est obligatoire.");
    return;
  }

  const auMoinsUnRole =
    officielFormulaire.arbitre ||
    officielFormulaire.chronometreur ||
    officielFormulaire.marqueur ||
    officielFormulaire.operateur30s;

  if (!auMoinsUnRole) {
    alert("Sélectionne au moins un rôle pour cet officiel.");
    return;
  }

  const donnees = {
    nom: nomNettoye,
    arbitre: officielFormulaire.arbitre,
    chronometreur: officielFormulaire.chronometreur,
    marqueur: officielFormulaire.marqueur,
    operateur30s: officielFormulaire.operateur30s,
  };

  let succes;

  if (officielFormulaire.mode === "modification") {
    succes = modifierOfficiel(
      officielFormulaire.id,
      donnees
    );
  } else {
    succes = ajouterOfficiel(donnees);
  }

  if (succes === false) {
    return;
  }

  modales.fermerAjoutOfficiel();

  setOfficielFormulaire({
    ...OFFICIEL_VIDE,
  });
}
const [officielFormulaire, setOfficielFormulaire] =
  useState(OFFICIEL_VIDE);
  return (
    <>
      <ConfigurationModal
  ouverte={modales.fenetreConfigOuverte}
  fermer={() => modales.fermerConfiguration()}

  matchInfo={matchInfo}
  setMatchInfo={setMatchInfo}

  associations={associations}
  tournois={tournois}

  equipesAdministration={
    equipesAdministration
  }

  joueusesAdministration={joueusesAdministration}
  affectationsAdministration={affectationsAdministration}

  inscriptionsEquipesTournoi={
    inscriptionsEquipesTournoi
  }

  officiels={officiels}

  inscriptionsOfficielsTournoi={
    inscriptionsOfficielsTournoi
  }

  dureePeriode={dureePeriode}
  setDureePeriode={setDureePeriode}

  equipes={equipes}

  equipeLocaleData={equipeLocaleData}
  equipeVisiteuseData={equipeVisiteuseData}

  destinataires={destinataires}
/>

      <ImportExcelModal
        ouverte={modales.fenetreImportOuverte}
        fermer={modales.fermerImport}
        importerAlignementTournoi={(event) =>
          importerAlignementTournoiExcel({
            event,
            couleurs,
            matchInfo,
            setEquipes,
            setJoueuses,
          })
        }
        importerEquipes={(event) =>
          importerEquipesExcel({
            event,
            couleurs,
            setEquipes,
            setMatchInfo,
            setFenetreImportOuverte: modales.fermerImport,
          })
        }
        importerJoueuses={(event) =>
          importerJoueusesExcel({
            event,
            setJoueuses,
            setEquipes,
            setMatchInfo,
            setPageActive,
            setFenetreImportOuverte: modales.fermerImport,
            couleurs,
          })
        }
        importerOfficiels={(event) =>
          importerOfficielsExcel({
            event,
            setOfficiels,
          })
        }
      />

      <ParametresModal
        ouverte={modales.fenetreParametresOuverte}
        fermer={modales.fermerParametres}
        ouvrirImportExcel={() => {
          modales.fermerParametres();
          modales.ouvrirImport();
        }}
        ouvrirListeOfficiels={() => {
          modales.fermerParametres();
          modales.ouvrirListeOfficiels();
        }}
        ouvrirAjoutOfficiel={ouvrirAjoutOfficiel}

        ouvrirSuppressionEquipe={() => {
          modales.fermerParametres();
          modales.ouvrirSuppressionEquipe();
        }}
        ouvrirSuppressionJoueuse={() => {
          modales.fermerParametres();
          modales.ouvrirSuppressionJoueuse();
        }}
        ouvrirSuppressionOfficiel={() => {
          modales.fermerParametres();
          modales.ouvrirSuppressionOfficiel();
        }}
        exporterBase={() =>
          exporterBaseDeDonnees({
            equipes,
            joueuses,
            officiels,
          })
        }
        importerBase={(event) =>
          importerBaseDeDonnees({
            event,
            setEquipes,
            setJoueuses,
            setOfficiels,
          })
        }
        effacerSauvegarde={effacerSauvegarde}
      />

      <ListeOfficielsModal
  ouverte={modales.fenetreListeOfficielsOuverte}
  officiels={officiels}
  modifierOfficiel={ouvrirModificationOfficiel}
  fermer={modales.fermerListeOfficiels}
/>
<OfficielModal
  ouverte={modales.fenetreAjoutOfficielOuverte}
  officiel={officielFormulaire}
  setOfficiel={setOfficielFormulaire}
  confirmer={confirmerOfficiel}
  fermer={() => {
    modales.fermerAjoutOfficiel();

    setOfficielFormulaire({
      ...OFFICIEL_VIDE,
    });
  }}
/>

      <SuppressionOfficielModal
        ouverte={modales.fenetreSuppressionOfficielOuverte}
        officielASupprimer={
          suppressionOfficiel.officielASupprimer
        }
        setOfficielASupprimer={
          suppressionOfficiel.setOfficielASupprimer
        }
        officiels={officiels}
        supprimerOfficiel={supprimerOfficiel}
        fermer={() => {
          modales.fermerSuppressionOfficiel();
          suppressionOfficiel.reinitialiser();
        }}
      />

      <SuppressionEquipeModal
        ouverte={modales.fenetreSuppressionEquipeOuverte}
        equipeASupprimer={suppressionEquipe.equipeASupprimer}
        setEquipeASupprimer={
          suppressionEquipe.setEquipeASupprimer
        }
        equipes={equipes}
        supprimerEquipe={supprimerEquipe}
        fermer={() => {
          modales.fermerSuppressionEquipe();
          suppressionEquipe.reinitialiser();
        }}
      />

      <SuppressionJoueuseModal
        ouverte={modales.fenetreSuppressionJoueuseOuverte}
        equipeSuppressionJoueuse={
          suppressionJoueuse.equipeSuppressionJoueuse
        }
        setEquipeSuppressionJoueuse={
          suppressionJoueuse.setEquipeSuppressionJoueuse
        }
        joueuseASupprimer={
          suppressionJoueuse.joueuseASupprimer
        }
        setJoueuseASupprimer={
          suppressionJoueuse.setJoueuseASupprimer
        }
        equipes={equipes}
        joueuses={joueuses}
        supprimerJoueuse={supprimerJoueuse}
        fermer={() => {
          modales.fermerSuppressionJoueuse();
          suppressionJoueuse.reinitialiser();
        }}
      />
    </>
  );
}

export default GestionModals;
