export function trouverJoueuse(
  joueuses,
  numero,
  equipeNom
) {
  return joueuses.find(
    (joueuse) =>
      String(joueuse.numero) === String(numero) &&
      joueuse.equipe === equipeNom
  );
}

export function obtenirJoueusesPresentes(
  joueuses,
  equipeNom
) {
  return joueuses.filter(
    (joueuse) =>
      joueuse.equipe === equipeNom &&
      !joueuse.absente
  );
}

export function obtenirJoueusesAbsentes(
  joueuses,
  equipe
) {
  return joueuses.filter(
    (joueuse) =>
      joueuse.equipe === equipe &&
      joueuse.absente
  );
}

export function obtenirRemplacantes(
  joueuses,
  equipe
) {
  return joueuses.filter(
    (joueuse) =>
      joueuse.equipe === equipe &&
      joueuse.remplacante
  );
}

export function obtenirJoueusesEquipe(
  joueuses,
  equipe
) {
  return joueuses.filter(
    (joueuse) => joueuse.equipe === equipe
  );
}

export function obtenirChandailsDisponibles(
  joueuses,
  equipe
) {
  const numerosUtilisesParRemplacantes = new Set(
    joueuses
      .filter(
        (joueuse) =>
          joueuse.equipe === equipe &&
          joueuse.remplacante
      )
      .map((joueuse) => String(joueuse.numero))
  );

  return joueuses
    .filter(
      (joueuse) =>
        joueuse.equipe === equipe &&
        joueuse.absente &&
        !joueuse.remplacante &&
        !numerosUtilisesParRemplacantes.has(
          String(joueuse.numero)
        )
    )
    .sort(
      (a, b) =>
        Number(a.numero) - Number(b.numero)
    );
}

export function numeroUtiliseParRemplacante(
  joueuses,
  equipe,
  numero
) {
  return joueuses.some(
    (joueuse) =>
      joueuse.equipe === equipe &&
      joueuse.remplacante &&
      String(joueuse.numero) === String(numero)
  );
}

export function numeroEstDisponible(
  joueuses,
  equipe,
  numero,
  joueuseSelectionnee = null
) {
  return !joueuses.some((joueuse) => {
    if (
      joueuse.equipe !== equipe ||
      String(joueuse.numero) !== String(numero)
    ) {
      return false;
    }

    // Une joueuse absente peut prêter son chandail
    if (joueuse.absente) {
      return false;
    }

    // Ignore la remplaçante en cours de modification
    if (
      joueuse.remplacante &&
      joueuseSelectionnee &&
      String(joueuse.id) === String(joueuseSelectionnee)
    ) {
      return false;
    }

    return true;
  });
}