import {
  useEffect,
  useState,
} from "react";

import { supabase } from "../services/supabase";

import {
  creerInscriptionEquipeTournoi,
  creerInscriptionOfficielTournoi,
  supprimerInscriptionTournoi,
  validerInscriptionEquipeTournoi,
  validerInscriptionOfficielTournoi,
} from "../domain/tournois/inscriptions";

function convertirInscriptionEquipeDepuisSupabase(
  inscription
) {
  return {
    id: inscription.id,
    tournoiId: inscription.tournoi_id,
    equipeId: inscription.equipe_id,
    actif: inscription.actif !== false,
  };
}

function convertirInscriptionOfficielDepuisSupabase(
  inscription
) {
  return {
    id: inscription.id,
    tournoiId: inscription.tournoi_id,
    officielId: inscription.officiel_id,
    actif: inscription.actif !== false,
  };
}

export function useGestionInscriptionsTournoi() {
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
    erreurChargement,
    setErreurChargement,
  ] = useState(null);

  useEffect(() => {
    async function chargerInscriptions() {
      setChargement(true);
      setErreurChargement(null);

      const [
        resultatEquipes,
        resultatOfficiels,
      ] = await Promise.all([
        supabase
          .from(
            "inscriptions_equipes_tournoi"
          )
          .select("*"),

        supabase
          .from(
            "inscriptions_officiels_tournoi"
          )
          .select("*"),
      ]);

      if (resultatEquipes.error) {
        console.error(
          "Erreur chargement inscriptions équipes :",
          resultatEquipes.error
        );

        setErreurChargement(
          resultatEquipes.error.message
        );

        setChargement(false);
        return;
      }

      if (resultatOfficiels.error) {
        console.error(
          "Erreur chargement inscriptions officiels :",
          resultatOfficiels.error
        );

        setErreurChargement(
          resultatOfficiels.error.message
        );

        setChargement(false);
        return;
      }

      setInscriptionsEquipesTournoi(
        (
          resultatEquipes.data ?? []
        ).map(
          convertirInscriptionEquipeDepuisSupabase
        )
      );

      setInscriptionsOfficielsTournoi(
        (
          resultatOfficiels.data ?? []
        ).map(
          convertirInscriptionOfficielDepuisSupabase
        )
      );

      setChargement(false);
    }

    chargerInscriptions();
  }, []);

  async function inscrireEquipe({
    tournoiId,
    equipeId,
  }) {
    const inscription =
      creerInscriptionEquipeTournoi({
        tournoiId,
        equipeId,
      });

    const validation =
      validerInscriptionEquipeTournoi(
        inscription,
        inscriptionsEquipesTournoi
      );

    if (!validation.valide) {
      return {
        succes: false,
        inscription: null,
        erreurs:
          validation.erreurs,
      };
    }

    const {
      data,
      error,
    } = await supabase
      .from(
        "inscriptions_equipes_tournoi"
      )
      .insert({
        tournoi_id:
          inscription.tournoiId,

        equipe_id:
          inscription.equipeId,

        actif:
          inscription.actif !== false,
      })
      .select()
      .single();

    if (error) {
      return {
        succes: false,
        inscription: null,
        erreurs: [
          error.message,
        ],
      };
    }

    const inscriptionCreee =
      convertirInscriptionEquipeDepuisSupabase(
        data
      );

    setInscriptionsEquipesTournoi(
      (actuelles) => [
        ...actuelles,
        inscriptionCreee,
      ]
    );

    return {
      succes: true,
      inscription:
        inscriptionCreee,
      erreurs: [],
    };
  }

  async function inscrireOfficiel({
    tournoiId,
    officielId,
  }) {
    const inscription =
      creerInscriptionOfficielTournoi({
        tournoiId,
        officielId,
      });

    const validation =
      validerInscriptionOfficielTournoi(
        inscription,
        inscriptionsOfficielsTournoi
      );

    if (!validation.valide) {
      return {
        succes: false,
        inscription: null,
        erreurs:
          validation.erreurs,
      };
    }

    const {
      data,
      error,
    } = await supabase
      .from(
        "inscriptions_officiels_tournoi"
      )
      .insert({
        tournoi_id:
          inscription.tournoiId,

        officiel_id:
          inscription.officielId,

        actif:
          inscription.actif !== false,
      })
      .select()
      .single();

    if (error) {
      return {
        succes: false,
        inscription: null,
        erreurs: [
          error.message,
        ],
      };
    }

    const inscriptionCreee =
      convertirInscriptionOfficielDepuisSupabase(
        data
      );

    setInscriptionsOfficielsTournoi(
      (actuelles) => [
        ...actuelles,
        inscriptionCreee,
      ]
    );

    return {
      succes: true,
      inscription:
        inscriptionCreee,
      erreurs: [],
    };
  }

  async function retirerEquipe(
    inscriptionId
  ) {
    const resultat =
      supprimerInscriptionTournoi(
        inscriptionsEquipesTournoi,
        inscriptionId
      );

    if (!resultat.succes) {
      return resultat;
    }

    const {
      error,
    } = await supabase
      .from(
        "inscriptions_equipes_tournoi"
      )
      .delete()
      .eq(
        "id",
        inscriptionId
      );

    if (error) {
      return {
        succes: false,
        erreurs: [
          error.message,
        ],
      };
    }

    setInscriptionsEquipesTournoi(
      resultat.inscriptions
    );

    return resultat;
  }

  async function retirerOfficiel(
    inscriptionId
  ) {
    const resultat =
      supprimerInscriptionTournoi(
        inscriptionsOfficielsTournoi,
        inscriptionId
      );

    if (!resultat.succes) {
      return resultat;
    }

    const {
      error,
    } = await supabase
      .from(
        "inscriptions_officiels_tournoi"
      )
      .delete()
      .eq(
        "id",
        inscriptionId
      );

    if (error) {
      return {
        succes: false,
        erreurs: [
          error.message,
        ],
      };
    }

    setInscriptionsOfficielsTournoi(
      resultat.inscriptions
    );

    return resultat;
  }

  async function supprimerInscriptionsTournoi(
    tournoiId
  ) {
    const [
      resultatEquipes,
      resultatOfficiels,
    ] = await Promise.all([
      supabase
        .from(
          "inscriptions_equipes_tournoi"
        )
        .delete()
        .eq(
          "tournoi_id",
          tournoiId
        ),

      supabase
        .from(
          "inscriptions_officiels_tournoi"
        )
        .delete()
        .eq(
          "tournoi_id",
          tournoiId
        ),
    ]);

    if (resultatEquipes.error) {
      return {
        succes: false,
        erreurs: [
          resultatEquipes.error.message,
        ],
      };
    }

    if (resultatOfficiels.error) {
      return {
        succes: false,
        erreurs: [
          resultatOfficiels.error.message,
        ],
      };
    }

    setInscriptionsEquipesTournoi(
      (actuelles) =>
        actuelles.filter(
          (inscription) =>
            String(
              inscription.tournoiId
            ) !==
            String(tournoiId)
        )
    );

    setInscriptionsOfficielsTournoi(
      (actuelles) =>
        actuelles.filter(
          (inscription) =>
            String(
              inscription.tournoiId
            ) !==
            String(tournoiId)
        )
    );

    return {
      succes: true,
      erreurs: [],
    };
  }

  function obtenirEquipesTournoi(
    tournoiId
  ) {
    if (!tournoiId) {
      return [];
    }

    return inscriptionsEquipesTournoi.filter(
      (inscription) =>
        String(
          inscription.tournoiId
        ) ===
        String(tournoiId)
    );
  }

  function obtenirOfficielsTournoi(
    tournoiId
  ) {
    if (!tournoiId) {
      return [];
    }

    return inscriptionsOfficielsTournoi.filter(
      (inscription) =>
        String(
          inscription.tournoiId
        ) ===
        String(tournoiId)
    );
  }

  function equipeEstInscrite({
    tournoiId,
    equipeId,
  }) {
    return inscriptionsEquipesTournoi.some(
      (inscription) =>
        String(
          inscription.tournoiId
        ) ===
          String(tournoiId) &&
        String(
          inscription.equipeId
        ) ===
          String(equipeId)
    );
  }

  function officielEstInscrit({
    tournoiId,
    officielId,
  }) {
    return inscriptionsOfficielsTournoi.some(
      (inscription) =>
        String(
          inscription.tournoiId
        ) ===
          String(tournoiId) &&
        String(
          inscription.officielId
        ) ===
          String(officielId)
    );
  }

  return {
    inscriptionsEquipesTournoi,
    setInscriptionsEquipesTournoi,

    inscriptionsOfficielsTournoi,
    setInscriptionsOfficielsTournoi,

    chargement,
    erreurChargement,

    inscrireEquipe,
    inscrireOfficiel,

    retirerEquipe,
    retirerOfficiel,

    supprimerInscriptionsTournoi,

    obtenirEquipesTournoi,
    obtenirOfficielsTournoi,

    equipeEstInscrite,
    officielEstInscrit,
  };
}