export function calculerPortionActive(portions) {
  return (
    portions.find(
      (portion) => portion.etat === "active"
    ) ?? null
  );
}