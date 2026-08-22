import {
  useEffect,
  useState,
} from "react";

import { supabase } from "../services/supabase";

import { creerJoueuse } from "../domain/joueuses/creerJoueuse";
import { validerJoueuse } from "../domain/joueuses/validerJoueuse";

function convertirJoueuseDepuisSupabase(
  joueuse
) {
  return {
    id: joueuse.id,

    associationId:
      joueuse.association_id,

    nomComplet:
      joueuse.nom_complet ?? "",

    numeroInscription:
      joueuse.numero_inscription ?? "",

    adresse:
      joueuse.adresse ?? "",

    ville:
      joueuse.ville ?? "",

    codePostal:
      joueuse.code_postal ?? "",

    telephone:
      joueuse.telephone ?? "",

    sexe:
      joueuse.sexe ?? "",

    dateNaissance:
      joueuse.date_naissance ?? "",

    active:
      joueuse.active !== false,
  };
}

function convertirJoueuseVersSupabase(
  joueuse
) {
  return {
    id:
      joueuse.id,

    association_id:
      joueuse.associationId,

    nom_complet:
      joueuse.nomComplet,

    numero_inscription:
      joueuse.numeroInscription || null,

    adresse:
      joueuse.adresse || null,

    ville:
      joueuse.ville || null,

    code_postal:
      joueuse.codePostal || null,

    telephone:
      joueuse.telephone || null,

    sexe:
      joueuse.sexe,

    date_naissance:
      joueuse.dateNaissance,

    active:
      joueuse.active !== false,
  };
}

export function useGestionJoueuses() {
  const [
    joueuses,
    setJoueuses,
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
    async function chargerJoueuses() {
      setChargement(true);
      setErreurChargement(null);

      const {
        data,
        error,
      } = await supabase
        .from("joueuses")
        .select("*")
        .order("nom_complet");

      if (error) {
        console.error(
          "Erreur chargement joueuses :",
          error
        );

        setErreurChargement(
          error.message
        );

        setChargement(false);
        return;
      }

      setJoueuses(
        (data ?? []).map(
          convertirJoueuseDepuisSupabase
        )
      );

      setChargement(false);
    }

    chargerJoueuses();
  }, []);

  function obtenirJoueuseParId(
    idJoueuse
  ) {
    return joueuses.find(
      (joueuse) =>
        String(joueuse.id) ===
        String(idJoueuse)
    );
  }

  async function ajouterJoueuse(
    formulaire
  ) {
    const nouvelleJoueuse =
      creerJoueuse(formulaire);

    const validation =
      validerJoueuse(
        nouvelleJoueuse,
        joueuses
      );

    if (!validation.valide) {
      return {
        succes: false,
        joueuse: null,
        erreurs:
          validation.erreurs,
      };
    }

    const {
      data,
      error,
    } = await supabase
      .from("joueuses")
      .insert(
        convertirJoueuseVersSupabase(
          nouvelleJoueuse
        )
      )
      .select()
      .single();

    if (error) {
      return {
        succes: false,
        joueuse: null,
        erreurs: [
          error.message,
        ],
      };
    }

    const joueuseCreee =
      convertirJoueuseDepuisSupabase(
        data
      );

    setJoueuses(
      (joueusesActuelles) => [
        ...joueusesActuelles,
        joueuseCreee,
      ]
    );

    return {
      succes: true,
      joueuse:
        joueuseCreee,
      erreurs: [],
    };
  }

  async function modifierJoueuse(
    formulaire
  ) {
    const joueuseExistante =
      obtenirJoueuseParId(
        formulaire.id
      );

    if (!joueuseExistante) {
      return {
        succes: false,
        joueuse: null,
        erreurs: [
          "Joueuse introuvable.",
        ],
      };
    }

    const joueuseModifiee =
      creerJoueuse({
        ...joueuseExistante,
        ...formulaire,
        id:
          joueuseExistante.id,
      });

    const validation =
  validerJoueuse(
    joueuseModifiee,
    joueuses,
    {
      verifierDoublon: false,
    }
  );

    if (!validation.valide) {
      return {
        succes: false,
        joueuse: null,
        erreurs:
          validation.erreurs,
      };
    }

    const {
      data,
      error,
    } = await supabase
      .from("joueuses")
      .update(
        convertirJoueuseVersSupabase(
          joueuseModifiee
        )
      )
      .eq(
        "id",
        joueuseModifiee.id
      )
      .select()
      .single();

    if (error) {
      return {
        succes: false,
        joueuse: null,
        erreurs: [
          error.message,
        ],
      };
    }

    const joueuseSauvegardee =
      convertirJoueuseDepuisSupabase(
        data
      );

    setJoueuses(
      (joueusesActuelles) =>
        joueusesActuelles.map(
          (joueuse) =>
            String(joueuse.id) ===
            String(
              joueuseSauvegardee.id
            )
              ? joueuseSauvegardee
              : joueuse
        )
    );

    return {
      succes: true,
      joueuse:
        joueuseSauvegardee,
      erreurs: [],
    };
  }

  async function supprimerJoueuse(
    idJoueuse
  ) {
    const joueuseExistante =
      obtenirJoueuseParId(
        idJoueuse
      );

    if (!joueuseExistante) {
      return {
        succes: false,
        joueuse: null,
        erreur:
          "Joueuse introuvable.",
      };
    }

    const {
      error,
    } = await supabase
      .from("joueuses")
      .delete()
      .eq(
        "id",
        idJoueuse
      );

    if (error) {
      return {
        succes: false,
        joueuse: null,
        erreur:
          error.message,
      };
    }

    setJoueuses(
      (joueusesActuelles) =>
        joueusesActuelles.filter(
          (joueuse) =>
            String(joueuse.id) !==
            String(idJoueuse)
        )
    );

    return {
      succes: true,
      joueuse:
        joueuseExistante,
    };
  }
  async function importerJoueuses(
  nouvellesJoueuses
) {
  const donneesSupabase =
    nouvellesJoueuses.map(
      convertirJoueuseVersSupabase
    );

  const {
    data,
    error,
  } = await supabase
    .from("joueuses")
    .upsert(
      donneesSupabase,
      {
        onConflict: "id",
      }
    )
    .select();

  if (error) {
    return {
      succes: false,
      erreurs: [
        error.message,
      ],
    };
  }

  const joueusesSauvegardees =
    (data ?? []).map(
      convertirJoueuseDepuisSupabase
    );

  setJoueuses(
    joueusesSauvegardees
  );

  return {
    succes: true,
    joueuses:
      joueusesSauvegardees,
    erreurs: [],
  };
}

  return {
  joueuses,
  setJoueuses,

  chargement,
  erreurChargement,

  obtenirJoueuseParId,
  ajouterJoueuse,
  modifierJoueuse,
  supprimerJoueuse,

  importerJoueuses,
};
}