import { comparerNoms } from "./comparerNoms";

function convertirNomSportPlus(nomComplet) {
  const nom = String(nomComplet ?? "").trim();

  if (!nom.includes(",")) {
    return nom;
  }

  const [nomFamille, prenom] = nom.split(",");

  return `${prenom?.trim() ?? ""} ${nomFamille?.trim() ?? ""}`.trim();
}

export function trouverCorrespondanceEquipe(
  participante,
  joueuses
) {
  let meilleureCorrespondance = null;

  const nomParticipante = convertirNomSportPlus(
    participante.nomComplet
  );

  for (const joueuse of joueuses) {
    const comparaisonNom = comparerNoms(
      nomParticipante,
      joueuse.nom
    );

    if (comparaisonNom.confiance >= 70) {
      if (
        !meilleureCorrespondance ||
        comparaisonNom.confiance >
          meilleureCorrespondance.confiance
      ) {
        meilleureCorrespondance = {
          trouvee: true,
          confiance: comparaisonNom.confiance,
          raison:
            comparaisonNom.confiance === 100
              ? "Nom identique"
              : "Nom similaire",
          joueuse,
        };
      }
    }
  }

  if (meilleureCorrespondance) {
    return meilleureCorrespondance;
  }

  return {
    trouvee: false,
    confiance: 0,
    raison: "Aucune correspondance",
    joueuse: null,
  };
}