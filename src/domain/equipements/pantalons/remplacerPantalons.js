export function remplacerPantalons(
  pantalons,
  id,
  modifications
) {
  return pantalons.map((pantalon) =>
    String(pantalon.id) === String(id)
      ? {
          ...pantalon,
          ...modifications,
        }
      : pantalon
  );
}