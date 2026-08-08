import { normaliserCategorie } from "../categories/normaliserCategorie";

export function creerJoueuse({
  id = crypto.randomUUID(),

  associationId = "",
  equipeId = "",

  nomComplet = "",
  numeroInscription = "",

  adresse = "",
  ville = "",
  codePostal = "",
  telephone = "",

  sexe = "",
  dateNaissance = "",
  age = "",

  categorie = "",
  codeCategorie = "",
  saison = "",
} = {}) {
  return {
    id,

    associationId,
    equipeId,

    nomComplet: nomComplet.trim(),
    numeroInscription: numeroInscription.trim(),

    adresse: adresse.trim(),
    ville: ville.trim(),
    codePostal: codePostal.trim(),
    telephone: telephone.trim(),

    sexe: sexe.trim(),
    dateNaissance: dateNaissance.trim(),
    age: age.trim(),

    categorie: normaliserCategorie(categorie),
    codeCategorie: codeCategorie.trim(),
    saison: saison.trim(),
  };
}