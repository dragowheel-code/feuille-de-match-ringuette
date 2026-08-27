import ConfigurationModal from "../modals/ConfigurationModal";
import ParametresModal from "../modals/ParametresModal";

function GestionModals({
  modales,

  matchInfo,
  setMatchInfo,

  associations,
  tournois,

  equipesAdministration,
  joueusesAdministration,
  affectationsAdministration,
  chargerAlignementPublic,

  inscriptionsEquipesTournoi,
  inscriptionsOfficielsTournoi,

  dureePeriode,
  setDureePeriode,

  officiels,
  setJoueuses,

  equipeLocaleData,
  equipeVisiteuseData,
  destinataires,

  effacerSauvegarde,
}) {
  return (
    <>
      <ConfigurationModal
  ouverte={modales.fenetreConfigOuverte}
  fermer={() =>
    modales.fermerConfiguration()
  }

  matchInfo={matchInfo}
  setMatchInfo={setMatchInfo}

  associations={associations}
  tournois={tournois}

  joueusesAdministration={
    joueusesAdministration
  }

  affectationsAdministration={
    affectationsAdministration
  }

  setJoueuses={setJoueuses}

  equipesAdministration={
    equipesAdministration
  }

  inscriptionsEquipesTournoi={
    inscriptionsEquipesTournoi
  }

  officiels={officiels}

  inscriptionsOfficielsTournoi={
    inscriptionsOfficielsTournoi
  }

  dureePeriode={dureePeriode}
  setDureePeriode={setDureePeriode}

  equipeLocaleData={
    equipeLocaleData
  }

  equipeVisiteuseData={
    equipeVisiteuseData
  }

  destinataires={destinataires}

  chargerAlignementPublic={
    chargerAlignementPublic
  }
/>

      <ParametresModal
        ouverte={
          modales.fenetreParametresOuverte
        }

        fermer={
          modales.fermerParametres
        }

        effacerSauvegarde={
          effacerSauvegarde
        }
      />
    </>
  );
}

export default GestionModals;