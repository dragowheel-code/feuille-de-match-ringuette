import { creerTournoi } from "./creerTournoi";
import { validerTournoi } from "./validerTournoi";

export function modifierTournoi(
  tournoisExistants = [],
  formulaire = {}
) {
  const tournoiExistant =
    tournoisExistants.find(
      (tournoi) =>
        String(tournoi.id) ===
        String(formulaire.id)
    );

  if (!tournoiExistant) {
    return {
      succes: false,
      tournoi: null,
      tournois: tournoisExistants,
      erreurs: [
        "Le tournoi est introuvable.",
      ],
    };
  }

  const tournoiModifie =
    creerTournoi({
      ...tournoiExistant,
      ...formulaire,
      id: tournoiExistant.id,
    });

  const validation =
    validerTournoi(
      tournoiModifie,
      tournoisExistants
    );

  if (!validation.valide) {
    return {
      succes: false,
      tournoi: null,
      tournois: tournoisExistants,
      erreurs:
        validation.erreurs,
    };
  }

  const nouvelleListe =
    tournoisExistants.map(
      (tournoi) =>
        String(tournoi.id) ===
        String(
          tournoiExistant.id
        )
          ? tournoiModifie
          : tournoi
    );

  return {
    succes: true,
    tournoi:
      tournoiModifie,
    tournois:
      nouvelleListe,
    erreurs: [],
  };
}