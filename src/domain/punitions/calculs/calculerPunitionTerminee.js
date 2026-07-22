export function calculerPunitionTerminee(
  portions
) {
  return portions.every(
    (portion) =>
      portion.etat === "annulee" ||
      portion.etat === "terminee"
  );
}