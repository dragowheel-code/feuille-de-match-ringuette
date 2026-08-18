export function creerTournoi({
  id = crypto.randomUUID(),

  saisonId = "",
  associationOrganisatriceId = "",

  nom = "",

  dateDebut = "",
  dateFin = "",

  actif = true,
} = {}) {
  return {
    id,

    saisonId:
      String(saisonId).trim(),

    associationOrganisatriceId:
      String(
        associationOrganisatriceId
      ).trim(),

    nom:
      String(nom).trim(),

    dateDebut:
      String(dateDebut).trim(),

    dateFin:
      String(dateFin).trim(),

    actif:
      Boolean(actif),
  };
}