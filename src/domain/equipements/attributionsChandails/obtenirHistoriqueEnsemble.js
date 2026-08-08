export function obtenirHistoriqueEnsemble(
  ensembleId,
  attributions = [],
  limiteSaisons = 3
) {
  const historique = attributions
    .filter(
      (attribution) =>
        String(
          attribution.ensembleId
        ) ===
        String(ensembleId)
    )
    .sort((a, b) =>
      String(
        b.dateAttribution
      ).localeCompare(
        String(
          a.dateAttribution
        )
      )
    );

  const saisons = [];

  return historique.filter(
    (attribution) => {
      if (
        !saisons.includes(
          attribution.saisonId
        )
      ) {
        saisons.push(
          attribution.saisonId
        );
      }

      return (
        saisons.indexOf(
          attribution.saisonId
        ) < limiteSaisons
      );
    }
  );
}