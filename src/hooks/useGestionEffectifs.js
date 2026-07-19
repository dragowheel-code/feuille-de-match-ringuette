import { creerId } from "../utils/ids";

export function useGestionEffectifs({
  setMatchInfo,

  setEquipes,

  joueuses,
  setJoueuses,

  setOfficiels,

  modales,
  remplacante,
  suppressionEquipe,
  suppressionJoueuse,
  suppressionOfficiel,
}) {
  function ouvrirFenetreRemplacante(equipeNom) {
    remplacante.ouvrir(equipeNom);
    modales.ouvrirRemplacante();
  }

  function confirmerRemplacante() {
    if (!remplacante.equipeRemplacante) {
      return;
    }

    const numero = remplacante.numeroRemplacante.trim();
    const nom = remplacante.nomRemplacante.trim();

    if (!numero || !nom) {
      alert("Entre le numéro et le nom de la remplaçante.");
      return;
    }

    const numeroExiste = joueuses.some(
      (joueuse) =>
        joueuse.equipe === remplacante.equipeRemplacante &&
        joueuse.numero === numero
    );

    if (numeroExiste) {
      alert("Ce numéro existe déjà dans cette équipe.");
      return;
    }

    let nouvelleJoueuse;

if (remplacante.modeRemplacante === "existante") {
  const joueuseOriginale = joueuses.find(
    (j) => String(j.id) === remplacante.joueuseSelectionnee
  );

  nouvelleJoueuse = {
    ...joueuseOriginale,
    equipe: remplacante.equipeRemplacante,
    numero,
    nom,
    remplacante: true,
    equipeProvenance: remplacante.equipeProvenance,
  };
} else {
  nouvelleJoueuse = {
    id: creerId(),
    equipe: remplacante.equipeRemplacante,
    numero,
    nom,
    gardienne: false,
    capitaine: false,
    assistanteCapitaine: false,
    absente: false,
    suspendue: false,
    remplacante: true,
    equipeProvenance: remplacante.equipeProvenance,
  };
}

    setJoueuses((anciennesJoueuses) => [
      ...anciennesJoueuses,
      nouvelleJoueuse,
    ]);

    modales.fermerRemplacante();
    remplacante.reinitialiser();
  }

  function supprimerEquipe() {
    if (!suppressionEquipe.equipeASupprimer) {
      alert("Choisis une équipe à supprimer.");
      return;
    }

    const equipeNom = suppressionEquipe.equipeASupprimer;

    if (
      !confirm(
        `Supprimer ${equipeNom} et toutes ses joueuses ?`
      )
    ) {
      return;
    }

    setEquipes((anciennesEquipes) =>
      anciennesEquipes.filter(
        (equipe) => equipe.nom !== equipeNom
      )
    );

    setJoueuses((anciennesJoueuses) =>
      anciennesJoueuses.filter(
        (joueuse) => joueuse.equipe !== equipeNom
      )
    );

    setMatchInfo((anciennesInformations) => ({
      ...anciennesInformations,

      equipeLocale:
        anciennesInformations.equipeLocale === equipeNom
          ? ""
          : anciennesInformations.equipeLocale,

      equipeVisiteuse:
        anciennesInformations.equipeVisiteuse === equipeNom
          ? ""
          : anciennesInformations.equipeVisiteuse,
    }));

    suppressionEquipe.reinitialiser();
    modales.fermerSuppressionEquipe();
  }

  function supprimerJoueuse() {
    if (!suppressionJoueuse.joueuseASupprimer) {
      alert("Choisis une joueuse.");
      return;
    }

    if (!confirm("Supprimer cette joueuse ?")) {
      return;
    }

    setJoueuses((anciennesJoueuses) =>
      anciennesJoueuses.filter(
        (joueuse) =>
          String(joueuse.id) !==
          String(suppressionJoueuse.joueuseASupprimer)
      )
    );

    suppressionJoueuse.reinitialiser();
    modales.fermerSuppressionJoueuse();
  }

  function supprimerOfficiel() {
    if (!suppressionOfficiel.officielASupprimer) {
      alert("Choisis un officiel à supprimer.");
      return;
    }

    const nomOfficiel =
      suppressionOfficiel.officielASupprimer;

    if (!confirm(`Supprimer ${nomOfficiel} ?`)) {
      return;
    }

    setOfficiels((anciensOfficiels) =>
      anciensOfficiels.filter(
        (officiel) => officiel.nom !== nomOfficiel
      )
    );

    setMatchInfo((anciennesInformations) => ({
      ...anciennesInformations,

      arbitrePrincipal:
        anciennesInformations.arbitrePrincipal === nomOfficiel
          ? ""
          : anciennesInformations.arbitrePrincipal,

      arbitreSecondaire:
        anciennesInformations.arbitreSecondaire === nomOfficiel
          ? ""
          : anciennesInformations.arbitreSecondaire,

      chronometreur:
        anciennesInformations.chronometreur === nomOfficiel
          ? ""
          : anciennesInformations.chronometreur,

      marqueur:
        anciennesInformations.marqueur === nomOfficiel
          ? ""
          : anciennesInformations.marqueur,

      operateur30s:
        anciennesInformations.operateur30s === nomOfficiel
          ? ""
          : anciennesInformations.operateur30s,
    }));

    suppressionOfficiel.reinitialiser();
    modales.fermerSuppressionOfficiel();
  }

  function changerPresence(id) {
    setJoueuses((anciennesJoueuses) =>
      anciennesJoueuses.map((joueuse) =>
        joueuse.id === id
          ? {
              ...joueuse,
              absente: !joueuse.absente,
            }
          : joueuse
      )
    );
  }

  function changerSuspension(id) {
    setJoueuses((anciennesJoueuses) =>
      anciennesJoueuses.map((joueuse) =>
        joueuse.id === id
          ? {
              ...joueuse,
              suspendue: !joueuse.suspendue,
            }
          : joueuse
      )
    );
  }

  function changerRoleJoueuse(id, role) {
    setJoueuses((anciennesJoueuses) => {
      const joueuseCible = anciennesJoueuses.find(
        (joueuse) => joueuse.id === id
      );

      if (!joueuseCible) {
        return anciennesJoueuses;
      }

      const equipe = joueuseCible.equipe;
      const valeurActuelle = joueuseCible[role] || false;

      if (role === "gardienne" && !valeurActuelle) {
        const nombreGardiennes = anciennesJoueuses.filter(
          (joueuse) =>
            joueuse.equipe === equipe &&
            joueuse.gardienne
        ).length;

        if (nombreGardiennes >= 2) {
          alert("Maximum 2 gardiennes par équipe.");
          return anciennesJoueuses;
        }
      }

      if (role === "capitaine" && !valeurActuelle) {
        return anciennesJoueuses.map((joueuse) =>
          joueuse.equipe === equipe
            ? {
                ...joueuse,
                capitaine: joueuse.id === id,
              }
            : joueuse
        );
      }

      if (
        role === "assistanteCapitaine" &&
        !valeurActuelle
      ) {
        const nombreAssistantes =
          anciennesJoueuses.filter(
            (joueuse) =>
              joueuse.equipe === equipe &&
              joueuse.assistanteCapitaine
          ).length;

        if (nombreAssistantes >= 2) {
          alert("Maximum 2 assistantes par équipe.");
          return anciennesJoueuses;
        }
      }

      return anciennesJoueuses.map((joueuse) =>
        joueuse.id === id
          ? {
              ...joueuse,
              [role]: !valeurActuelle,
            }
          : joueuse
      );
    });
  }

  return {
    ouvrirFenetreRemplacante,
    confirmerRemplacante,
    supprimerEquipe,
    supprimerJoueuse,
    supprimerOfficiel,
    changerPresence,
    changerSuspension,
    changerRoleJoueuse,
  };
}