export function trouverPortionActive(portions) {
  return portions.find(
    (portion) => portion.etat === "active"
  );
}
