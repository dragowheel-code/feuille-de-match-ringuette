export function supprimerJoueuse(
  joueuses,
  idJoueuse
) {
  return joueuses.filter(
    (joueuse) => joueuse.id !== idJoueuse
  );
}