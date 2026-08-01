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

  let nouvellesJoueuses = [...joueuses];

  for (const operation of operations) {
    if (operation.action === "ajouter") {
      nouvellesJoueuses.push(operation.participante);
      continue;
    }

    nouvellesJoueuses = nouvellesJoueuses.map((joueuse) => {
      if (joueuse.id !== operation.joueuse?.id) {
        return joueuse;
      }

      return {
        ...joueuse,
        ...operation.participante,
        id: joueuse.id,
      };
    });
  }

  return {
    operations,

    resume: {
      ajoutees: operations.filter(
        (operation) => operation.action === "ajouter"
      ).length,

      misesAJour: operations.filter(
        (operation) =>
          operation.action === "mettreAJour"
      ).length,

      ignorees: 0,
    },

    joueuses: nouvellesJoueuses,
  };
}