export function modifierOfficiel(
  officiels,
  idOfficiel,
  modifications
) {
  return officiels.map((officiel) =>
    String(officiel.id) === String(idOfficiel)
      ? {
          ...officiel,
          ...modifications,
        }
      : officiel
  );
}
