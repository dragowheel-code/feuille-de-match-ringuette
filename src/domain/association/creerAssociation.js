export function creerAssociation({
  id = crypto.randomUUID(),

  active = false,

  code = "",

  nom = "",
  abreviation = "",
  ville = "",

  nomEquipes = "",

  logo = null,

  couleurFonce = "#000000",
  couleurClair = "#FFFFFF",
} = {}) {
  return {
    id,
    active,
    code: code.trim().toUpperCase(),

    nom: nom.trim(),
    abreviation: abreviation.trim().toUpperCase(),
    ville: ville.trim(),

    nomEquipes: nomEquipes.trim(),

    logo,

    couleurFonce,
    couleurClair,
  };
}