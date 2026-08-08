export function supprimerPantalons(
  pantalons,
  id
) {
  return pantalons.filter(
    (pantalon) =>
      String(pantalon.id) !== String(id)
  );
}