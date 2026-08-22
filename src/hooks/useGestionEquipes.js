import {
  useEffect,
  useState,
} from "react";

import { supabase } from "../services/supabase";

import { creerEquipe } from "../domain/equipes/creerEquipe";
import { validerEquipe } from "../domain/equipes/validerEquipe";

function convertirEquipeDepuisSupabase(
  equipe
) {
  return {
    id: equipe.id,

    associationId:
      equipe.association_id,

    saisonId:
      equipe.saison_id,

    categorie:
      equipe.categories?.code ?? "",

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

export function useGestionEquipes() {
  const [
    equipes,
    setEquipes,
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
    async function chargerEquipes() {
      setChargement(true);
      setErreurChargement(null);

      const {
        data,
        error,
      } = await supabase
        .from("equipes")
        .select(`
          *,
          categories (
            code
          )
        `)
        .order("niveau");

      if (error) {
        console.error(
          "Erreur chargement équipes :",
          error
        );

        setErreurChargement(
          error.message
        );

        setChargement(false);
        return;
      }

      setEquipes(
        (data ?? []).map(
          convertirEquipeDepuisSupabase
        )
      );

      setChargement(false);
    }

    chargerEquipes();
  }, []);

  async function obtenirCategorieId(
    categorie
  ) {
    const code =
      String(
        categorie ?? ""
      )
        .trim()
        .toUpperCase();

    if (!code) {
      return {
        id: null,
        erreur:
          "La catégorie est obligatoire.",
      };
    }

    const {
      data,
      error,
    } = await supabase
      .from("categories")
      .select("id")
      .eq("code", code)
      .maybeSingle();

    if (error) {
      return {
        id: null,
        erreur:
          error.message,
      };
    }

    if (!data) {
      return {
        id: null,
        erreur:
          `La catégorie ${code} est introuvable dans Supabase.`,
      };
    }

    return {
      id: data.id,
      erreur: null,
    };
  }

  function obtenirEquipeParId(
    idEquipe
  ) {
    return equipes.find(
      (equipe) =>
        String(equipe.id) ===
        String(idEquipe)
    );
  }

  async function convertirEquipeVersSupabase(
    equipe
  ) {
    const categorie =
      await obtenirCategorieId(
        equipe.categorie
      );

    if (!categorie.id) {
      return {
        donnees: null,
        erreur:
          categorie.erreur,
      };
    }

    return {
      donnees: {
        id:
          equipe.id,

        association_id:
          equipe.associationId,

        saison_id:
          equipe.saisonId,

        categorie_id:
          categorie.id,

        niveau:
          equipe.niveau,

        numero_equipe:
          equipe.numeroEquipe ?? "",

        abreviation:
          equipe.abreviation ?? "",

        active:
          equipe.active !== false,
      },

      erreur: null,
    };
  }

  async function ajouterEquipe(
    formulaire
  ) {
    const nouvelleEquipe =
      creerEquipe(formulaire);

    const validation =
      validerEquipe(
        nouvelleEquipe,
        equipes
      );

    if (!validation.valide) {
      return {
        succes: false,
        equipe: null,
        erreurs:
          validation.erreurs,
      };
    }

    const conversion =
      await convertirEquipeVersSupabase(
        nouvelleEquipe
      );

    if (!conversion.donnees) {
      return {
        succes: false,
        equipe: null,
        erreurs: [
          conversion.erreur,
        ],
      };
    }

    const {
      data,
      error,
    } = await supabase
      .from("equipes")
      .insert(
        conversion.donnees
      )
      .select(`
        *,
        categories (
          code
        )
      `)
      .single();

    if (error) {
      return {
        succes: false,
        equipe: null,
        erreurs: [
          error.message,
        ],
      };
    }

    const equipeCreee =
      convertirEquipeDepuisSupabase(
        data
      );

    setEquipes(
      (equipesActuelles) => [
        ...equipesActuelles,
        equipeCreee,
      ]
    );

    return {
      succes: true,
      equipe:
        equipeCreee,
      erreurs: [],
    };
  }

  async function modifierEquipe(
    formulaire
  ) {
    const equipeExistante =
      obtenirEquipeParId(
        formulaire.id
      );

    if (!equipeExistante) {
      return {
        succes: false,
        equipe: null,
        erreurs: [
          "Équipe introuvable.",
        ],
      };
    }

    const equipeModifiee =
      creerEquipe({
        ...equipeExistante,
        ...formulaire,
        id:
          equipeExistante.id,
      });

    const validation =
      validerEquipe(
        equipeModifiee,
        equipes
      );

    if (!validation.valide) {
      return {
        succes: false,
        equipe: null,
        erreurs:
          validation.erreurs,
      };
    }

    const conversion =
      await convertirEquipeVersSupabase(
        equipeModifiee
      );

    if (!conversion.donnees) {
      return {
        succes: false,
        equipe: null,
        erreurs: [
          conversion.erreur,
        ],
      };
    }

    const {
      data,
      error,
    } = await supabase
      .from("equipes")
      .update(
        conversion.donnees
      )
      .eq(
        "id",
        equipeModifiee.id
      )
      .select(`
        *,
        categories (
          code
        )
      `)
      .single();

    if (error) {
      return {
        succes: false,
        equipe: null,
        erreurs: [
          error.message,
        ],
      };
    }

    const equipeSauvegardee =
      convertirEquipeDepuisSupabase(
        data
      );

    setEquipes(
      (equipesActuelles) =>
        equipesActuelles.map(
          (equipe) =>
            String(equipe.id) ===
            String(
              equipeSauvegardee.id
            )
              ? equipeSauvegardee
              : equipe
        )
    );

    return {
      succes: true,
      equipe:
        equipeSauvegardee,
      erreurs: [],
    };
  }

  async function supprimerEquipe(
    idEquipe
  ) {
    const equipeExistante =
      obtenirEquipeParId(
        idEquipe
      );

    if (!equipeExistante) {
      return {
        succes: false,
        equipe: null,
        erreur:
          "Équipe introuvable.",
      };
    }

    const {
      error,
    } = await supabase
      .from("equipes")
      .delete()
      .eq(
        "id",
        idEquipe
      );

    if (error) {
      return {
        succes: false,
        equipe: null,
        erreur:
          error.message,
      };
    }

    setEquipes(
      (equipesActuelles) =>
        equipesActuelles.filter(
          (equipe) =>
            String(equipe.id) !==
            String(idEquipe)
        )
    );

    return {
      succes: true,
      equipe:
        equipeExistante,
    };
  }

  return {
    equipes,

    chargement,
    erreurChargement,

    ajouterEquipe,
    modifierEquipe,
    supprimerEquipe,
    obtenirEquipeParId,
  };
}