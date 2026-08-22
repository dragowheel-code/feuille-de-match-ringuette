import {
  useEffect,
  useState,
} from "react";

import { supabase } from "../services/supabase";

import {
  creerEnsembleChandails,
  validerEnsembleChandails,
} from "../domain/equipements";

function convertirEnsembleDepuisSupabase(
  ensemble
) {
  const chandails =
    ensemble.chandails ?? [];

  const clair =
    chandails.find(
      (chandail) =>
        chandail.type_couleur ===
        "CLAIR"
    );

  const fonce =
    chandails.find(
      (chandail) =>
        chandail.type_couleur ===
        "FONCE"
    );

  return {
    id: ensemble.id,

    associationId:
      ensemble.association_id,

    numero:
      ensemble.numero ?? "",

    taille:
      ensemble.taille ?? "",

    clair: {
      etat:
        clair?.etat ?? "Bon",

      notes:
        clair?.commentaire ?? "",
    },

    fonce: {
      etat:
        fonce?.etat ?? "Bon",

      notes:
        fonce?.commentaire ?? "",
    },

    actif:
      ensemble.active !== false,
  };
}

export function useGestionChandails() {
  const [
    ensemblesChandails,
    setEnsemblesChandails,
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
    async function chargerEnsembles() {
      setChargement(true);
      setErreurChargement(null);

      const {
        data,
        error,
      } = await supabase
        .from("ensembles_chandails")
        .select(`
          *,
          chandails (
            id,
            ensemble_id,
            type_couleur,
            etat,
            commentaire,
            active
          )
        `)
        .order("numero");

      if (error) {
        console.error(
          "Erreur chargement chandails :",
          error
        );

        setErreurChargement(
          error.message
        );

        setChargement(false);
        return;
      }

      setEnsemblesChandails(
        (data ?? []).map(
          convertirEnsembleDepuisSupabase
        )
      );

      setChargement(false);
    }

    chargerEnsembles();
  }, []);

  async function ajouterEnsemble(
    formulaire
  ) {
    const nouvelEnsemble =
      creerEnsembleChandails(
        formulaire
      );

    const validation =
      validerEnsembleChandails(
        nouvelEnsemble,
        ensemblesChandails
      );

    if (!validation.valide) {
      return {
        succes: false,
        ensemble: null,
        erreurs:
          validation.erreurs,
      };
    }

    const {
      data: ensembleCree,
      error: erreurEnsemble,
    } = await supabase
      .from("ensembles_chandails")
      .insert({
        id:
          nouvelEnsemble.id,

        association_id:
          nouvelEnsemble.associationId,

        numero:
          nouvelEnsemble.numero,

        taille:
          nouvelEnsemble.taille,

        active:
          nouvelEnsemble.actif,
      })
      .select()
      .single();

    if (erreurEnsemble) {
      return {
        succes: false,
        ensemble: null,
        erreurs: [
          erreurEnsemble.message,
        ],
      };
    }

    const {
      error: erreurChandails,
    } = await supabase
      .from("chandails")
      .insert([
        {
          ensemble_id:
            ensembleCree.id,

          type_couleur:
            "CLAIR",

          etat:
            nouvelEnsemble.clair.etat,

          commentaire:
            nouvelEnsemble.clair.notes ||
            null,

          active:
            nouvelEnsemble.actif,
        },

        {
          ensemble_id:
            ensembleCree.id,

          type_couleur:
            "FONCE",

          etat:
            nouvelEnsemble.fonce.etat,

          commentaire:
            nouvelEnsemble.fonce.notes ||
            null,

          active:
            nouvelEnsemble.actif,
        },
      ]);

    if (erreurChandails) {
      await supabase
        .from("ensembles_chandails")
        .delete()
        .eq(
          "id",
          ensembleCree.id
        );

      return {
        succes: false,
        ensemble: null,
        erreurs: [
          erreurChandails.message,
        ],
      };
    }

    setEnsemblesChandails(
      (actuels) => [
        ...actuels,
        nouvelEnsemble,
      ]
    );

    return {
      succes: true,
      ensemble:
        nouvelEnsemble,
      erreurs: [],
    };
  }

  async function modifierEnsemble(
    formulaire
  ) {
    const ensembleExistant =
      ensemblesChandails.find(
        (ensemble) =>
          String(
            ensemble.id
          ) ===
          String(
            formulaire.id
          )
      );

    if (!ensembleExistant) {
      return {
        succes: false,
        ensemble: null,
        erreurs: [
          "L'ensemble de chandails est introuvable.",
        ],
      };
    }

    const ensembleModifie =
      creerEnsembleChandails({
        ...ensembleExistant,
        ...formulaire,
        id:
          ensembleExistant.id,
      });

    const validation =
      validerEnsembleChandails(
        ensembleModifie,
        ensemblesChandails
      );

    if (!validation.valide) {
      return {
        succes: false,
        ensemble: null,
        erreurs:
          validation.erreurs,
      };
    }

    const {
      error: erreurEnsemble,
    } = await supabase
      .from("ensembles_chandails")
      .update({
        association_id:
          ensembleModifie.associationId,

        numero:
          ensembleModifie.numero,

        taille:
          ensembleModifie.taille,

        active:
          ensembleModifie.actif,
      })
      .eq(
        "id",
        ensembleModifie.id
      );

    if (erreurEnsemble) {
      return {
        succes: false,
        ensemble: null,
        erreurs: [
          erreurEnsemble.message,
        ],
      };
    }

    const {
      error: erreurClair,
    } = await supabase
      .from("chandails")
      .update({
        etat:
          ensembleModifie.clair.etat,

        commentaire:
          ensembleModifie.clair.notes ||
          null,

        active:
          ensembleModifie.actif,
      })
      .eq(
        "ensemble_id",
        ensembleModifie.id
      )
      .eq(
        "type_couleur",
        "CLAIR"
      );

    if (erreurClair) {
      return {
        succes: false,
        ensemble: null,
        erreurs: [
          erreurClair.message,
        ],
      };
    }

    const {
      error: erreurFonce,
    } = await supabase
      .from("chandails")
      .update({
        etat:
          ensembleModifie.fonce.etat,

        commentaire:
          ensembleModifie.fonce.notes ||
          null,

        active:
          ensembleModifie.actif,
      })
      .eq(
        "ensemble_id",
        ensembleModifie.id
      )
      .eq(
        "type_couleur",
        "FONCE"
      );

    if (erreurFonce) {
      return {
        succes: false,
        ensemble: null,
        erreurs: [
          erreurFonce.message,
        ],
      };
    }

    setEnsemblesChandails(
      (actuels) =>
        actuels.map(
          (ensemble) =>
            String(
              ensemble.id
            ) ===
            String(
              ensembleModifie.id
            )
              ? ensembleModifie
              : ensemble
        )
    );

    return {
      succes: true,
      ensemble:
        ensembleModifie,
      erreurs: [],
    };
  }

  async function supprimerEnsemble(
    idEnsemble
  ) {
    const ensembleExistant =
      ensemblesChandails.find(
        (ensemble) =>
          String(
            ensemble.id
          ) ===
          String(idEnsemble)
      );

    if (!ensembleExistant) {
      return {
        succes: false,
        ensemble: null,
        erreurs: [
          "L'ensemble de chandails est introuvable.",
        ],
      };
    }

    const {
      error,
    } = await supabase
      .from("ensembles_chandails")
      .delete()
      .eq(
        "id",
        idEnsemble
      );

    if (error) {
      return {
        succes: false,
        ensemble: null,
        erreurs: [
          error.message,
        ],
      };
    }

    setEnsemblesChandails(
      (actuels) =>
        actuels.filter(
          (ensemble) =>
            String(
              ensemble.id
            ) !==
            String(
              idEnsemble
            )
        )
    );

    return {
      succes: true,
      ensemble:
        ensembleExistant,
      erreurs: [],
    };
  }

  return {
    ensemblesChandails,

    chargement,
    erreurChargement,

    ajouterEnsemble,
    modifierEnsemble,
    supprimerEnsemble,
  };
}