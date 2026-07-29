export function ajouterJoueuses(
  joueuses,
  lignesAAjouter
) {
  const nouvellesJoueuses = [...joueuses];

  for (const ligne of lignesAAjouter) {
    nouvellesJoueuses.push(ligne.participante);
  }

  return nouvellesJoueuses;
}