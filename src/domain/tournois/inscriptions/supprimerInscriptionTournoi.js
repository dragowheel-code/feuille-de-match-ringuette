export function supprimerInscriptionTournoi(
  inscriptions = [],
  inscriptionId
) {
  const existe =
    inscriptions.some(
      (inscription) =>
        String(inscription.id) ===
        String(inscriptionId)
    );

  if (!existe) {
    return {
      succes: false,
      inscriptions,
      erreurs: [
        "L'inscription est introuvable.",
      ],
    };
  }

  return {
    succes: true,

    inscriptions:
      inscriptions.filter(
        (inscription) =>
          String(
            inscription.id
          ) !==
          String(
            inscriptionId
          )
      ),

    erreurs: [],
  };
}