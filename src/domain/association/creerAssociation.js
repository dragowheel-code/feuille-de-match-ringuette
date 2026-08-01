export function creerAssociation({
  id = crypto.randomUUID(),

  active = false,

  code = "",

  nom = "",
  abreviation = "",
  ville = "",

  nomEquipes = "",

  logo = null,

  couleurPrimaire = "#000000",
  couleurSecondaire = "#FFFFFF",
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

    couleurPrimaire,
    couleurSecondaire,
  };
}