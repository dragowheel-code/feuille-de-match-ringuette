export function creerAffectation({
  id = crypto.randomUUID(),

  saisonId = "",
  equipeId = "",
  joueuseId = "",

  numero = "",

  gardienne = false,
  capitaine = false,
  assistante = false,

  dateDebut = "",
  dateFin = "",

  active = true,

  notes = "",
} = {}) {
  return {
    id,

    saisonId,
    equipeId,
    joueuseId,

    numero,

    gardienne,
    capitaine,
    assistante,

    dateDebut,
    dateFin,

    active,

    notes: notes.trim(),
  };
}