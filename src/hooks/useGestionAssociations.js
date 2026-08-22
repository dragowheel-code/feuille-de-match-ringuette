import { useEffect, useState } from "react";

import { supabase } from "../services/supabase";

import { creerAssociation } from "../domain/association/creerAssociation";
import { validerAssociation } from "../domain/association/validerAssociation";

function convertirAssociationDepuisSupabase(association) {
  return {
    id: association.id,

    active: association.active,

    code: association.code,
    nom: association.nom,
    abreviation: association.abreviation,
    ville: association.ville,

    courriel:
      association.courriel ?? "",

    nomEquipes:
      association.nom_equipes ?? "",

    logo:
      association.logo
      ? {
      donnees:
      association.logo,
      }
    : null,

    couleurFonce:
      association.couleur_fonce ??
      "#000000",

    couleurClair:
      association.couleur_clair ??
      "#FFFFFF",
  };
}

function convertirAssociationVersSupabase(association) {
  return {
    id: association.id,

    active: association.active,

    code: association.code,
    nom: association.nom,
    abreviation: association.abreviation,
    ville: association.ville,

    courriel:
      association.courriel || null,

    nom_equipes:
      association.nomEquipes,

    logo:
      association.logo?.donnees ??
      association.logo ??
      null,

    couleur_fonce:
      association.couleurFonce,

    couleur_clair:
      association.couleurClair,
  };
}

export function useGestionAssociations() {
  const [
    associations,
    setAssociations,
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
    async function chargerAssociations() {
      setChargement(true);
      setErreurChargement(null);

      const {
        data,
        error,
      } = await supabase
        .from("associations")
        .select("*")
        .order("nom");

      if (error) {
        console.error(
          "Erreur chargement associations :",
          error
        );

        setErreurChargement(
          error.message
        );

        setChargement(false);
        return;
      }

      setAssociations(
        (data ?? []).map(
          convertirAssociationDepuisSupabase
        )
      );

      setChargement(false);
    }

    chargerAssociations();
  }, []);

  function obtenirAssociationParId(
    idAssociation
  ) {
    return associations.find(
      (association) =>
        String(association.id) ===
        String(idAssociation)
    );
  }

  function obtenirAssociationActive() {
    return associations.find(
      (association) =>
        association.active === true
    );
  }

  async function ajouterAssociation(
    formulaire
  ) {
    const nouvelleAssociation =
      creerAssociation(formulaire);

    const validation =
      validerAssociation(
        nouvelleAssociation,
        associations
      );

    if (!validation.valide) {
      return {
        succes: false,
        association: null,
        erreurs:
          validation.erreurs,
      };
    }

    if (nouvelleAssociation.active) {
      const {
        error: erreurDesactivation,
      } = await supabase
        .from("associations")
        .update({
          active: false,
        })
        .eq(
          "active",
          true
        );

      if (erreurDesactivation) {
        return {
          succes: false,
          association: null,
          erreurs: [
            erreurDesactivation.message,
          ],
        };
      }
    }

    const {
      data,
      error,
    } = await supabase
      .from("associations")
      .insert(
        convertirAssociationVersSupabase(
          nouvelleAssociation
        )
      )
      .select()
      .single();

    if (error) {
      return {
        succes: false,
        association: null,
        erreurs: [
          error.message,
        ],
      };
    }

    const associationCreee =
      convertirAssociationDepuisSupabase(
        data
      );

    setAssociations(
      (associationsActuelles) => {
        const associationsMisesAJour =
          associationCreee.active
            ? associationsActuelles.map(
                (association) => ({
                  ...association,
                  active: false,
                })
              )
            : associationsActuelles;

        return [
          ...associationsMisesAJour,
          associationCreee,
        ];
      }
    );

    return {
      succes: true,
      association:
        associationCreee,
      erreurs: [],
    };
  }

  async function modifierAssociation(
    formulaire
  ) {
    const associationExistante =
      obtenirAssociationParId(
        formulaire.id
      );

    if (!associationExistante) {
      return {
        succes: false,
        association: null,
        erreurs: [
          "Association introuvable.",
        ],
      };
    }

    const associationModifiee =
      creerAssociation({
        ...associationExistante,
        ...formulaire,
        id:
          associationExistante.id,
      });

    const validation =
      validerAssociation(
        associationModifiee,
        associations
      );

    if (!validation.valide) {
      return {
        succes: false,
        association: null,
        erreurs:
          validation.erreurs,
      };
    }

    if (associationModifiee.active) {
      const {
        error: erreurDesactivation,
      } = await supabase
        .from("associations")
        .update({
          active: false,
        })
        .eq(
          "active",
          true
        )
        .neq(
          "id",
          associationModifiee.id
        );

      if (erreurDesactivation) {
        return {
          succes: false,
          association: null,
          erreurs: [
            erreurDesactivation.message,
          ],
        };
      }
    }

    const {
      data,
      error,
    } = await supabase
      .from("associations")
      .update(
        convertirAssociationVersSupabase(
          associationModifiee
        )
      )
      .eq(
        "id",
        associationModifiee.id
      )
      .select()
      .single();

    if (error) {
      return {
        succes: false,
        association: null,
        erreurs: [
          error.message,
        ],
      };
    }

    const associationSauvegardee =
      convertirAssociationDepuisSupabase(
        data
      );

    setAssociations(
      (associationsActuelles) =>
        associationsActuelles.map(
          (association) => {
            if (
              String(
                association.id
              ) ===
              String(
                associationSauvegardee.id
              )
            ) {
              return associationSauvegardee;
            }

            if (
              associationSauvegardee.active
            ) {
              return {
                ...association,
                active: false,
              };
            }

            return association;
          }
        )
    );

    return {
      succes: true,
      association:
        associationSauvegardee,
      erreurs: [],
    };
  }

  async function supprimerAssociation(
    idAssociation
  ) {
    const associationExistante =
      obtenirAssociationParId(
        idAssociation
      );

    if (!associationExistante) {
      return {
        succes: false,
        association: null,
        erreur:
          "Association introuvable.",
      };
    }

    const {
      error,
    } = await supabase
      .from("associations")
      .delete()
      .eq(
        "id",
        idAssociation
      );

    if (error) {
      return {
        succes: false,
        association: null,
        erreur:
          error.message,
      };
    }

    setAssociations(
      (associationsActuelles) =>
        associationsActuelles.filter(
          (association) =>
            String(
              association.id
            ) !==
            String(
              idAssociation
            )
        )
    );

    return {
      succes: true,
      association:
        associationExistante,
    };
  }

  return {
    associations,

    chargement,
    erreurChargement,

    ajouterAssociation,
    modifierAssociation,
    supprimerAssociation,

    obtenirAssociationParId,
    obtenirAssociationActive,
  };
}