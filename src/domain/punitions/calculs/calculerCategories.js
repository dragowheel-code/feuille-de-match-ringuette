export function calculerCategories(penalites) {
  return [
    ...new Set(
      penalites.map(
        (penalite) => penalite.categorie
      )
    ),
  ];
}