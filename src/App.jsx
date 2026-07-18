import {useState } from "react";
import "./App.css";
import PartieModals from "./components/PartieModals";
import GestionModals from "./components/GestionModals";
import MatchPage from "./components/MatchPage";
import AlignementsPage from "./components/AlignementsPage";
import AppNavigation from "./components/AppNavigation";
import {useTempsMort} from "./hooks/useTempsMort";
import {useGardienne} from "./hooks/useGardienne";
import {useModales} from "./hooks/useModales";
import {useButs} from "./hooks/useButs";
import {useTirBarrage} from "./hooks/useTirBarrage";
import {usePunition} from "./hooks/usePunition";
import {useAnnulationPunition} from "./hooks/useAnnulationPunition";
import {useRemplacante} from "./hooks/useRemplacante";
import {useSuppressionEquipe} from "./hooks/useSuppressionEquipe";
import {useSuppressionJoueuse} from "./hooks/useSuppressionJoueuse";
import {useSuppressionOfficiel} from "./hooks/useSuppressionOfficiel";
import {useExportMatch} from "./hooks/useExportMatch";
import {useGestionEffectifs} from "./hooks/useGestionEffectifs";
import {useGestionButs} from "./hooks/useGestionButs";
import {useGestionPunitions} from "./hooks/useGestionPunitions";
import {useGestionTirBarrage} from "./hooks/useGestionTirBarrage";
import {useGestionGardienne} from "./hooks/useGestionGardienne";
import { useGestionTempsMort } from "./hooks/useGestionTempsMort";
import { useGestionPartie } from "./hooks/useGestionPartie";
import { useDonneesApplication } from "./hooks/useDonneesApplication";import { useHorloge } from "./hooks/useHorloge";
import { useDonneesMatch } from "./hooks/useDonneesMatch";
import {calculerTempsCorrige as calculerTempsCorrigeUtil,} from "./utils/temps";
import { COULEURS } from "./constants/couleurs";

function App() {
    const donneesApplication = useDonneesApplication();
    const {
    matchInfo,
    setMatchInfo,
    equipes,
    setEquipes,
    joueuses,
    setJoueuses,
    evenements,
    setEvenements,
    officiels,
    setOfficiels,
  } = donneesApplication;
  const horloge = useHorloge();
  const [pageActive, setPageActive] = useState("match");
  const tirBarrage = useTirBarrage();
  const [periode, setPeriode] = useState("1");
  const [dureePeriode, setDureePeriode] = useState(12);
  const remplacante = useRemplacante();
  const suppressionEquipe = useSuppressionEquipe();
  const suppressionOfficiel = useSuppressionOfficiel();
  const suppressionJoueuse = useSuppressionJoueuse();
  const tempsMort = useTempsMort();
  const gardienne = useGardienne();
  const buts = useButs();
  const punition = usePunition();
  const annulationPunition = useAnnulationPunition();
  const [localOuvert, setLocalOuvert] = useState(true);
  const [visiteurOuvert, setVisiteurOuvert] = useState(false);
  const modales = useModales();

  const gestionPartie = useGestionPartie({
  matchInfo,
  setMatchInfo,
  setPeriode,
  setEvenements,
});

  const gestionEffectifs = useGestionEffectifs({
  setMatchInfo,
  setEquipes,
  joueuses,
  setJoueuses,
  setOfficiels,

  modales,
  remplacante,
  suppressionEquipe,
  suppressionJoueuse,
  suppressionOfficiel,
});
const gestionButs = useGestionButs({
  matchInfo,
  periode,
  dureePeriode,
  joueuses,
  evenements,
  setEvenements,
  buts,
  annulationPunition,
});
const gestionPunitions = useGestionPunitions({
  matchInfo,
  periode,
  dureePeriode,
  joueuses,
  setEvenements,
  punition,
});

const gestionTirBarrage = useGestionTirBarrage({
  matchInfo,
  joueuses,
  setEvenements,
  tirBarrage,
});

const donneesMatch = useDonneesMatch({
  equipes,
  joueuses,
  officiels,
  evenements,
  matchInfo,
  buts,
  gestionPunitions,
  gestionTirBarrage,
});

const gestionGardienne = useGestionGardienne({
  matchInfo,
  periode,
  dureePeriode,
  evenements,
  setEvenements,
  gardienne,
});

const gestionTempsMort = useGestionTempsMort({
  matchInfo,
  periode,
  evenements,
  setEvenements,
  tempsMort,
});

  function calculerTempsCorrige(temps) {
  return calculerTempsCorrigeUtil(
    temps,
    dureePeriode
  );
}

const exportMatch = useExportMatch({
  matchInfo,
  dureePeriode,
  evenements,
  joueuses,
  equipeLocaleData: donneesMatch.equipeLocaleData,
  equipeVisiteuseData: donneesMatch.equipeVisiteuseData,
  scoreLocal: donneesMatch.scoreLocal,
  scoreVisiteur: donneesMatch.scoreVisiteur,
  destinataires: donneesMatch.destinataires,
  validerFeuilleMatch: gestionPartie.validerFeuilleMatch,
});

  return (

    
  <main className="app">
  <AppNavigation
    matchInfo={matchInfo}
    pageActive={pageActive}
    setPageActive={setPageActive}
    ouvrirParametres={modales.ouvrirParametres}
  />
  
  {pageActive === "match" && (
  <MatchPage
    matchInfo={matchInfo}
    setMatchInfo={setMatchInfo}

    periode={periode}
    setPeriode={setPeriode}

    dureePeriode={dureePeriode}
    setDureePeriode={setDureePeriode}

    scoreLocal={donneesMatch.scoreLocal}
    scoreVisiteur={donneesMatch.scoreVisiteur}

    evenements={evenements}

    horloge={horloge}
    exportMatch={exportMatch}
    gestionPartie={gestionPartie}
    gestionButs={gestionButs}
    gestionPunitions={gestionPunitions}
    gestionTirBarrage={gestionTirBarrage}
    gestionGardienne={gestionGardienne}
    gestionTempsMort={gestionTempsMort}

    ouvrirConfiguration={
      modales.ouvrirConfiguration
    }
  />
)}

 {pageActive === "alignements" && (
  <AlignementsPage
    joueuses={joueuses}
    matchInfo={matchInfo}
    setMatchInfo={setMatchInfo}
    equipeLocaleData={donneesMatch.equipeLocaleData}
    equipeVisiteuseData={donneesMatch.equipeVisiteuseData}
    localOuvert={localOuvert}
    setLocalOuvert={setLocalOuvert}
    visiteurOuvert={visiteurOuvert}
    setVisiteurOuvert={setVisiteurOuvert}
    gestionEffectifs={gestionEffectifs}
  />
)}
<GestionModals
  modales={modales}
  couleurs={COULEURS}
  matchInfo={matchInfo}
  setMatchInfo={setMatchInfo}
  dureePeriode={dureePeriode}
  setDureePeriode={setDureePeriode}
  equipes={equipes}
  setEquipes={setEquipes}
  joueuses={joueuses}
  setJoueuses={setJoueuses}
  officiels={officiels}
  setOfficiels={setOfficiels}
  equipeLocaleData={donneesMatch.equipeLocaleData}
  equipeVisiteuseData={donneesMatch.equipeVisiteuseData}
  destinataires={donneesMatch.destinataires}
  arbitresDisponibles={donneesMatch.arbitresDisponibles}
  chronometreursDisponibles={donneesMatch.chronometreursDisponibles}
  marqueursDisponibles={donneesMatch.marqueursDisponibles}
  operateurs30sDisponibles={donneesMatch.operateurs30sDisponibles}
  setPageActive={setPageActive}
  effacerSauvegarde={gestionPartie.effacerSauvegarde}
  suppressionOfficiel={suppressionOfficiel}
  supprimerOfficiel={gestionEffectifs.supprimerOfficiel}
  suppressionEquipe={suppressionEquipe}
  supprimerEquipe={gestionEffectifs.supprimerEquipe}
  suppressionJoueuse={suppressionJoueuse}
  supprimerJoueuse={gestionEffectifs.supprimerJoueuse}
/>
<PartieModals
  matchInfo={matchInfo}
  periode={periode}

  buts={buts}
  equipeNomPourBut={donneesMatch.equipeNomPourBut}
  calculerTempsCorrige={calculerTempsCorrige}
  joueusesDisponibles={donneesMatch.joueusesDisponibles}
  confirmerBut={gestionButs.confirmerBut}
  tirBarrage={tirBarrage}
  joueusesTirBarrageDisponibles={donneesMatch.joueusesTirBarrageDisponibles}
  confirmerTirBarrage={gestionTirBarrage.confirmerTirBarrage}
  punition={punition}
  joueusesPunitionDisponibles={donneesMatch.joueusesPunitionDisponibles}
  confirmerPunition={gestionPunitions.confirmerPunition}
  annulationPunition={annulationPunition}
  confirmerAnnulationPunition={gestionButs.confirmerAnnulationPunition}
  confirmerButSansAnnulation={gestionButs.confirmerButSansAnnulation}
  modales={modales}
  remplacante={remplacante}
  confirmerRemplacante={gestionEffectifs.confirmerRemplacante}
  gardienne={gardienne}
  confirmerChangementGardienne={gestionGardienne.confirmerChangementGardienne}
  tempsMort={tempsMort}
  confirmerTempsMort={gestionTempsMort.confirmerTempsMort}
/>
    </main>
  );
}
export default App;