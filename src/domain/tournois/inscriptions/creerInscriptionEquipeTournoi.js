export function creerInscriptionEquipeTournoi({
  id = crypto.randomUUID(),
  tournoiId = "",
  equipeId = "",
} = {}) {
  return {
    id,

    tournoiId:
      String(tournoiId).trim(),

    equipeId:
      String(equipeId).trim(),
  };
}