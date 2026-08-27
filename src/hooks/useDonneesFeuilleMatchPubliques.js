import {
  useEffect,
  useState,
} from "react";

import {
  supabase,
} from "../services/supabase";

function convertirAssociation(
  association
) {
  return {
    id:
      association.id,

    nom:
      association.nom ?? "",

    abreviation:
      association.abreviation ?? "",

    nomEquipes:
      association.nom_equipes ?? "",

    logo:
      association.logo ?? null,

    couleurFonce:
      association.couleur_fonce ??
      "#000000",

    couleurClair:
      association.couleur_clair ??
      "#FFFFFF",

    courriel:
      association.courriel ?? "",
  };
}

function convertirEquipe(
  equipe
) {
  return {
    id:
      equipe.id,

    associationId:
      equipe.association_id,

    saisonId:
      equipe.saison_id,

    categorieId:
      equipe.categorie_id,

    categorie:
      equipe.categorie ?? "",

    niveau:
      equipe.niveau ?? "",

    numeroEquipe:
      equipe.numero_equipe ?? "",

    abreviation:
      equipe.abreviation ?? "",

    active:
      equipe.active !== false,
  };
}

function convertirJoueuseAlignement(
  joueuse
) {
  return {
    id:
      joueuse.joueuse_id,

    joueuseId:
      joueuse.joueuse_id,

    nom:
      joueuse.nom_complet ?? "",

    nomComplet:
      joueuse.nom_complet ?? "",

    numero:
      joueuse.numero ?? "",

    typeAffectation:
      joueuse.type_affectation ??
      "NORMALE",

    gardienne: false,
    capitaine: false,
    assistanteCapitaine: false,
    absente: false,
    suspendue: false,
    remplacante: false,
  };
}

function convertirOfficiel(
  officiel
) {
  return {
    id:
      officiel.id,

    associationId:
      officiel.association_id ??
      null,

    nom:
      officiel.nom ?? "",

    arbitre:
      officiel.arbitre === true,

    chronometreur:
      officiel.chronometreur === true,

    marqueur:
      officiel.marqueur === true,

    operateur30s:
      officiel.operateur_30s === true,

    actif:
      officiel.actif !== false,
  };
}

function convertirTournoi(
  tournoi
) {
  return {
    id:
      tournoi.id,

    associationId:
      tournoi.association_id,

    saisonId:
      tournoi.saison_id,

    nom:
      tournoi.nom ?? "",

    dateDebut:
      tournoi.date_debut ?? null,

    dateFin:
      tournoi.date_fin ?? null,

    lieu:
      tournoi.lieu ?? "",

    actif:
      tournoi.actif !== false,
  };
}

function convertirInscriptionEquipeTournoi(
  inscription
) {
  return {
    id:
      inscription.id,

    tournoiId:
      inscription.tournoi_id,

    equipeId:
      inscription.equipe_id,

    actif:
      inscription.actif !== false,
  };
}

function convertirInscriptionOfficielTournoi(
  inscription
) {
  return {
    id:
      inscription.id,

    tournoiId:
      inscription.tournoi_id,

    officielId:
      inscription.officiel_id,

    actif:
      inscription.actif !== false,
  };
}

async function chargerPersonnel(
  equipeId
) {
  if (!equipeId) {
    return {
      succes: true,
      personnel: [],
      erreur: null,
    };
  }

  const {
    data,
    error,
  } = await supabase.rpc(
    "feuille_match_personnel",
    {
      p_equipe_id:
        equipeId,
    }
  );

  if (error) {
    console.error(
      "Erreur personnel feuille de match :",
      error
    );

    return {
      succes: false,
      personnel: [],
      erreur:
        error.message,
    };
  }

  return {
    succes: true,

    personnel:
      (data ?? []).map(
        (personne) => ({
          id:
            personne.personnel_id,

          nomComplet:
            personne.nom_complet ??
            "",

          role:
            personne.role ?? "",
        })
      ),

    erreur: null,
  };
}

export function useDonneesFeuilleMatchPubliques() {
  const [
    associations,
    setAssociations,
  ] = useState([]);

  const [
    equipes,
    setEquipes,
  ] = useState([]);

  const [
  tournois,
  setTournois,
] = useState([]);

const [
  inscriptionsEquipesTournoi,
  setInscriptionsEquipesTournoi,
] = useState([]);

const [
  inscriptionsOfficielsTournoi,
  setInscriptionsOfficielsTournoi,
] = useState([]);

  const [
    chargement,
    setChargement,
  ] = useState(true);

  const [
    erreur,
    setErreur,
  ] = useState(null);

  const [
  officiels,
  setOfficiels,
] = useState([]);

  useEffect(() => {
    let actif = true;

    async function charger() {
      setChargement(true);
      setErreur(null);

      const [
  resultatAssociations,
  resultatEquipes,
  resultatOfficiels,
  resultatTournois,
  resultatInscriptionsEquipes,
  resultatInscriptionsOfficiels,
] = await Promise.all([
  supabase.rpc(
    "feuille_match_associations"
  ),

  supabase.rpc(
    "feuille_match_equipes"
  ),

  supabase.rpc(
    "feuille_match_officiels"
  ),

  supabase.rpc(
    "feuille_match_tournois"
  ),

  supabase.rpc(
    "feuille_match_inscriptions_equipes_tournoi"
  ),

  supabase.rpc(
    "feuille_match_inscriptions_officiels_tournoi"
  ),
]);

      if (!actif) {
        return;
      }

      if (
        resultatAssociations.error
      ) {
        console.error(
          "Erreur associations feuille de match :",
          resultatAssociations.error
        );

        setErreur(
          resultatAssociations
            .error.message
        );

        setChargement(false);

        return;
      }

      if (
        resultatEquipes.error
      ) {
        console.error(
          "Erreur équipes feuille de match :",
          resultatEquipes.error
        );

        setErreur(
          resultatEquipes
            .error.message
        );

        setChargement(false);

        return;
      }

      if (
        resultatOfficiels.error
      ) {
        console.error(
          "Erreur officiels feuille de match :",
          resultatOfficiels.error
        );

        setErreur(
          resultatOfficiels
          .error.message
        );

        setChargement(false);

        return;
      }

      if (
  resultatTournois.error
) {
  console.error(
    "Erreur tournois feuille de match :",
    resultatTournois.error
  );

  setErreur(
    resultatTournois
      .error.message
  );

  setChargement(false);

  return;
}

if (
  resultatInscriptionsEquipes.error
) {
  console.error(
    "Erreur inscriptions équipes tournoi :",
    resultatInscriptionsEquipes.error
  );

  setErreur(
    resultatInscriptionsEquipes
      .error.message
  );

  setChargement(false);

  return;
}

if (
  resultatInscriptionsOfficiels.error
) {
  console.error(
    "Erreur inscriptions officiels tournoi :",
    resultatInscriptionsOfficiels.error
  );

  setErreur(
    resultatInscriptionsOfficiels
      .error.message
  );

  setChargement(false);

  return;
}

      setAssociations(
        (
          resultatAssociations.data ??
          []
        ).map(
          convertirAssociation
        )
      );

      setEquipes(
        (
          resultatEquipes.data ??
          []
        ).map(
          convertirEquipe
        )
      );

      setOfficiels(
        (
          resultatOfficiels.data ??
          []
        ).map(
          convertirOfficiel
        )
      );

      setTournois(
  (
    resultatTournois.data ??
    []
  ).map(
    convertirTournoi
  )
);

setInscriptionsEquipesTournoi(
  (
    resultatInscriptionsEquipes.data ??
    []
  ).map(
    convertirInscriptionEquipeTournoi
  )
);

setInscriptionsOfficielsTournoi(
  (
    resultatInscriptionsOfficiels.data ??
    []
  ).map(
    convertirInscriptionOfficielTournoi
  )
);

      setChargement(false);
    }

    charger();

    return () => {
      actif = false;
    };
  }, []);

  async function chargerAlignement(
    equipeId
  ) {
    if (!equipeId) {
      return {
        succes: true,
        joueuses: [],
        erreur: null,
      };
    }

    const {
      data,
      error,
    } = await supabase.rpc(
      "feuille_match_alignement",
      {
        p_equipe_id:
          equipeId,
      }
    );

    if (error) {
      console.error(
        "Erreur alignement feuille de match :",
        error
      );

      return {
        succes: false,
        joueuses: [],
        erreur:
          error.message,
      };
    }

    return {
      succes: true,

      joueuses:
        (data ?? []).map(
          convertirJoueuseAlignement
        ),

      erreur: null,
    };
  }

  return {
  associations,
  equipes,
  officiels,
  tournois,

  inscriptionsEquipesTournoi,
  inscriptionsOfficielsTournoi,

  chargement,
  erreur,

  chargerAlignement,
  chargerPersonnel,
};
}