import { normaliserNom } from "./normaliserNom";

export function creerCleParticipante(participante) {
  const categorie = participante.codeCategorie ?? participante.categorie ?? "";
  const nom = normaliserNom(participante.nomComplet);

  return `${categorie}|${nom}`;
}