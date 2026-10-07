export const ROLES_OFFICIEL = [
  'arbitre',
  'chronometreur',
  'marqueur',
  'operateur30s',
]

export function creerOfficiel({
  id = crypto.randomUUID(),

  associationId = '',

  nom = '',
  prenom = '',
  nomFamille = '',
  courriel = '',
  telephone = '',

  arbitre = false,
  chronometreur = false,
  marqueur = false,
  operateur30s = false,

  actif = true,
} = {}) {
  return {
    id,

    associationId: String(associationId).trim(),

    nom: String(nom).trim(),
    prenom: String(prenom).trim(),
    nomFamille: String(nomFamille).trim(),
    courriel: String(courriel).trim(),
    telephone: String(telephone).trim(),

    arbitre: Boolean(arbitre),
    chronometreur: Boolean(chronometreur),
    marqueur: Boolean(marqueur),
    operateur30s: Boolean(operateur30s),

    actif: Boolean(actif),
  }
}
