import Alignements from "./Alignements";

function AlignementsPage({
  joueuses,
  matchInfo,
  setMatchInfo,

  equipeLocaleData,
  equipeVisiteuseData,

  localOuvert,
  setLocalOuvert,

  visiteurOuvert,
  setVisiteurOuvert,

  gestionEffectifs,
}) {
  return (
    <Alignements
      joueuses={joueuses}
      matchInfo={matchInfo}
      setMatchInfo={setMatchInfo}
      equipeLocaleData={equipeLocaleData}
      equipeVisiteuseData={equipeVisiteuseData}
      localOuvert={localOuvert}
      setLocalOuvert={setLocalOuvert}
      visiteurOuvert={visiteurOuvert}
      setVisiteurOuvert={setVisiteurOuvert}
      ouvrirFenetreRemplacante={
        gestionEffectifs.ouvrirFenetreRemplacante
      }
      changerPresence={
        gestionEffectifs.changerPresence
      }
      changerSuspension={
        gestionEffectifs.changerSuspension
      }
      changerRoleJoueuse={
        gestionEffectifs.changerRoleJoueuse
      }
    />
  );
}

export default AlignementsPage;