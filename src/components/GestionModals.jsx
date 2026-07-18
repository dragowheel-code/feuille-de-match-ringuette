import ConfigurationModal from "../modals/ConfigurationModal";
import ImportExcelModal from "../modals/ImportExcelModal";
import ParametresModal from "../modals/ParametresModal";
import ListeOfficielsModal from "../modals/ListeOfficielsModal";
import SuppressionOfficielModal from "../modals/SuppressionOfficielModal";
import SuppressionEquipeModal from "../modals/SuppressionEquipeModal";
import SuppressionJoueuseModal from "../modals/SuppressionJoueuseModal";

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

  arbitresDisponibles,
  chronometreursDisponibles,
  marqueursDisponibles,
  operateurs30sDisponibles,

  setPageActive,
  effacerSauvegarde,

  suppressionOfficiel,
  supprimerOfficiel,

  suppressionEquipe,
  supprimerEquipe,

  suppressionJoueuse,
  supprimerJoueuse,
}) {
  return (
    <>
      <ConfigurationModal
        ouverte={modales.fenetreConfigOuverte}
        fermer={modales.fermerConfiguration}
        matchInfo={matchInfo}
        setMatchInfo={setMatchInfo}
        dureePeriode={dureePeriode}
        setDureePeriode={setDureePeriode}
        equipes={equipes}
        equipeLocaleData={equipeLocaleData}
        equipeVisiteuseData={equipeVisiteuseData}
        destinataires={destinataires}
        arbitresDisponibles={arbitresDisponibles}
        chronometreursDisponibles={chronometreursDisponibles}
        marqueursDisponibles={marqueursDisponibles}
        operateurs30sDisponibles={operateurs30sDisponibles}
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
        fermer={modales.fermerListeOfficiels}
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