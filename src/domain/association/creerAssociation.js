export function creerAssociation({
  id = crypto.randomUUID(),
  active = false,
  code = "",
  nom = "",
  abreviation = "",
  ville = "",
  courriel = "",
  nomEquipes = "",
  logo = null,
  couleurFonce = "#000000",
  couleurClair = "#FFFFFF",
} = {}) {
  return {
    id,
    active: Boolean(active),
    code: String(code).trim().toUpperCase(),
    nom: String(nom).trim(),
    abreviation: String(abreviation).trim().toUpperCase(),
    ville: String(ville).trim(),
    courriel: String(courriel).trim(),
    nomEquipes: String(nomEquipes).trim(),
    logo,
    couleurFonce,
    couleurClair,
  };
}