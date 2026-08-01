export function calculerInformationsEquipe({
  affectations,
  equipeId,
  saisonId,
}) {
  const affectationsEquipe = affectations.filter(
    (affectation) =>
      affectation.equipeId === equipeId &&
      affectation.saisonId === saisonId &&
      affectation.active
  );

  return {
    nombreJoueuses: affectationsEquipe.length,

    nombreGardiennes: affectationsEquipe.filter(
      (a) => a.gardienne
    ).length,

    nombreCapitaines: affectationsEquipe.filter(
      (a) => a.capitaine
    ).length,

    nombreAssistantes: affectationsEquipe.filter(
      (a) => a.assistante
    ).length,

    nombreLettres: affectationsEquipe.filter(
      (a) => a.capitaine || a.assistante
    ).length,

    numerosUtilises: affectationsEquipe
      .map((a) => a.numero)
      .filter(Boolean)
      .sort((a, b) => Number(a) - Number(b)),
  };
}