export function creerSaison({
  id = crypto.randomUUID(),

  nom = "",

  dateDebut = "",

  dateFin = "",

  active = false,

  verrouillee = false,

  notes = "",
} = {}) {
  return {
    id,

    nom: nom.trim(),

    dateDebut,

    dateFin,

    active,

    verrouillee,

    notes: notes.trim(),
  };
}