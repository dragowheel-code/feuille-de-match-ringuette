export function mettreAJourMatch(match, modifications) {
  return {
    ...match,
    ...modifications,
  };
}