export function supprimerTournoi(
  tournoisExistants = [],
  tournoiId
) {
  const tournoiExistant =
    tournoisExistants.find(
      (tournoi) =>
        String(tournoi.id) ===
        String(tournoiId)
    );

  if (!tournoiExistant) {
    return {
      succes: false,
      tournois: tournoisExistants,
      erreurs: [
        "Le tournoi est introuvable.",
      ],
    };
  }

  return {
    succes: true,
    tournois:
      tournoisExistants.filter(
        (tournoi) =>
          String(tournoi.id) !==
          String(tournoiId)
      ),
    erreurs: [],
  };
}