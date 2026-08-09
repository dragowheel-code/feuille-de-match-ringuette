export function creerAffectationPersonnel({
  id = crypto.randomUUID(),

  saisonId = "",
  equipeId = "",
  personnelId = "",

  role = "",

  actif = true,
} = {}) {
  return {
    id,

    saisonId:
      String(saisonId).trim(),

    equipeId:
      String(equipeId).trim(),

    personnelId:
      String(personnelId).trim(),

    role:
      String(role).trim(),

    actif:
      Boolean(actif),
  };
}