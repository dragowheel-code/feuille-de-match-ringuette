import { obtenirNomEquipe } from "../equipes/obtenirNomEquipe";

export function obtenirAutresEquipesJoueuse(
  affectations,
  equipes,
  joueuseId,
  equipeCouranteId
) {
  const autresAffectations =
    affectations.filter(
      (affectation) =>
        String(affectation.joueuseId) ===
          String(joueuseId) &&
        String(affectation.equipeId) !==
          String(equipeCouranteId)
    );

  return autresAffectations
    .map((affectation) =>
      equipes.find(
        (equipe) =>
          String(equipe.id) ===
          String(affectation.equipeId)
      )
    )
    .filter(Boolean)
    .map(obtenirNomEquipe);
}