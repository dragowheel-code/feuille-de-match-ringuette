export function mettreAJourJoueuses(
  joueuses,
  lignesAMettreAJour
) {
  const nouvellesJoueuses = [...joueuses];

  for (const ligne of lignesAMettreAJour) {
    const index = nouvellesJoueuses.findIndex(
      (j) => j.id === ligne.joueuse.id
    );

    if (index === -1) {
      continue;
    }

    nouvellesJoueuses[index] = {
      ...nouvellesJoueuses[index],
      ...ligne.participante,
    };
  }

  return nouvellesJoueuses;
}