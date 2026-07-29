export function changerPresence(joueuse) {
  return {
    ...joueuse,
    absente: !joueuse.absente,
  };
}