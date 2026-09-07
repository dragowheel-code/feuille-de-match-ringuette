export function creerAffectation({
  id = crypto.randomUUID(),
  saisonId = '',
  equipeId = '',
  joueuseId = '',
  numero = '',
  typeAffectation = 'NORMALE',
  roleEquipe = 'JOUEUSE',
  dateDebut = '',
  dateFin = '',
  active = true,
  notes = '',
} = {}) {
  return {
    id,

    saisonId: String(saisonId ?? '').trim(),

    equipeId: String(equipeId ?? '').trim(),

    joueuseId: String(joueuseId ?? '').trim(),

    numero: String(numero ?? '').trim(),

    typeAffectation: String(typeAffectation ?? 'NORMALE')
      .trim()
      .toUpperCase(),

    roleEquipe: String(roleEquipe ?? 'JOUEUSE')
      .trim()
      .toUpperCase(),

    dateDebut: String(dateDebut ?? '').trim(),

    dateFin: String(dateFin ?? '').trim(),

    active: Boolean(active),

    notes: String(notes ?? '').trim(),
  }
}
