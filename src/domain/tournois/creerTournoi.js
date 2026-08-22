export function creerTournoi({
  id = null,

  saisonId = "",
  associationOrganisatriceId = "",

  nom = "",

  dateDebut = "",
  dateFin = "",

  actif = true,
} = {}) {
  return {
    id:
      id || crypto.randomUUID(),

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