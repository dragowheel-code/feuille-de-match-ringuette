export function compterGardiennes(joueuses, equipe) {
  return joueuses.filter(
    (joueuse) =>
      joueuse.equipe === equipe &&
      joueuse.gardienne
  ).length;
}