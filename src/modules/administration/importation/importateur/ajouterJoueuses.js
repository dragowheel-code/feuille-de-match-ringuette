function obtenirCleJoueuse(joueuse) {
  const saison = joueuse.saison ?? "";
  const codeCategorie =
    joueuse.codeCategorie ?? "";
  const numeroInscription =
    joueuse.numeroInscription ?? "";

  if (
    codeCategorie &&
    numeroInscription
  ) {
    return [
      saison,
      codeCategorie,
      numeroInscription,
    ].join("|");
  }

  return [
    saison,
    codeCategorie,
    joueuse.nomComplet ?? joueuse.nom ?? "",
  ].join("|");
}

export function ajouterJoueuses(
  joueuses,
  lignesAAjouter
) {
  const joueusesParCle = new Map();

  /*
   * Normalise les joueuses déjà présentes :
   * - ajoute un id lorsqu'il manque;
   * - fusionne les anciens doublons.
   */
  for (const joueuse of joueuses) {
    const cle = obtenirCleJoueuse(joueuse);
    const joueuseExistante =
      joueusesParCle.get(cle);

    if (joueuseExistante) {
      joueusesParCle.set(cle, {
        ...joueuseExistante,
        ...joueuse,

        id:
          joueuseExistante.id ||
          joueuse.id ||
          crypto.randomUUID(),
      });

      continue;
    }

    joueusesParCle.set(cle, {
      ...joueuse,

      id:
        joueuse.id ||
        crypto.randomUUID(),
    });
  }

  /*
   * Ajoute les nouvelles participantes.
   * Une participante déjà présente est fusionnée
   * au lieu d'être ajoutée une deuxième fois.
   */
  for (const ligne of lignesAAjouter) {
    const participante =
      ligne.participante;

    const cle =
      obtenirCleJoueuse(participante);

    const joueuseExistante =
      joueusesParCle.get(cle);

    joueusesParCle.set(cle, {
      ...joueuseExistante,
      ...participante,

      id:
        joueuseExistante?.id ||
        participante.id ||
        crypto.randomUUID(),
    });
  }

  return Array.from(
    joueusesParCle.values()
  );
}