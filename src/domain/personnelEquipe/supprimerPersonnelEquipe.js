export function supprimerPersonnelEquipe(
  personnelExistants = [],
  personnelId
) {
  const personnelExistant =
    personnelExistants.find(
      (personnel) =>
        String(personnel.id) ===
        String(personnelId)
    );

  if (!personnelExistant) {
    return {
      succes: false,
      personnel: null,
      personnelEquipe:
        personnelExistants,
      erreurs: [
        "Le membre du personnel est introuvable.",
      ],
    };
  }

  const nouvelleListe =
    personnelExistants.filter(
      (personnel) =>
        String(personnel.id) !==
        String(personnelId)
    );

  return {
    succes: true,
    personnel: personnelExistant,
    personnelEquipe: nouvelleListe,
    erreurs: [],
  };
}