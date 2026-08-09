import {
  LIMITES_ROLES_PERSONNEL_EQUIPE,
  ROLES_PERSONNEL_EQUIPE,
} from "../../../constants/rolesPersonnelEquipe";

export function validerAffectationPersonnel(
  affectation,
  affectationsExistantes = []
) {
  const erreurs = [];

  if (!affectation.saisonId) {
    erreurs.push(
      "La saison est obligatoire."
    );
  }

  if (!affectation.equipeId) {
    erreurs.push(
      "L'équipe est obligatoire."
    );
  }

  if (!affectation.personnelId) {
    erreurs.push(
      "Le membre du personnel est obligatoire."
    );
  }

  if (!affectation.role) {
    erreurs.push(
      "Le rôle est obligatoire."
    );
  }

  if (
    affectation.role &&
    !ROLES_PERSONNEL_EQUIPE.includes(
      affectation.role
    )
  ) {
    erreurs.push(
      "Le rôle sélectionné est invalide."
    );
  }

  const memePersonneMemeEquipe =
    affectationsExistantes.some(
      (existante) =>
        String(existante.id) !==
          String(affectation.id) &&
        String(existante.saisonId) ===
          String(affectation.saisonId) &&
        String(existante.equipeId) ===
          String(affectation.equipeId) &&
        String(existante.personnelId) ===
          String(affectation.personnelId) &&
        existante.actif === true
    );

  if (memePersonneMemeEquipe) {
    erreurs.push(
      "Cette personne est déjà affectée à cette équipe pour cette saison."
    );
  }

  const limiteRole =
    LIMITES_ROLES_PERSONNEL_EQUIPE[
      affectation.role
    ];

  if (limiteRole) {
    const nombreRoleExistant =
      affectationsExistantes.filter(
        (existante) =>
          String(existante.id) !==
            String(affectation.id) &&
          String(existante.saisonId) ===
            String(affectation.saisonId) &&
          String(existante.equipeId) ===
            String(affectation.equipeId) &&
          existante.role ===
            affectation.role &&
          existante.actif === true
      ).length;

    if (
      nombreRoleExistant >=
      limiteRole
    ) {
      erreurs.push(
        `Le nombre maximum de ${affectation.role.toLowerCase()} pour cette équipe est atteint.`
      );
    }
  }

  return {
    valide: erreurs.length === 0,
    erreurs,
  };
}