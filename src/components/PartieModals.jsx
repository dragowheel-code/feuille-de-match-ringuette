import ButModal from "../modals/ButModal";
import TirBarrageModal from "../modals/TirBarrageModal";
import PunitionModal from "../modals/PunitionModal";
import AnnulationPunitionModal from "../modals/AnnulationPunitionModal";
import RemplacanteModal from "../modals/RemplacanteModal";
import GardienneModal from "../modals/GardienneModal";
import TempsMortModal from "../modals/TempsMortModal";

function PartieModals({
  matchInfo,
  periode,

  buts,
  equipeNomPourBut,
  calculerTempsCorrige,
  joueusesDisponibles,
  confirmerBut,

  tirBarrage,
  joueusesTirBarrageDisponibles,
  confirmerTirBarrage,

  punition,
  joueusesPunitionDisponibles,
  confirmerPunition,

  annulationPunition,
  confirmerAnnulationPunition,
  confirmerButSansAnnulation,

  modales,
  remplacante,
  confirmerRemplacante,

  gardienne,
  confirmerChangementGardienne,

  tempsMort,
  confirmerTempsMort,
}) {
  return (
    <>
      <ButModal
        ouverte={buts.fenetreButOuverte}
        equipeNomPourBut={equipeNomPourBut}
        tempsTableau={buts.tempsTableau}
        setTempsTableau={buts.setTempsTableau}
        calculerTempsCorrige={calculerTempsCorrige}
        numeroButeuse={buts.numeroButeuse}
        setNumeroButeuse={buts.setNumeroButeuse}
        assistante1={buts.assistante1}
        setAssistante1={buts.setAssistante1}
        assistante2={buts.assistante2}
        setAssistante2={buts.setAssistante2}
        joueusesDisponibles={joueusesDisponibles}
        confirmerBut={confirmerBut}
        fermer={buts.fermer}
      />

      <TirBarrageModal
        ouverte={tirBarrage.fenetreTirBarrageOuverte}
        equipeTirBarrage={tirBarrage.equipeTirBarrage}
        setEquipeTirBarrage={tirBarrage.setEquipeTirBarrage}
        matchInfo={matchInfo}
        joueuseTirBarrage={tirBarrage.joueuseTirBarrage}
        setJoueuseTirBarrage={
          tirBarrage.setJoueuseTirBarrage
        }
        joueusesTirBarrageDisponibles={
          joueusesTirBarrageDisponibles
        }
        tirBarrageReussi={tirBarrage.tirBarrageReussi}
        setTirBarrageReussi={
          tirBarrage.setTirBarrageReussi
        }
        confirmerTirBarrage={confirmerTirBarrage}
        fermer={tirBarrage.fermer}
      />

      <PunitionModal
        ouverte={punition.fenetrePunitionOuverte}
        equipePunition={punition.equipePunition}
        setEquipePunition={punition.setEquipePunition}
        matchInfo={matchInfo}
        tempsPunitionTableau={
          punition.tempsPunitionTableau
        }
        setTempsPunitionTableau={
          punition.setTempsPunitionTableau
        }
        tempsCorrige={calculerTempsCorrige(
          punition.tempsPunitionTableau
        )}
        joueusePunition={punition.joueusePunition}
        setJoueusePunition={
          punition.setJoueusePunition
        }
        joueusePurgeePar={punition.joueusePurgeePar}
        setJoueusePurgeePar={
          punition.setJoueusePurgeePar
        }
        joueusesPunitionDisponibles={
          joueusesPunitionDisponibles
        }
        typePunition={punition.typePunition}
        setTypePunition={punition.setTypePunition}
        dureePunition={punition.dureePunition}
        setDureePunition={punition.setDureePunition}
        nombrePortionsPunition={
          punition.nombrePortionsPunition
        }
        setNombrePortionsPunition={
          punition.setNombrePortionsPunition
        }
        confirmerPunition={confirmerPunition}
        fermer={punition.fermer}
      />

      <AnnulationPunitionModal
        ouverte={
          annulationPunition.fenetreAnnulationOuverte
        }
        butEnAttente={
          annulationPunition.butEnAttente
        }
        punitionSelectionnee={
          annulationPunition.punitionSelectionnee
        }
        setPunitionSelectionnee={
          annulationPunition.setPunitionSelectionnee
        }
        punitionsAnnulables={
          annulationPunition.punitionsAnnulables
        }
        confirmerAnnulationPunition={
          confirmerAnnulationPunition
        }
        confirmerButSansAnnulation={
          confirmerButSansAnnulation
        }
      />

      <RemplacanteModal
        ouverte={modales.fenetreRemplacanteOuverte}
        equipeRemplacante={
          remplacante.equipeRemplacante
        }
        numeroRemplacante={
          remplacante.numeroRemplacante
        }
        setNumeroRemplacante={
          remplacante.setNumeroRemplacante
        }
        nomRemplacante={remplacante.nomRemplacante}
        setNomRemplacante={
          remplacante.setNomRemplacante
        }
        confirmerRemplacante={confirmerRemplacante}
        fermer={() => {
          modales.fermerRemplacante();
          remplacante.reinitialiser();
        }}
      />

      <GardienneModal
        ouverte={gardienne.fenetreGardienneOuverte}
        equipeGardienne={gardienne.equipeGardienne}
        setEquipeGardienne={
          gardienne.setEquipeGardienne
        }
        tempsGardienneTableau={
          gardienne.tempsGardienneTableau
        }
        setTempsGardienneTableau={
          gardienne.setTempsGardienneTableau
        }
        matchInfo={matchInfo}
        periode={periode}
        tempsCorrige={calculerTempsCorrige(
          gardienne.tempsGardienneTableau
        )}
        confirmer={confirmerChangementGardienne}
        fermer={gardienne.fermer}
      />

      <TempsMortModal
        ouverte={tempsMort.fenetreTempsMortOuverte}
        equipeTempsMort={tempsMort.equipeTempsMort}
        setEquipeTempsMort={
          tempsMort.setEquipeTempsMort
        }
        matchInfo={matchInfo}
        periode={periode}
        confirmerTempsMort={confirmerTempsMort}
        fermer={tempsMort.fermer}
      />
    </>
  );
}

export default PartieModals;