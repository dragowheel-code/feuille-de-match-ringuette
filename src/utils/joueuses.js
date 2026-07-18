export function trouverJoueuse(joueuses, numero, equipeNom) {
  return joueuses.find(
    (joueuse) =>
      joueuse.numero === numero &&
      joueuse.equipe === equipeNom
  );
}

export function trouverJoueusesDisponibles(
  joueuses,
  equipeNom
) {
  return joueuses.filter(
    (joueuse) =>
      joueuse.equipe === equipeNom &&
      !joueuse.absente
  );
}