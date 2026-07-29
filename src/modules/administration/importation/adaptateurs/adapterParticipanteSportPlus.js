function nettoyer(valeur) {
  return String(valeur ?? "").trim();
}

export function adapterParticipanteSportPlus(participante) {
  return {
    nomComplet: nettoyer(participante.Nom),
    numeroInscription: nettoyer(participante["# Insc"]),
    adresse: nettoyer(participante.Adresse),
    ville: nettoyer(participante.Ville),
    codePostal: nettoyer(participante["Code Postal"]),
    telephone: nettoyer(participante.Téléphone),
    sexe: nettoyer(participante.Sexe),
    dateNaissance: nettoyer(participante.Naissance),
    age: nettoyer(participante.Âge),

    categorie: participante.categorie,
    codeCategorie: participante.codeCategorie,
    saison: participante.saison,
  };
}