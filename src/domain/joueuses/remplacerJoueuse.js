export function remplacerJoueuse(
  joueuses,
  joueuseModifiee
) {
  return joueuses.map((joueuse) =>
    joueuse.id === joueuseModifiee.id
      ? joueuseModifiee
      : joueuse
  );
}