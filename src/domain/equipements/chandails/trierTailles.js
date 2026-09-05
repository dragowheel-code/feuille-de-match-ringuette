const ORDRE_TAILLES = [
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
  "GC-JRXL",
  "GC-S",
  "GC-L",
  "GC-XXL",
];

export function trierTailles(
  tailles
) {
  return [...tailles].sort(
    (a, b) => {
      const indexA =
        ORDRE_TAILLES.indexOf(a);

      const indexB =
        ORDRE_TAILLES.indexOf(b);

      if (
        indexA === -1 &&
        indexB === -1
      ) {
        return a.localeCompare(b);
      }

      if (indexA === -1) {
        return 1;
      }

      if (indexB === -1) {
        return -1;
      }

      return indexA - indexB;
    }
  );
}