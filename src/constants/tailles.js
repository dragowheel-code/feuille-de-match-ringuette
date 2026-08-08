export const TAILLES_CHANDAILS = [
  "YXS",
  "YS",
  "YM",
  "YL",
  "YXL",

  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "XXXL",
];
export function comparerTailles(
  tailleA,
  tailleB
) {
  const indexA =
    TAILLES_CHANDAILS.indexOf(
      tailleA
    );

  const indexB =
    TAILLES_CHANDAILS.indexOf(
      tailleB
    );

  if (
    indexA === -1 &&
    indexB === -1
  ) {
    return tailleA.localeCompare(
      tailleB
    );
  }

  if (indexA === -1) {
    return 1;
  }

  if (indexB === -1) {
    return -1;
  }

  return indexA - indexB;
}