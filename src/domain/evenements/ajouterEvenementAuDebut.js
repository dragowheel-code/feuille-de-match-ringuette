export function ajouterEvenementAuDebut(
  anciensEvenements,
  nouvelEvenement
) {
  return [
    nouvelEvenement,
    ...anciensEvenements,
  ];
}