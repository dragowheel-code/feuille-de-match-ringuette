export function verifierNumeroDisponible({
  affectations,
  equipeId,
  saisonId,
  numero,
  affectationId = null,
}) {
  return !affectations.some((affectation) => {
    if (!affectation.active) {
      return false;
    }

    if (affectation.id === affectationId) {
      return false;
    }

    return (
      affectation.equipeId === equipeId &&
      affectation.saisonId === saisonId &&
      String(affectation.numero) === String(numero)
    );
  });
}