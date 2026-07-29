import { compterLettres } from "./compterLettres";

export function peutAjouterLettre(joueuses, equipe) {
  return compterLettres(joueuses, equipe) < 3;
}