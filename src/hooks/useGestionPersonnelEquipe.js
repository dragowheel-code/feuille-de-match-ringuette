import {
  useEffect,
  useState,
} from "react";

import { supabase } from "../services/supabase";

import {
  creerPersonnelEquipe,
  validerPersonnelEquipe,
} from "../domain/personnelEquipe";

function convertirPersonnelDepuisSupabase(
  personnel
) {
  return {
    id: personnel.id,

    associationId:
      personnel.association_id,

    nomComplet:
      personnel.nom_complet ?? "",

    courriel:
      personnel.courriel ?? "",

    telephone:
      personnel.telephone ?? "",

    pnce: {
      numero:
        personnel.pnce_numero ?? "",

      introduction:
        personnel.pnce_introduction ===
        true,

      ethiqueSportive:
        personnel.pnce_ethique_sportive ===
        true,

      competition:
        personnel.pnce_competition ===
        true,
    },

    actif:
      personnel.actif !== false,
  };
}

function convertirPersonnelVersSupabase(
  personnel
) {
  return {
    id:
      personnel.id,

    association_id:
      personnel.associationId,

    nom_complet:
      personnel.nomComplet,

    courriel:
      personnel.courriel || null,

    telephone:
      personnel.telephone || null,

    pnce_numero:
      personnel.pnce?.numero || null,

    pnce_introduction:
      personnel.pnce?.introduction ===
      true,

    pnce_ethique_sportive:
      personnel.pnce
        ?.ethiqueSportive === true,

    pnce_competition:
      personnel.pnce?.competition ===
      true,

    actif:
      personnel.actif !== false,
  };
}

export function useGestionPersonnelEquipe() {
  const [
    personnelEquipe,
    setPersonnelEquipe,
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
    async function chargerPersonnel() {
      setChargement(true);
      setErreurChargement(null);

      const {
        data,
        error,
      } = await supabase
        .from("personnel_equipe")
        .select("*")
        .order("nom_complet");

      if (error) {
        console.error(
          "Erreur chargement personnel :",
          error
        );

        setErreurChargement(
          error.message
        );

        setChargement(false);
        return;
      }

      setPersonnelEquipe(
        (data ?? []).map(
          convertirPersonnelDepuisSupabase
        )
      );

      setChargement(false);
    }

    chargerPersonnel();
  }, []);

  function obtenirPersonnelParId(id) {
    return (
      personnelEquipe.find(
        (personnel) =>
          String(personnel.id) ===
          String(id)
      ) ?? null
    );
  }

  function obtenirPersonnelAssociation(
    associationId
  ) {
    if (!associationId) {
      return [];
    }

    return personnelEquipe.filter(
      (personnel) =>
        String(
          personnel.associationId
        ) ===
        String(associationId)
    );
  }

  function obtenirPersonnelActif(
    associationId
  ) {
    if (!associationId) {
      return [];
    }

    return personnelEquipe.filter(
      (personnel) =>
        String(
          personnel.associationId
        ) ===
          String(associationId) &&
        personnel.actif !== false
    );
  }

  async function ajouterPersonnel(
    formulaire
  ) {
    const personnel =
      creerPersonnelEquipe(
        formulaire
      );

    const validation =
      validerPersonnelEquipe(
        personnel,
        personnelEquipe
      );

    if (!validation.valide) {
      return {
        succes: false,
        personnel: null,
        erreurs:
          validation.erreurs,
      };
    }

    const {
      data,
      error,
    } = await supabase
      .from("personnel_equipe")
      .insert(
        convertirPersonnelVersSupabase(
          personnel
        )
      )
      .select()
      .single();

    if (error) {
      return {
        succes: false,
        personnel: null,
        erreurs: [
          error.message,
        ],
      };
    }

    const personnelCree =
      convertirPersonnelDepuisSupabase(
        data
      );

    setPersonnelEquipe(
      (actuels) => [
        ...actuels,
        personnelCree,
      ]
    );

    return {
      succes: true,
      personnel:
        personnelCree,
      erreurs: [],
    };
  }

  async function modifierPersonnel(
    formulaire
  ) {
    const personnelExistant =
      obtenirPersonnelParId(
        formulaire.id
      );

    if (!personnelExistant) {
      return {
        succes: false,
        personnel: null,
        erreurs: [
          "Personnel introuvable.",
        ],
      };
    }

    const personnelModifie =
      creerPersonnelEquipe({
        ...personnelExistant,
        ...formulaire,
        id:
          personnelExistant.id,
      });

    const validation =
      validerPersonnelEquipe(
        personnelModifie,
        personnelEquipe
      );

    if (!validation.valide) {
      return {
        succes: false,
        personnel: null,
        erreurs:
          validation.erreurs,
      };
    }

    const {
      data,
      error,
    } = await supabase
      .from("personnel_equipe")
      .update(
        convertirPersonnelVersSupabase(
          personnelModifie
        )
      )
      .eq(
        "id",
        personnelModifie.id
      )
      .select()
      .single();

    if (error) {
      return {
        succes: false,
        personnel: null,
        erreurs: [
          error.message,
        ],
      };
    }

    const personnelSauvegarde =
      convertirPersonnelDepuisSupabase(
        data
      );

    setPersonnelEquipe(
      (actuels) =>
        actuels.map(
          (personnel) =>
            String(
              personnel.id
            ) ===
            String(
              personnelSauvegarde.id
            )
              ? personnelSauvegarde
              : personnel
        )
    );

    return {
      succes: true,
      personnel:
        personnelSauvegarde,
      erreurs: [],
    };
  }

  async function supprimerPersonnel(
    personnelId
  ) {
    const personnelExistant =
      obtenirPersonnelParId(
        personnelId
      );

    if (!personnelExistant) {
      return {
        succes: false,
        personnel: null,
        erreurs: [
          "Personnel introuvable.",
        ],
      };
    }

    const {
      error,
    } = await supabase
      .from("personnel_equipe")
      .delete()
      .eq(
        "id",
        personnelId
      );

    if (error) {
      return {
        succes: false,
        personnel: null,
        erreurs: [
          error.message,
        ],
      };
    }

    setPersonnelEquipe(
      (actuels) =>
        actuels.filter(
          (personnel) =>
            String(
              personnel.id
            ) !==
            String(personnelId)
        )
    );

    return {
      succes: true,
      personnel:
        personnelExistant,
      erreurs: [],
    };
  }

  return {
    personnelEquipe,
    setPersonnelEquipe,

    chargement,
    erreurChargement,

    ajouterPersonnel,
    modifierPersonnel,
    supprimerPersonnel,

    obtenirPersonnelParId,
    obtenirPersonnelAssociation,
    obtenirPersonnelActif,
  };
}