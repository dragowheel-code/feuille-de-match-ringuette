export function changerSuspension(joueuse) {
  return {
    ...joueuse,
    suspendue: !joueuse.suspendue,
  };
}