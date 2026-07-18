import Actions from "./Actions";
import GameClock from "./GameClock";
import Scoreboard from "./Scoreboard";
import Evenements from "./Evenements";

function MatchPage({
  matchInfo,
  setMatchInfo,

  periode,
  setPeriode,

  dureePeriode,
  setDureePeriode,

  scoreLocal,
  scoreVisiteur,

  evenements,

  horloge,
  exportMatch,
  gestionPartie,
  gestionButs,
  gestionPunitions,
  gestionTirBarrage,
  gestionGardienne,
  gestionTempsMort,

  ouvrirConfiguration,
}) {
  return (
    <>
      <Actions
        ouvrirConfiguration={ouvrirConfiguration}
        nouvellePartie={gestionPartie.nouvellePartie}
        ouvrirFenetrePunition={
          gestionPunitions.ouvrirFenetrePunition
        }
        ouvrirFenetreTempsMort={
          gestionTempsMort.ouvrirFenetreTempsMort
        }
        ouvrirFenetreGardienne={
          gestionGardienne.ouvrirFenetreGardienne
        }
        ouvrirFenetreTirBarrage={
          gestionTirBarrage.ouvrirFenetreTirBarrage
        }
        exporterPDF={exportMatch.exporterPDF}
        envoyerPDF={exportMatch.envoyerPDF}
      />

      <GameClock
        obtenirHeureActuelle={
          horloge.obtenirHeureActuelle
        }
        heureDebut={matchInfo.heureDebut}
        heureFin={matchInfo.heureFin}
        enregistrerHeureDebut={() =>
          setMatchInfo((anciennesInformations) => ({
            ...anciennesInformations,
            heureDebut:
              horloge.obtenirHeureActuelle(),
          }))
        }
        enregistrerHeureFin={() =>
          setMatchInfo((anciennesInformations) => ({
            ...anciennesInformations,
            heureFin:
              horloge.obtenirHeureActuelle(),
          }))
        }
      />

      <Scoreboard
        matchInfo={matchInfo}
        scoreLocal={scoreLocal}
        scoreVisiteur={scoreVisiteur}
        periode={periode}
        setPeriode={setPeriode}
        dureePeriode={dureePeriode}
        setDureePeriode={setDureePeriode}
        ouvrirFenetreBut={
          gestionButs.ouvrirFenetreBut
        }
        retirerDernierBut={
          gestionButs.retirerDernierBut
        }
      />

      <Evenements
        evenements={evenements}
        supprimerEvenement={
          gestionPartie.supprimerEvenement
        }
      />
    </>
  );
}

export default MatchPage;