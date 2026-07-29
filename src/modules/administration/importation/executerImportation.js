export default function executerImportation({
  participantesSelectionnees,
  joueuses,
}) {
  const operations = participantesSelectionnees.map((ligne) => ({
    action: ligne.joueuse ? "mettreAJour" : "ajouter",
    participante: ligne.participante,
    joueuse: ligne.joueuse ?? null,
    differences: ligne.differences ?? [],
  }));

  return {
    operations,
    resume: {
      ajoutees: operations.filter(
        (operation) => operation.action === "ajouter"
      ).length,

      misesAJour: operations.filter(
        (operation) => operation.action === "mettreAJour"
      ).length,

      ignorees: 0,
    },

    joueuses,
  };
}