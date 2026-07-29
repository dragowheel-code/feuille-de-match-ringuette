import { STATUTS_COMPARAISON } from "./statuts";
import { comparerInformationsJoueuse } from "./comparerInformationsJoueuse";

export function determinerStatut({
  participante,
  correspondance,
}) {
  if (!correspondance.trouvee) {
    return {
      statut: STATUTS_COMPARAISON.NOUVELLE,
      raison: correspondance.raison,
    };
  }

    const joueuse = correspondance.joueuse;
    
    if (correspondance.confiance < 100) {
  return {
    statut: STATUTS_COMPARAISON.CORRESPONDANCE_PROBABLE,
    raison: correspondance.raison,
    confiance: correspondance.confiance,
    joueuse,
  };
}

  const differences = comparerInformationsJoueuse(
    participante,
    joueuse
  );

  if (differences.length > 0) {
    return {
      statut: STATUTS_COMPARAISON.MISE_A_JOUR,
      raison: "Des informations de la joueuse ont changé.",
      differences,
    };
  }

  return {
    statut: STATUTS_COMPARAISON.IDENTIQUE,
    raison: correspondance.raison,
  };
}