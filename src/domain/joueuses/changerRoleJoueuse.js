import { ROLES_JOUEUSE, peutAjouterGardienne, peutAjouterLettre } from '.'

export function changerRoleJoueuse(joueuses, id, equipe, role) {
  const joueuseCible = joueuses.find(
    (joueuse) =>
      String(joueuse.id) === String(id) &&
      String(joueuse.equipe ?? '') === String(equipe ?? '')
  )

  if (!joueuseCible) {
    return {
      succes: false,
      raison: 'JOUEUSE_INTROUVABLE',
      joueuses,
    }
  }

  const valeurActuelle = joueuseCible[role] || false

  if (
    role === ROLES_JOUEUSE.GARDIENNE &&
    !valeurActuelle &&
    !peutAjouterGardienne(joueuses, equipe)
  ) {
    return {
      succes: false,
      raison: 'MAX_GARDIENNES',
      joueuses,
    }
  }

  if (
    (role === ROLES_JOUEUSE.CAPITAINE ||
      role === ROLES_JOUEUSE.ASSISTANTE_CAPITAINE) &&
    !valeurActuelle &&
    !peutAjouterLettre(joueuses, equipe)
  ) {
    return {
      succes: false,
      raison: 'MAX_LETTRES',
      joueuses,
    }
  }

  return {
    succes: true,

    joueuses: joueuses.map((joueuse) =>
      String(joueuse.id) === String(id) &&
      String(joueuse.equipe ?? '') === String(equipe ?? '')
        ? {
            ...joueuse,
            [role]: !valeurActuelle,
          }
        : joueuse
    ),
  }
}
