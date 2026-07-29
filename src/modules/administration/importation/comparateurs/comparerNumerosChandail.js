export function comparerNumerosChandail(
  numeroImporte,
  numeroBase
) {
  const valeurImportee = String(
    numeroImporte ?? ""
  ).trim();

  const valeurBase = String(
    numeroBase ?? ""
  ).trim();

  return {
    identiques:
      Boolean(valeurImportee) &&
      Boolean(valeurBase) &&
      valeurImportee === valeurBase,

    numeroImporte: valeurImportee,
    numeroBase: valeurBase,

    numeroImportePresent: Boolean(valeurImportee),
    numeroBasePresent: Boolean(valeurBase),
  };
}