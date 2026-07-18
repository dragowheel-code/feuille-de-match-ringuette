import { trouverJoueusesDisponibles } from "../utils/joueuses";

export function useDonneesMatch({
  equipes,
  joueuses,
  officiels,
  evenements,
  matchInfo,
  buts,
  gestionPunitions,
  gestionTirBarrage,
}) {
  const equipeLocaleData = equipes.find(
    (equipe) => equipe.nom === matchInfo.equipeLocale
  );

  const equipeVisiteuseData = equipes.find(
    (equipe) => equipe.nom === matchInfo.equipeVisiteuse
  );

  const equipeNomPourBut =
    buts.equipeBut === "Local"
      ? matchInfo.equipeLocale
      : matchInfo.equipeVisiteuse;

  const joueusesDisponibles =
    trouverJoueusesDisponibles(
      joueuses,
      equipeNomPourBut
    );

  const joueusesPunitionDisponibles =
    trouverJoueusesDisponibles(
      joueuses,
      gestionPunitions.equipeNomPourPunition
    );

  const joueusesTirBarrageDisponibles =
    trouverJoueusesDisponibles(
      joueuses,
      gestionTirBarrage.equipeNomPourTirBarrage
    );

  const scoreLocal = evenements.filter(
    (event) =>
      event.type === "But" &&
      event.equipe === "Local"
  ).length;

  const scoreVisiteur = evenements.filter(
    (event) =>
      event.type === "But" &&
      event.equipe === "Visiteur"
  ).length;

  const arbitresDisponibles = officiels.filter(
    (officiel) => officiel.arbitre
  );

  const chronometreursDisponibles = officiels.filter(
    (officiel) => officiel.chronometreur
  );

  const marqueursDisponibles = officiels.filter(
    (officiel) => officiel.marqueur
  );

  const operateurs30sDisponibles = officiels.filter(
    (officiel) => officiel.operateur30s
  );

  const destinataires = [
    matchInfo.envoyerCourrielLocal
      ? equipeLocaleData?.courriel
      : null,

    matchInfo.envoyerCourrielVisiteur
      ? equipeVisiteuseData?.courriel
      : null,

    ...String(matchInfo.courrielPersonnalise || "")
      .split(",")
      .map((courriel) => courriel.trim())
      .filter(Boolean),
  ].filter(Boolean);

  return {
    equipeLocaleData,
    equipeVisiteuseData,
    equipeNomPourBut,
    joueusesDisponibles,
    joueusesPunitionDisponibles,
    joueusesTirBarrageDisponibles,
    scoreLocal,
    scoreVisiteur,
    arbitresDisponibles,
    chronometreursDisponibles,
    marqueursDisponibles,
    operateurs30sDisponibles,
    destinataires,
  };
}