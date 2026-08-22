export function obtenirCategorieJoueuse(
  dateNaissance,
  anneeReference
) {
  if (
    !dateNaissance ||
    !anneeReference
  ) {
    return null;
  }

  const anneeNaissance =
    Number(
      String(dateNaissance).slice(
        0,
        4
      )
    );

  if (
    !Number.isInteger(
      anneeNaissance
    )
  ) {
    return null;
  }

  const age =
    Number(anneeReference) -
    anneeNaissance;

  if (age >= 4 && age < 8) {
    return "U8";
  }

  if (age >= 8 && age < 10) {
    return "U10";
  }

  if (age >= 10 && age < 12) {
    return "U12";
  }

  if (age >= 12 && age < 14) {
    return "U14";
  }

  if (age >= 14 && age < 16) {
    return "U16";
  }

  if (age >= 16 && age < 19) {
    return "U19";
  }

  if (age >= 19) {
    return "19+";
  }

  return null;
}