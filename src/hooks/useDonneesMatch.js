import {
  useEffect,
  useState,
} from "react";

import {
  TYPES_EVENEMENT,
} from "../domain/evenements";

export function useDonneesMatch({
  associations,
  equipesAdministration,
  joueuses,
  joueusesAdministration,
  affectationsAdministration,
  ensemblesChandailsAdministration,
  attributionsChandailsAdministration,
  personnelEquipeAdministration,
  affectationsPersonnelAdministration,
  chargerPersonnelPublic,
  evenements,
  matchInfo,
  buts,
  gestionPunitions,
  gestionTirBarrage,
}) {

  const [
  personnelPublicLocal,
  setPersonnelPublicLocal,
] = useState([]);

const [
  personnelPublicVisiteur,
  setPersonnelPublicVisiteur,
] = useState([]);

useEffect(() => {
  let actif = true;

  async function charger() {
    if (!chargerPersonnelPublic) {
      return;
    }

    if (matchInfo.equipeLocaleId) {
      const resultatLocal =
        await chargerPersonnelPublic(
          matchInfo.equipeLocaleId
        );

      if (
        actif &&
        resultatLocal.succes
      ) {
        setPersonnelPublicLocal(
          resultatLocal.personnel
        );
      }
    } else {
      setPersonnelPublicLocal([]);
    }

    if (
      matchInfo.equipeVisiteuseId
    ) {
      const resultatVisiteur =
        await chargerPersonnelPublic(
          matchInfo.equipeVisiteuseId
        );

      if (
        actif &&
        resultatVisiteur.succes
      ) {
        setPersonnelPublicVisiteur(
          resultatVisiteur.personnel
        );
      }
    } else {
      setPersonnelPublicVisiteur([]);
    }
  }

  charger();

  return () => {
    actif = false;
  };
}, [
  chargerPersonnelPublic,
  matchInfo.equipeLocaleId,
  matchInfo.equipeVisiteuseId,
]);

  const equipeLocale =
    equipesAdministration.find(
      (equipe) =>
        String(equipe.id) ===
        String(
          matchInfo.equipeLocaleId
        )
    );

  const equipeVisiteuse =
    equipesAdministration.find(
      (equipe) =>
        String(equipe.id) ===
        String(
          matchInfo.equipeVisiteuseId
        )
    );

  const associationLocale =
    associations.find(
      (association) =>
        String(association.id) ===
        String(
          equipeLocale?.associationId
        )
    );

  const associationVisiteuse =
    associations.find(
      (association) =>
        String(association.id) ===
        String(
          equipeVisiteuse?.associationId
        )
    );

  function obtenirPersonnelEquipe(
    equipeId
  ) {
    const affectations =
      affectationsPersonnelAdministration.filter(
        (affectation) =>
          affectation.actif !== false &&
          String(
            affectation.equipeId
          ) ===
            String(equipeId)
      );

    function trouverPersonnel(
      role
    ) {
      const affectation =
        affectations.find(
          (element) =>
            element.role === role
        );

      if (!affectation) {
        return null;
      }

      return (
        personnelEquipeAdministration.find(
          (personne) =>
            String(
              personne.id
            ) ===
            String(
              affectation.personnelId
            )
        ) ?? null
      );
    }

    const entraineurChef =
      trouverPersonnel(
        "Entraîneur-chef"
      );

    const entraineursAdjoints =
      affectations
        .filter(
          (affectation) =>
            affectation.role ===
            "Entraîneur adjoint"
        )
        .map(
          (affectation) =>
            personnelEquipeAdministration.find(
              (personne) =>
                String(
                  personne.id
                ) ===
                String(
                  affectation.personnelId
                )
            )
        )
        .filter(Boolean);

    const gerante =
      trouverPersonnel(
        "Gérante"
      );

    return {
      entraineurChef:
        entraineurChef?.nomComplet ??
        "",

      assistant1:
        entraineursAdjoints[0]
          ?.nomComplet ??
        "",

      assistant2:
        entraineursAdjoints[1]
          ?.nomComplet ??
        "",

      gerante:
        gerante?.nomComplet ??
        "",
    };
  }

function convertirPersonnelPublic(
  personnel
) {
  const entraineurChef =
    personnel.find(
      (personne) =>
        personne.role ===
        "Entraîneur-chef"
    );

  const entraineursAdjoints =
    personnel.filter(
      (personne) =>
        personne.role ===
        "Entraîneur adjoint"
    );

  const gerante =
    personnel.find(
      (personne) =>
        personne.role ===
        "Gérante"
    );

  return {
    entraineurChef:
      entraineurChef?.nomComplet ??
      "",

    assistant1:
      entraineursAdjoints[0]
        ?.nomComplet ??
      "",

    assistant2:
      entraineursAdjoints[1]
        ?.nomComplet ??
      "",

    gerante:
      gerante?.nomComplet ??
      "",
  };
}

  const personnelLocale =
  personnelPublicLocal.length > 0
    ? convertirPersonnelPublic(
        personnelPublicLocal
      )
    : obtenirPersonnelEquipe(
        matchInfo.equipeLocaleId
      );

const personnelVisiteur =
  personnelPublicVisiteur.length > 0
    ? convertirPersonnelPublic(
        personnelPublicVisiteur
      )
    : obtenirPersonnelEquipe(
        matchInfo.equipeVisiteuseId
      );

  const equipeLocaleData =
    equipeLocale
      ? {
          ...equipeLocale,
          ...personnelLocale,

          courriel:
            associationLocale?.courriel ??
            equipeLocale?.courriel ??
            "",

          nomCouleurPrimaire:
            "Foncé",

          couleurPrimaire:
            associationLocale
              ?.couleurFonce ||
            "#000000",

          nomCouleurSecondaire:
            "Clair",

          couleurSecondaire:
            associationLocale
              ?.couleurClair ||
            "#FFFFFF",
        }
      : null;

  const equipeVisiteuseData =
    equipeVisiteuse
      ? {
          ...equipeVisiteuse,
          ...personnelVisiteur,

          courriel:
            associationVisiteuse
              ?.courriel ??
            equipeVisiteuse?.courriel ??
            "",

          nomCouleurPrimaire:
            "Foncé",

          couleurPrimaire:
            associationVisiteuse
              ?.couleurFonce ||
            "#000000",

          nomCouleurSecondaire:
            "Clair",

          couleurSecondaire:
            associationVisiteuse
              ?.couleurClair ||
            "#FFFFFF",
        }
      : null;

  function obtenirNumeroChandailPourAffectation(
    affectation
  ) {
    const attribution =
      attributionsChandailsAdministration.find(
        (element) =>
          element.active === true &&
          String(
            element.affectationId
          ) ===
            String(
              affectation.id
            )
      );

    if (!attribution) {
      return (
        affectation.numero ?? ""
      );
    }

    const ensemble =
      ensemblesChandailsAdministration.find(
        (element) =>
          String(
            element.id
          ) ===
          String(
            attribution.ensembleId
          )
      );

    return (
      ensemble?.numero ??
      affectation.numero ??
      ""
    );
  }

  function construireJoueusesEquipe(
    equipeId
  ) {
    return affectationsAdministration
      .filter(
        (affectation) =>
          affectation.active !== false &&
          String(
            affectation.equipeId
          ) ===
            String(equipeId)
      )
      .map(
        (affectation) => {
          const joueuse =
            joueusesAdministration.find(
              (element) =>
                String(
                  element.id
                ) ===
                String(
                  affectation.joueuseId
                )
            );

          if (!joueuse) {
            return null;
          }

          return {
            ...joueuse,

            affectationId:
              affectation.id,

            numero:
              obtenirNumeroChandailPourAffectation(
                affectation
              ),

            gardienne: false,
            capitaine: false,
            assistanteCapitaine:
              false,
          };
        }
      )
      .filter(Boolean);
  }

  const joueusesEquipeLocaleAdministration =
    construireJoueusesEquipe(
      matchInfo.equipeLocaleId
    );

  const joueusesEquipeVisiteuseAdministration =
    construireJoueusesEquipe(
      matchInfo.equipeVisiteuseId
    );

  function construireJoueusesMatch(
    joueusesAdministrationEquipe,
    equipeNom
  ) {
    const idsJoueusesAdministration =
      new Set(
        joueusesAdministrationEquipe.map(
          (joueuse) =>
            String(
              joueuse.id
            )
        )
      );

    const joueusesRegulieres =
      joueusesAdministrationEquipe.map(
        (
          joueuseAdministration
        ) => {
          const joueuseMatch =
            joueuses.find(
              (joueuse) =>
                String(
                  joueuse.id
                ) ===
                String(
                  joueuseAdministration.id
                )
            );

          return {
            ...joueuseAdministration,
            ...joueuseMatch,

            numero:
              joueuseAdministration
                .numero ??
              joueuseMatch?.numero ??
              "",

            nom:
              joueuseMatch?.nom ??
              joueuseAdministration
                .nom ??
              joueuseAdministration
                .nomComplet ??
              "",

            equipe:
              equipeNom,

            absente:
              joueuseMatch
                ?.absente === true,

            suspendue:
              joueuseMatch
                ?.suspendue === true,

            remplacante:
              joueuseMatch
                ?.remplacante ===
              true,
          };
        }
      );

    const remplacantes =
      joueuses.filter(
        (joueuse) =>
          joueuse.remplacante ===
            true &&
          joueuse.equipe ===
            equipeNom &&
          !idsJoueusesAdministration.has(
            String(
              joueuse.id
            )
          )
      );

    return [
      ...joueusesRegulieres,
      ...remplacantes,
    ];
  }

  const joueusesMatchLocale =
    construireJoueusesMatch(
      joueusesEquipeLocaleAdministration,
      matchInfo.equipeLocale
    );

  const joueusesMatchVisiteuse =
    construireJoueusesMatch(
      joueusesEquipeVisiteuseAdministration,
      matchInfo.equipeVisiteuse
    );

  const equipeNomPourBut =
    buts.equipeBut === "Local"
      ? matchInfo.equipeLocale
      : matchInfo.equipeVisiteuse;

  const joueusesDisponibles =
    (
      buts.equipeBut === "Local"
        ? joueusesMatchLocale
        : joueusesMatchVisiteuse
    ).filter(
      (joueuse) =>
        !joueuse.absente &&
        !joueuse.suspendue
    );

  const joueusesPunitionDisponibles =
    (
      gestionPunitions
        .equipeNomPourPunition ===
      matchInfo.equipeLocale
        ? joueusesMatchLocale
        : joueusesMatchVisiteuse
    ).filter(
      (joueuse) =>
        !joueuse.absente &&
        !joueuse.suspendue
    );

  const joueusesTirBarrageDisponibles =
    (
      gestionTirBarrage
        .equipeNomPourTirBarrage ===
      matchInfo.equipeLocale
        ? joueusesMatchLocale
        : joueusesMatchVisiteuse
    ).filter(
      (joueuse) =>
        !joueuse.absente &&
        !joueuse.suspendue
    );

  const scoreLocal =
    evenements.filter(
      (event) =>
        event.type ===
          TYPES_EVENEMENT.BUT &&
        event.equipe ===
          "Local"
    ).length;

  const scoreVisiteur =
    evenements.filter(
      (event) =>
        event.type ===
          TYPES_EVENEMENT.BUT &&
        event.equipe ===
          "Visiteur"
    ).length;

  const destinataires = [
    matchInfo.envoyerCourrielLocal
      ? equipeLocaleData?.courriel
      : null,

    matchInfo
      .envoyerCourrielVisiteur
      ? equipeVisiteuseData
          ?.courriel
      : null,

    ...String(
      matchInfo
        .courrielPersonnalise ||
        ""
    )
      .split(",")
      .map(
        (courriel) =>
          courriel.trim()
      )
      .filter(Boolean),
  ].filter(Boolean);

 return {
    equipeLocaleData,
    equipeVisiteuseData,

    joueusesEquipeLocaleAdministration,
    joueusesEquipeVisiteuseAdministration,

    joueusesMatchLocale,
    joueusesMatchVisiteuse,

    equipeNomPourBut,

    joueusesDisponibles,
    joueusesPunitionDisponibles,
    joueusesTirBarrageDisponibles,

    scoreLocal,
    scoreVisiteur,

    destinataires,
  };
}