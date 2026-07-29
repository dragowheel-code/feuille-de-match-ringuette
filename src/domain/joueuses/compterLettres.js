export function compterLettres(joueuses, equipe) {
  return joueuses.filter(
    (joueuse) =>
      joueuse.equipe === equipe &&
      (
        joueuse.capitaine ||
        joueuse.assistanteCapitaine
      )
  ).length;
}