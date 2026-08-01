export function validerAffectationsEquipe(
  affectations
) {
  const erreurs = [];

  if (affectations.length > 19) {
    erreurs.push(
      "Une équipe ne peut pas avoir plus de 19 joueuses affectées."
    );
  }

  return {
    valide: erreurs.length === 0,
    erreurs,
  };
}