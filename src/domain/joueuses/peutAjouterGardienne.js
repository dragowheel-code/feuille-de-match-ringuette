import { compterGardiennes } from "./compterGardiennes";

export function peutAjouterGardienne(
  joueuses,
  equipe
) {
  return compterGardiennes(joueuses, equipe) < 2;
}