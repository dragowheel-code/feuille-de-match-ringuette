export function creerInscriptionOfficielTournoi({
  id = crypto.randomUUID(),
  tournoiId = "",
  officielId = "",
} = {}) {
  return {
    id,

    tournoiId:
      String(tournoiId).trim(),

    officielId:
      String(officielId).trim(),
  };
}