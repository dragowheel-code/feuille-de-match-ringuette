export function calculerLibellePunition(penalites) {
  return penalites
    .map((penalite) => penalite.libelle)
    .join(" + ");
}