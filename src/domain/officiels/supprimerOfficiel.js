export function supprimerOfficiel(officiels, nom) {
  return officiels.filter(
    (officiel) => officiel.nom !== nom
  );
}