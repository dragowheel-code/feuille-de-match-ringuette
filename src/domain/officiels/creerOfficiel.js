export const ROLES_OFFICIEL = [
  "arbitre",
  "chronometreur",
  "marqueur",
  "operateur30s",
];

export function creerOfficiel({
  id = crypto.randomUUID(),

  associationId = "",

  nom = "",

  arbitre = false,
  chronometreur = false,
  marqueur = false,
  operateur30s = false,

  actif = true,
} = {}) {
  return {
    id,

    associationId:
      String(associationId).trim(),

    nom:
      String(nom).trim(),

    arbitre:
      Boolean(arbitre),

    chronometreur:
      Boolean(chronometreur),

    marqueur:
      Boolean(marqueur),

    operateur30s:
      Boolean(operateur30s),

    actif:
      Boolean(actif),
  };
}