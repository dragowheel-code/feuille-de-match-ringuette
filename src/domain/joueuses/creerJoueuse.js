export function creerJoueuse({
  id = crypto.randomUUID(),

  associationId = "",

  nomComplet = "",
  numeroInscription = "",

  adresse = "",
  ville = "",
  codePostal = "",
  telephone = "",

  sexe = "",
  dateNaissance = "",

  active = true,
} = {}) {
  return {
    id,

    associationId:
      String(
        associationId ?? ""
      ).trim(),

    nomComplet:
      String(
        nomComplet ?? ""
      ).trim(),

    numeroInscription:
      String(
        numeroInscription ?? ""
      ).trim(),

    adresse:
      String(
        adresse ?? ""
      ).trim(),

    ville:
      String(
        ville ?? ""
      ).trim(),

    codePostal:
      String(
        codePostal ?? ""
      ).trim(),

    telephone:
      String(
        telephone ?? ""
      ).trim(),

    sexe:
      String(
        sexe ?? ""
      ).trim(),

    dateNaissance:
      String(
        dateNaissance ?? ""
      ).trim(),

    active:
      Boolean(active),
  };
}