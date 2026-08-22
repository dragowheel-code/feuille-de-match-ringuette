import {
  useEffect,
  useState,
} from "react";

import { supabase } from "../services/supabase";

import {
  creerOfficiel,
} from "../domain/officiels";

function convertirOfficielDepuisSupabase(
  officiel
) {
  return {
    id: officiel.id,

    associationId:
      officiel.association_id ?? "",

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

function convertirOfficielVersSupabase(
  officiel
) {
  return {
    id:
      officiel.id,

    association_id:
      officiel.associationId || null,

    nom:
      officiel.nom,

    arbitre:
      officiel.arbitre === true,

    chronometreur:
      officiel.chronometreur === true,

    marqueur:
      officiel.marqueur === true,

    operateur_30s:
      officiel.operateur30s === true,

    actif:
      officiel.actif !== false,
  };
}

export function useGestionOfficiels() {
  const [
    officiels,
    setOfficiels,
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
    async function chargerOfficiels() {
      setChargement(true);
      setErreurChargement(null);

      const {
        data,
        error,
      } = await supabase
        .from("officiels")
        .select("*")
        .order("nom");

      if (error) {
        console.error(
          "Erreur chargement officiels :",
          error
        );

        setErreurChargement(
          error.message
        );

        setChargement(false);
        return;
      }

      setOfficiels(
        (data ?? []).map(
          convertirOfficielDepuisSupabase
        )
      );

      setChargement(false);
    }

    chargerOfficiels();
  }, []);

  function obtenirOfficielParId(id) {
    return (
      officiels.find(
        (officiel) =>
          String(officiel.id) ===
          String(id)
      ) ?? null
    );
  }

  async function ajouterOfficiel(
    formulaire
  ) {
    const nouvelOfficiel =
      creerOfficiel(formulaire);

    const {
      data,
      error,
    } = await supabase
      .from("officiels")
      .insert(
        convertirOfficielVersSupabase(
          nouvelOfficiel
        )
      )
      .select()
      .single();

    if (error) {
      return {
        succes: false,
        officiel: null,
        erreurs: [
          error.message,
        ],
      };
    }

    const officielCree =
      convertirOfficielDepuisSupabase(
        data
      );

    setOfficiels(
      (actuels) => [
        ...actuels,
        officielCree,
      ]
    );

    return {
      succes: true,
      officiel:
        officielCree,
      erreurs: [],
    };
  }

  async function modifierOfficielSupabase(
    formulaire
  ) {
    const officielExistant =
      obtenirOfficielParId(
        formulaire.id
      );

    if (!officielExistant) {
      return {
        succes: false,
        officiel: null,
        erreurs: [
          "Officiel introuvable.",
        ],
      };
    }

    const officielModifie =
      creerOfficiel({
        ...officielExistant,
        ...formulaire,
        id:
          officielExistant.id,
      });

    const {
      data,
      error,
    } = await supabase
      .from("officiels")
      .update(
        convertirOfficielVersSupabase(
          officielModifie
        )
      )
      .eq(
        "id",
        officielModifie.id
      )
      .select()
      .single();

    if (error) {
      return {
        succes: false,
        officiel: null,
        erreurs: [
          error.message,
        ],
      };
    }

    const officielSauvegarde =
      convertirOfficielDepuisSupabase(
        data
      );

    setOfficiels(
      (actuels) =>
        actuels.map(
          (officiel) =>
            String(
              officiel.id
            ) ===
            String(
              officielSauvegarde.id
            )
              ? officielSauvegarde
              : officiel
        )
    );

    return {
      succes: true,
      officiel:
        officielSauvegarde,
      erreurs: [],
    };
  }

  async function supprimerOfficielSupabase(
    id
  ) {
    const officielExistant =
      obtenirOfficielParId(id);

    if (!officielExistant) {
      return {
        succes: false,
        officiel: null,
        erreurs: [
          "Officiel introuvable.",
        ],
      };
    }

    const {
      error,
    } = await supabase
      .from("officiels")
      .delete()
      .eq(
        "id",
        id
      );

    if (error) {
      return {
        succes: false,
        officiel: null,
        erreurs: [
          error.message,
        ],
      };
    }

    setOfficiels(
      (actuels) =>
        actuels.filter(
          (officiel) =>
            String(
              officiel.id
            ) !==
            String(id)
        )
    );

    return {
      succes: true,
      officiel:
        officielExistant,
      erreurs: [],
    };
  }

  return {
    officiels,
    setOfficiels,

    chargement,
    erreurChargement,

    ajouterOfficiel,
    modifierOfficiel:
      modifierOfficielSupabase,
    supprimerOfficiel:
      supprimerOfficielSupabase,

    obtenirOfficielParId,
  };
}