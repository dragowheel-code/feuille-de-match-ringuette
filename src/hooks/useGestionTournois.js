import {
  useEffect,
  useState,
} from "react";

import { supabase } from "../services/supabase";

import {
  creerTournoi,
  modifierTournoi,
  supprimerTournoi,
  validerTournoi,
} from "../domain/tournois";

function convertirTournoiDepuisSupabase(
  tournoi
) {
  return {
    id:
      tournoi.id,

    saisonId:
      tournoi.saison_id,

    associationOrganisatriceId:
      tournoi.association_id,

    nom:
      tournoi.nom ?? "",

    dateDebut:
      tournoi.date_debut ?? "",

    dateFin:
      tournoi.date_fin ?? "",

    actif:
      tournoi.actif !== false,
  };
}

function convertirTournoiVersSupabase(
  tournoi
) {
  return {
    id:
      tournoi.id,

    saison_id:
      tournoi.saisonId,

    association_id:
      tournoi.associationOrganisatriceId,

    nom:
      tournoi.nom,

    date_debut:
      tournoi.dateDebut || null,

    date_fin:
      tournoi.dateFin || null,

    actif:
      tournoi.actif !== false,
  };
}

export function useGestionTournois() {
  const [
    tournois,
    setTournois,
  ] = useState([]);

  const [
    chargement,
    setChargement,
  ] = useState(true);

  const [
    erreurChargement,
    setErreurChargement,
  ] = useState(null);

  useEffect(() => {
    async function chargerTournois() {
      setChargement(true);
      setErreurChargement(null);

      const {
        data,
        error,
      } = await supabase
        .from("tournois")
        .select("*")
        .order(
          "date_debut",
          {
            ascending: false,
          }
        );

      if (error) {
        console.error(
          "Erreur chargement tournois :",
          error
        );

        setErreurChargement(
          error.message
        );

        setChargement(false);
        return;
      }

      setTournois(
        (data ?? []).map(
          convertirTournoiDepuisSupabase
        )
      );

      setChargement(false);
    }

    chargerTournois();
  }, []);

  async function ajouterTournoi(
    formulaire
  ) {
    const tournoi =
      creerTournoi(
        formulaire
      );

    const validation =
      validerTournoi(
        tournoi,
        tournois
      );

    if (!validation.valide) {
      return {
        succes: false,
        tournoi: null,
        erreurs:
          validation.erreurs,
      };
    }

    const donneesSupabase =
      convertirTournoiVersSupabase(
        tournoi
      );

    /*
     * Pour un ajout, on laisse
     * Supabase générer l'UUID.
     */
    delete donneesSupabase.id;

    const {
      data,
      error,
    } = await supabase
      .from("tournois")
      .insert(
        donneesSupabase
      )
      .select()
      .single();

    if (error) {
      return {
        succes: false,
        tournoi: null,
        erreurs: [
          error.message,
        ],
      };
    }

    const tournoiCree =
      convertirTournoiDepuisSupabase(
        data
      );

    setTournois(
      (actuels) => [
        ...actuels,
        tournoiCree,
      ]
    );

    return {
      succes: true,
      tournoi:
        tournoiCree,
      erreurs: [],
    };
  }

  async function modifierTournoiExistant(
    formulaire
  ) {
    const tournoiExistant =
      tournois.find(
        (tournoi) =>
          String(
            tournoi.id
          ) ===
          String(
            formulaire.id
          )
      );

    if (!tournoiExistant) {
      return {
        succes: false,
        tournoi: null,
        erreurs: [
          "Le tournoi est introuvable.",
        ],
      };
    }

    const resultat =
      modifierTournoi(
        tournois,
        formulaire
      );

    if (!resultat.succes) {
      return resultat;
    }

    const tournoiModifie =
      resultat.tournoi;

    const {
      data,
      error,
    } = await supabase
      .from("tournois")
      .update(
        convertirTournoiVersSupabase(
          tournoiModifie
        )
      )
      .eq(
        "id",
        tournoiModifie.id
      )
      .select()
      .single();

    if (error) {
      return {
        succes: false,
        tournoi: null,
        erreurs: [
          error.message,
        ],
      };
    }

    const tournoiSauvegarde =
      convertirTournoiDepuisSupabase(
        data
      );

    setTournois(
      (actuels) =>
        actuels.map(
          (tournoi) =>
            String(
              tournoi.id
            ) ===
            String(
              tournoiSauvegarde.id
            )
              ? tournoiSauvegarde
              : tournoi
        )
    );

    return {
      succes: true,
      tournoi:
        tournoiSauvegarde,
      erreurs: [],
    };
  }

  async function supprimerTournoiExistant(
    tournoiId
  ) {
    const tournoiExistant =
      tournois.find(
        (tournoi) =>
          String(
            tournoi.id
          ) ===
          String(
            tournoiId
          )
      );

    if (!tournoiExistant) {
      return {
        succes: false,
        tournoi: null,
        erreurs: [
          "Le tournoi est introuvable.",
        ],
      };
    }

    const resultat =
      supprimerTournoi(
        tournois,
        tournoiId
      );

    if (!resultat.succes) {
      return resultat;
    }

    const {
      error,
    } = await supabase
      .from("tournois")
      .delete()
      .eq(
        "id",
        tournoiId
      );

    if (error) {
      return {
        succes: false,
        tournoi: null,
        erreurs: [
          error.message,
        ],
      };
    }

    setTournois(
      (actuels) =>
        actuels.filter(
          (tournoi) =>
            String(
              tournoi.id
            ) !==
            String(
              tournoiId
            )
        )
    );

    return {
      succes: true,
      tournoi:
        tournoiExistant,
      erreurs: [],
    };
  }

  function obtenirTournoiParId(
    tournoiId
  ) {
    return (
      tournois.find(
        (tournoi) =>
          String(
            tournoi.id
          ) ===
          String(
            tournoiId
          )
      ) ?? null
    );
  }

  function obtenirTournoisAssociation(
    associationId
  ) {
    if (!associationId) {
      return [];
    }

    return tournois.filter(
      (tournoi) =>
        String(
          tournoi.associationOrganisatriceId
        ) ===
        String(
          associationId
        )
    );
  }

  function obtenirTournoisSaison(
    saisonId
  ) {
    if (!saisonId) {
      return [];
    }

    return tournois.filter(
      (tournoi) =>
        String(
          tournoi.saisonId
        ) ===
        String(
          saisonId
        )
    );
  }

  function obtenirTournoisActifs({
    associationId,
    saisonId,
  } = {}) {
    return tournois.filter(
      (tournoi) => {
        if (
          tournoi.actif === false
        ) {
          return false;
        }

        if (
          associationId &&
          String(
            tournoi.associationOrganisatriceId
          ) !==
            String(
              associationId
            )
        ) {
          return false;
        }

        if (
          saisonId &&
          String(
            tournoi.saisonId
          ) !==
            String(
              saisonId
            )
        ) {
          return false;
        }

        return true;
      }
    );
  }

  return {
    tournois,
    setTournois,

    chargement,
    erreurChargement,

    ajouterTournoi,

    modifierTournoi:
      modifierTournoiExistant,

    supprimerTournoi:
      supprimerTournoiExistant,

    obtenirTournoiParId,
    obtenirTournoisAssociation,
    obtenirTournoisSaison,
    obtenirTournoisActifs,
  };
}