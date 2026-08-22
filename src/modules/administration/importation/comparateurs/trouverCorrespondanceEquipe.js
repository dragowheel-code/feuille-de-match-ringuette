import { comparerNoms } from "./comparerNoms";

function convertirNomSportPlus(
  nomComplet
) {
  const nom =
    String(
      nomComplet ?? ""
    ).trim();

  if (!nom.includes(",")) {
    return nom;
  }

  const [
    nomFamille,
    prenom,
  ] = nom.split(",");

  return `${prenom?.trim() ?? ""} ${
    nomFamille?.trim() ?? ""
  }`.trim();
}

export function trouverCorrespondanceEquipe(
  participante,
  joueuses
) {
  let meilleureCorrespondance =
    null;

  const nomParticipante =
    convertirNomSportPlus(
      participante.nomComplet
    );

  for (const joueuse of joueuses) {
    // Même association obligatoire
    if (
      String(
        joueuse.associationId
      ) !==
      String(
        participante.associationId
      )
    ) {
      continue;
    }

    // Même date de naissance obligatoire
    if (
      String(
        joueuse.dateNaissance ?? ""
      ) !==
      String(
        participante.dateNaissance ?? ""
      )
    ) {
      continue;
    }

    const nomJoueuse =
      convertirNomSportPlus(
        joueuse.nomComplet
      );

    const comparaisonNom =
      comparerNoms(
        nomParticipante,
        nomJoueuse
      );

    if (
      comparaisonNom.confiance >= 70
    ) {
      if (
        !meilleureCorrespondance ||
        comparaisonNom.confiance >
          meilleureCorrespondance.confiance
      ) {
        meilleureCorrespondance = {
          trouvee: true,

          confiance:
            comparaisonNom.confiance,

          raison:
            comparaisonNom.confiance ===
            100
              ? "Même nom et même date de naissance"
              : "Nom similaire et même date de naissance",

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
    raison:
      "Aucune correspondance",
    joueuse: null,
  };
}