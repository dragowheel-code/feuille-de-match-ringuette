import { creerId } from "../utils/ids";

import {
  numeroUtiliseParRemplacante,
  numeroEstDisponible,
} from "../utils/joueuses";

import {
  changerPresence as basculerPresence,
  changerSuspension as basculerSuspension,
  changerRoleJoueuse as appliquerChangementRole,
} from "../domain/joueuses";

export function useGestionEffectifs({
  joueuses,
  setJoueuses,
  equipesAdministration,
  modales,
  remplacante,
}) {
  function ouvrirFenetreRemplacante(
    equipeNom
  ) {
    remplacante.ouvrir(
      equipeNom
    );

    modales.ouvrirRemplacante();
  }

  function confirmerRemplacante(
    joueuseOriginale = null
  ) {
    if (
      !remplacante.equipeRemplacante
    ) {
      return;
    }

    const numero =
      remplacante.numeroRemplacante.trim();

    const nom =
      remplacante.nomRemplacante.trim();

    if (!numero || !nom) {
      alert(
        "Entre le numéro et le nom de la remplaçante."
      );

      return;
    }

    const numeroDisponible =
      numeroEstDisponible(
        joueuses,
        remplacante.equipeRemplacante,
        numero,
        remplacante.joueuseSelectionnee
      );

    if (!numeroDisponible) {
      alert(
        "Ce numéro existe déjà dans cette équipe."
      );

      return;
    }

    const numeroDejaAttribueAUneRemplacante =
      numeroUtiliseParRemplacante(
        joueuses,
        remplacante.equipeRemplacante,
        numero
      );

    if (
      numeroDejaAttribueAUneRemplacante
    ) {
      alert(
        "Ce chandail est déjà attribué à une autre remplaçante."
      );

      return;
    }

    let nouvelleJoueuse;

    if (
      remplacante.modeRemplacante ===
      "existante"
    ) {
      if (!joueuseOriginale) {
        alert(
          "Sélectionne une joueuse existante."
        );

        return;
      }

      const equipeProvenance =
        equipesAdministration.find(
          (equipe) =>
            String(equipe.id) ===
            String(
              remplacante.equipeProvenance
            )
        );

      nouvelleJoueuse = {
        id: creerId(),

        joueuseOriginaleId:
          joueuseOriginale.joueuseId ??
          joueuseOriginale.id,

        equipe:
          remplacante.equipeRemplacante,

        numero,

        nom:
          joueuseOriginale.nomComplet ??
          joueuseOriginale.nom ??
          nom,

        gardienne: false,
        capitaine: false,
        assistanteCapitaine: false,
        absente: false,
        suspendue: false,
        remplacante: true,

        equipeProvenanceId:
          equipeProvenance?.id ?? "",

        equipeProvenance:
          equipeProvenance
            ? [
                equipeProvenance.categorie,
                equipeProvenance.niveau,
                equipeProvenance.numeroEquipe,
              ]
                .filter(Boolean)
                .join(" ")
            : "",
      };
    } else {
      nouvelleJoueuse = {
        id: creerId(),

        equipe:
          remplacante.equipeRemplacante,

        numero,

        nom,

        numeroInscription: "",
        dateNaissance: "",
        adresse: "",
        ville: "",
        codePostal: "",
        telephone: "",
        sexe: "",

        gardienne: false,
        capitaine: false,
        assistanteCapitaine: false,
        absente: false,
        suspendue: false,
        remplacante: true,

        equipeProvenance:
          remplacante.equipeProvenance,
      };
    }

    setJoueuses(
      (anciennesJoueuses) => [
        ...anciennesJoueuses,
        nouvelleJoueuse,
      ]
    );

    modales.fermerRemplacante();

    remplacante.reinitialiser();
  }

  function changerPresence(
    joueuseReference
  ) {
    setJoueuses(
      (anciennesJoueuses) => {
        const index =
          anciennesJoueuses.findIndex(
            (joueuse) =>
              String(
                joueuse.id
              ) ===
              String(
                joueuseReference.id
              )
          );

        if (index === -1) {
          return [
            ...anciennesJoueuses,
            basculerPresence({
              ...joueuseReference,
            }),
          ];
        }

        return anciennesJoueuses.map(
          (joueuse) =>
            String(
              joueuse.id
            ) ===
            String(
              joueuseReference.id
            )
              ? basculerPresence(
                  joueuse
                )
              : joueuse
        );
      }
    );
  }

  function changerSuspension(
    joueuseReference
  ) {
    setJoueuses(
      (anciennesJoueuses) => {
        const index =
          anciennesJoueuses.findIndex(
            (joueuse) =>
              String(
                joueuse.id
              ) ===
              String(
                joueuseReference.id
              )
          );

        if (index === -1) {
          return [
            ...anciennesJoueuses,
            basculerSuspension({
              ...joueuseReference,
            }),
          ];
        }

        return anciennesJoueuses.map(
          (joueuse) =>
            String(
              joueuse.id
            ) ===
            String(
              joueuseReference.id
            )
              ? basculerSuspension(
                  joueuse
                )
              : joueuse
        );
      }
    );
  }

  function changerRoleJoueuse(
    joueuseReference,
    role
  ) {
    setJoueuses(
      (anciennesJoueuses) => {
        const existeDeja =
          anciennesJoueuses.some(
            (joueuse) =>
              String(
                joueuse.id
              ) ===
              String(
                joueuseReference.id
              )
          );

        const joueusesPourModification =
          existeDeja
            ? anciennesJoueuses
            : [
                ...anciennesJoueuses,
                {
                  ...joueuseReference,
                },
              ];

        const resultat =
          appliquerChangementRole(
            joueusesPourModification,
            joueuseReference.id,
            role
          );

        if (!resultat.succes) {
          switch (
            resultat.raison
          ) {
            case "MAX_GARDIENNES":
              alert(
                "Maximum 2 gardiennes par équipe."
              );
              break;

            case "MAX_LETTRES":
              alert(
                "Maximum de 3 lettres (C et A) par équipe."
              );
              break;

            default:
              break;
          }

          return anciennesJoueuses;
        }

        return Array.isArray(
          resultat.joueuses
        )
          ? resultat.joueuses
          : anciennesJoueuses;
      }
    );
  }

  return {
    ouvrirFenetreRemplacante,
    confirmerRemplacante,
    changerPresence,
    changerSuspension,
    changerRoleJoueuse,
  };
}