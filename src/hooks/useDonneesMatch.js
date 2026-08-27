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

      if (matchInfo.equipeVisiteuseId) {
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
    convertirPersonnelPublic(
      personnelPublicLocal
    );

  const personnelVisiteur =
    convertirPersonnelPublic(
      personnelPublicVisiteur
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

  const joueusesEquipeLocale =
    joueuses.filter(
      (joueuse) =>
        joueuse.equipe ===
          matchInfo.equipeLocale &&
        joueuse.remplacante !== true
    );

  const joueusesEquipeVisiteuse =
    joueuses.filter(
      (joueuse) =>
        joueuse.equipe ===
          matchInfo.equipeVisiteuse &&
        joueuse.remplacante !== true
    );

  function construireJoueusesMatch(
    joueusesEquipe,
    equipeNom
  ) {
    const idsJoueusesEquipe =
      new Set(
        joueusesEquipe.map(
          (joueuse) =>
            String(
              joueuse.id
            )
        )
      );

    const joueusesRegulieres =
      joueusesEquipe.map(
        (joueuseBase) => {
          const joueuseMatch =
            joueuses.find(
              (joueuse) =>
                String(
                  joueuse.id
                ) ===
                String(
                  joueuseBase.id
                )
            );

          return {
            ...joueuseBase,
            ...joueuseMatch,
            numero:
              joueuseBase.numero ??
              joueuseMatch?.numero ??
              "",
            nom:
              joueuseMatch?.nom ??
              joueuseBase.nom ??
              joueuseBase.nomComplet ??
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
          !idsJoueusesEquipe.has(
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
      joueusesEquipeLocale,
      matchInfo.equipeLocale
    );

  const joueusesMatchVisiteuse =
    construireJoueusesMatch(
      joueusesEquipeVisiteuse,
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
    joueusesEquipeLocale,
    joueusesEquipeVisiteuse,
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