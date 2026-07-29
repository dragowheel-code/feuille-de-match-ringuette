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

import {
  creerOfficiel,
  modifierOfficiel as mettreAJourOfficiel,
  supprimerOfficiel as retirerOfficiel,
  retirerOfficielDesRoles,
  remplacerNomOfficielDansRoles,
} from "../domain/officiels";
export function useGestionEffectifs({
  setMatchInfo,
  setEquipes,

  joueuses,
  setJoueuses,

  officiels,
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

  const numeroDisponible = numeroEstDisponible(
    joueuses,
    remplacante.equipeRemplacante,
    numero,
    remplacante.joueuseSelectionnee
  );

  if (!numeroDisponible) {
    alert("Ce numéro existe déjà dans cette équipe.");
    return;
  }

  const numeroDejaAttribueAUneRemplacante =
    numeroUtiliseParRemplacante(
      joueuses,
      remplacante.equipeRemplacante,
      numero
    );

  if (numeroDejaAttribueAUneRemplacante) {
    alert(
      "Ce chandail est déjà attribué à une autre remplaçante."
    );
    return;
  }

  let nouvelleJoueuse;

  if (remplacante.modeRemplacante === "existante") {
    const joueuseOriginale = joueuses.find(
      (joueuse) =>
        String(joueuse.id) ===
        String(remplacante.joueuseSelectionnee)
    );

    if (!joueuseOriginale) {
      alert("Sélectionne une joueuse existante.");
      return;
    }

    nouvelleJoueuse = {
      ...joueuseOriginale,
      id: creerId(),
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

  numeroInscription: "",
  dateNaissance: "",
  adresse: "",
  ville: "",
  codePostal: "",
  telephone: "",
  sexe: "",
  categorie: "",
  codeCategorie: "",
  saison: "",

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

  function ajouterOfficiel(nouvelOfficiel) {
  const nom = nouvelOfficiel.nom.trim();

  if (!nom) {
    alert("Entre le nom de l’officiel.");
    return;
  }

  const nomExisteDeja = officiels.some(
    (officiel) =>
      officiel.nom.toLowerCase() === nom.toLowerCase()
  );

  if (nomExisteDeja) {
    alert("Cet officiel existe déjà.");
    return;
  }
  const auMoinsUnRole =
  nouvelOfficiel.arbitre ||
  nouvelOfficiel.chronometreur ||
  nouvelOfficiel.marqueur ||
  nouvelOfficiel.operateur30s;

if (!auMoinsUnRole) {
  alert("Choisis au moins un rôle pour cet officiel.");
  return;
}

  setOfficiels((anciensOfficiels) => [
    ...anciensOfficiels,
    creerOfficiel({
      ...nouvelOfficiel,
      id: creerId(),
      nom,
    }),
  ]);
}

function modifierOfficiel(idOfficiel, modifications) {
  console.log("modifierOfficiel");
console.log(officiels, Array.isArray(officiels));
  const officielActuel = officiels.find(
    (officiel) =>
      String(officiel.id) === String(idOfficiel)
  );

  if (!officielActuel) {
    alert("Officiel introuvable.");
    return;
  }

  const nouveauNom = modifications.nom.trim();

  if (!nouveauNom) {
    alert("Entre le nom de l’officiel.");
    return;
  }

  const nomExisteDeja = officiels.some(
    (officiel) =>
      String(officiel.id) !== String(idOfficiel) &&
      officiel.nom.toLowerCase() ===
        nouveauNom.toLowerCase()
  );

  if (nomExisteDeja) {
    alert("Un autre officiel porte déjà ce nom.");
    return;
  }

  const auMoinsUnRole =
    modifications.arbitre ||
    modifications.chronometreur ||
    modifications.marqueur ||
    modifications.operateur30s;

  if (!auMoinsUnRole) {
    alert("Choisis au moins un rôle pour cet officiel.");
    return;
  }

  setOfficiels((anciensOfficiels) =>
    mettreAJourOfficiel(
      anciensOfficiels,
      idOfficiel,
      {
        ...modifications,
        nom: nouveauNom,
      }
    )
  );

  if (officielActuel.nom !== nouveauNom) {
    setMatchInfo((anciennesInformations) =>
      remplacerNomOfficielDansRoles(
        anciennesInformations,
        officielActuel.nom,
        nouveauNom
      )
    );
  }
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
  retirerOfficiel(
    anciensOfficiels,
    nomOfficiel
  )
);

    setMatchInfo((anciennesInformations) =>
  retirerOfficielDesRoles(
    anciennesInformations,
    nomOfficiel
  )
);

    suppressionOfficiel.reinitialiser();
    modales.fermerSuppressionOfficiel();
  }

  function changerPresence(id) {
  setJoueuses((anciennesJoueuses) =>
    anciennesJoueuses.map((joueuse) =>
      joueuse.id === id
        ? basculerPresence(joueuse)
        : joueuse
    )
  );
}

  function changerSuspension(id) {
  setJoueuses((anciennesJoueuses) =>
    anciennesJoueuses.map((joueuse) =>
      joueuse.id === id
        ? basculerSuspension(joueuse)
        : joueuse
    )
  );
}

  function changerRoleJoueuse(id, role) {
  setJoueuses((anciennesJoueuses) => {
    const resultat = appliquerChangementRole(
      anciennesJoueuses,
      id,
      role
    );

    if (!resultat.succes) {
      switch (resultat.raison) {
        case "MAX_GARDIENNES":
          alert("Maximum 2 gardiennes par équipe.");
          break;

        case "MAX_LETTRES":
          alert("Maximum de 3 lettres (C et A) par équipe.");
          break;

        default:
          break;
      }
    }

    return Array.isArray(resultat.joueuses)
  ? resultat.joueuses
  : anciennesJoueuses;
  });
}

 return {
  ouvrirFenetreRemplacante,
  confirmerRemplacante,
  supprimerEquipe,
  supprimerJoueuse,
  ajouterOfficiel,
  modifierOfficiel,
  supprimerOfficiel,
  changerPresence,
  changerSuspension,
  changerRoleJoueuse,
};
}