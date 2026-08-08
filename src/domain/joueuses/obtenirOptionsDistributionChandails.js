export function obtenirOptionsDistributionChandails(
  joueuses = []
) {
  return joueuses.map((joueuse) => ({
    value: joueuse.id,
    label: joueuse.nomComplet,
  }));
}