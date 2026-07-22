export function calculerDureeTotale(penalites) {
  return penalites.reduce(
    (total, penalite) =>
      total + Number(penalite.duree || 0),
    0
  );
}