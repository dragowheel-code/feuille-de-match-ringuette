import {
  useEffect,
  useState,
} from "react";

import { supabase } from "../services/supabase";

import {
  creerPantalons,
  validerPantalons,
} from "../domain/equipements";

function convertirPantalonDepuisSupabase(
  pantalon
) {
  return {
    id:
      pantalon.id,

    associationId:
      pantalon.association_id,

    taille:
      pantalon.taille ?? "",

    quantiteStock:
      Number(
        pantalon.quantite_stock ?? 0
      ),

    actif:
      pantalon.actif !== false,
  };
}

function convertirPantalonVersSupabase(
  pantalon
) {
  return {
    id:
      pantalon.id,

    association_id:
      pantalon.associationId,

    taille:
      pantalon.taille,

    quantite_stock:
      Number(
        pantalon.quantiteStock ?? 0
      ),

    actif:
      pantalon.actif !== false,
  };
}

export function useGestionPantalons() {
  const [
    pantalons,
    setPantalons,
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
    async function chargerPantalons() {
      setChargement(true);
      setErreurChargement(null);

      const {
        data,
        error,
      } = await supabase
        .from("pantalons")
        .select("*")
        .order("taille");

      if (error) {
        console.error(
          "Erreur chargement pantalons :",
          error
        );

        setErreurChargement(
          error.message
        );

        setChargement(false);
        return;
      }

      setPantalons(
        (data ?? []).map(
          convertirPantalonDepuisSupabase
        )
      );

      setChargement(false);
    }

    chargerPantalons();
  }, []);

  function obtenirPantalonParId(
    idPantalon
  ) {
    return (
      pantalons.find(
        (pantalon) =>
          String(
            pantalon.id
          ) ===
          String(idPantalon)
      ) ?? null
    );
  }

  async function ajouterPantalons(
    formulaire
  ) {
    const nouveauPantalon =
      creerPantalons(
        formulaire
      );

    const validation =
      validerPantalons(
        nouveauPantalon,
        pantalons
      );

    if (!validation.valide) {
      return {
        succes: false,
        pantalon: null,
        erreurs:
          validation.erreurs,
      };
    }

    const {
      data,
      error,
    } = await supabase
      .from("pantalons")
      .insert(
        convertirPantalonVersSupabase(
          nouveauPantalon
        )
      )
      .select()
      .single();

    if (error) {
      return {
        succes: false,
        pantalon: null,
        erreurs: [
          error.message,
        ],
      };
    }

    const pantalonCree =
      convertirPantalonDepuisSupabase(
        data
      );

    setPantalons(
      (actuels) => [
        ...actuels,
        pantalonCree,
      ]
    );

    return {
      succes: true,
      pantalon:
        pantalonCree,
      erreurs: [],
    };
  }

  async function modifierPantalons(
    formulaire
  ) {
    const pantalonExistant =
      obtenirPantalonParId(
        formulaire.id
      );

    if (!pantalonExistant) {
      return {
        succes: false,
        pantalon: null,
        erreurs: [
          "Le pantalon est introuvable.",
        ],
      };
    }

    const pantalonModifie =
      creerPantalons({
        ...pantalonExistant,
        ...formulaire,
        id:
          pantalonExistant.id,
      });

    const validation =
      validerPantalons(
        pantalonModifie,
        pantalons
      );

    if (!validation.valide) {
      return {
        succes: false,
        pantalon: null,
        erreurs:
          validation.erreurs,
      };
    }

    const {
      data,
      error,
    } = await supabase
      .from("pantalons")
      .update(
        convertirPantalonVersSupabase(
          pantalonModifie
        )
      )
      .eq(
        "id",
        pantalonModifie.id
      )
      .select()
      .single();

    if (error) {
      return {
        succes: false,
        pantalon: null,
        erreurs: [
          error.message,
        ],
      };
    }

    const pantalonSauvegarde =
      convertirPantalonDepuisSupabase(
        data
      );

    setPantalons(
      (actuels) =>
        actuels.map(
          (pantalon) =>
            String(
              pantalon.id
            ) ===
            String(
              pantalonSauvegarde.id
            )
              ? pantalonSauvegarde
              : pantalon
        )
    );

    return {
      succes: true,
      pantalon:
        pantalonSauvegarde,
      erreurs: [],
    };
  }

  async function supprimerPantalons(
    idPantalon
  ) {
    const pantalonExistant =
      obtenirPantalonParId(
        idPantalon
      );

    if (!pantalonExistant) {
      return {
        succes: false,
        pantalon: null,
        erreurs: [
          "Le pantalon est introuvable.",
        ],
      };
    }

    const {
      error,
    } = await supabase
      .from("pantalons")
      .delete()
      .eq(
        "id",
        idPantalon
      );

    if (error) {
      return {
        succes: false,
        pantalon: null,
        erreurs: [
          error.message,
        ],
      };
    }

    setPantalons(
      (actuels) =>
        actuels.filter(
          (pantalon) =>
            String(
              pantalon.id
            ) !==
            String(idPantalon)
        )
    );

    return {
      succes: true,
      pantalon:
        pantalonExistant,
      erreurs: [],
    };
  }

  return {
    pantalons,
    setPantalons,

    chargement,
    erreurChargement,

    ajouterPantalons,
    modifierPantalons,
    supprimerPantalons,

    obtenirPantalonParId,
  };
}