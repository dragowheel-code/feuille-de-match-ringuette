export function validerAttributionChandail(
  attribution,
  attributionsExistantes = []
) {
  const erreurs = [];

  if (!attribution.ensembleId?.trim()) {
    erreurs.push(
      "L'ensemble de chandails est obligatoire."
    );
  }

  if (!attribution.joueuseId?.trim()) {
    erreurs.push(
      "La joueuse est obligatoire."
    );
  }

  if (!attribution.saisonId?.trim()) {
    erreurs.push(
      "La saison est obligatoire."
    );
  }

  if (
    attribution.active === true &&
    attribution.dateRetour
  ) {
    erreurs.push(
      "Une attribution active ne peut pas avoir de date de retour."
    );
  }

  if (
    attribution.active === false &&
    !attribution.dateRetour
  ) {
    erreurs.push(
      "Une attribution terminée doit avoir une date de retour."
    );
  }

  const ensembleDejaAttribue =
    attributionsExistantes.some(
      (existante) =>
        String(existante.id) !==
          String(attribution.id) &&
        String(existante.ensembleId) ===
          String(attribution.ensembleId) &&
        existante.active === true
    );

  if (ensembleDejaAttribue) {
    erreurs.push(
      "Cet ensemble est déjà attribué."
    );
  }

  const joueuseDejaAttribuee =
    attributionsExistantes.some(
      (existante) =>
        String(existante.id) !==
          String(attribution.id) &&
        String(existante.joueuseId) ===
          String(attribution.joueuseId) &&
        String(existante.saisonId) ===
          String(attribution.saisonId) &&
        existante.active === true
    );

  if (joueuseDejaAttribuee) {
    erreurs.push(
      "Cette joueuse possède déjà un ensemble actif pour cette saison."
    );
  }

  return {
    valide: erreurs.length === 0,
    erreurs,
  };
}