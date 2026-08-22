import {
  useEffect,
  useState,
} from "react";

import { supabase } from "../services/supabase";

import {
  creerPantalonJoueuse,
  validerPantalonJoueuse,
} from "../domain/equipements/pantalonsJoueuses";

function convertirRemiseDepuisSupabase(
  remise
) {
  return {
    id:
      remise.id,

    joueuseId:
      remise.joueuse_id,

    pantalonId:
      remise.pantalon_id,

    quantite:
      Number(
        remise.quantite ?? 1
      ),

    dateRemise:
      remise.date_remise ?? "",

    remplacement:
      remise.remplacement === true,

    commentaire:
      remise.commentaire ?? "",
  };
}

function convertirRemiseVersSupabase(
  remise
) {
  return {
    id:
      remise.id,

    joueuse_id:
      remise.joueuseId,

    pantalon_id:
      remise.pantalonId,

    quantite:
      remise.quantite,

    date_remise:
      remise.dateRemise,

    remplacement:
      remise.remplacement === true,

    commentaire:
      remise.commentaire || null,
  };
}

export function useGestionPantalonsJoueuses({
  pantalons = [],
  setPantalons,
} = {}) {
  const [
    pantalonsJoueuses,
    setPantalonsJoueuses,
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
    async function chargerRemises() {
      setChargement(true);
      setErreurChargement(null);

      const {
        data,
        error,
      } = await supabase
        .from("pantalons_joueuses")
        .select("*")
        .order(
          "date_remise",
          {
            ascending: false,
          }
        );

      if (error) {
        console.error(
          "Erreur chargement remises pantalons :",
          error
        );

        setErreurChargement(
          error.message
        );

        setChargement(false);
        return;
      }

      setPantalonsJoueuses(
        (data ?? []).map(
          convertirRemiseDepuisSupabase
        )
      );

      setChargement(false);
    }

    chargerRemises();
  }, []);

  async function ajouterPantalonJoueuse(
    formulaire
  ) {
    const nouvelleRemise =
      creerPantalonJoueuse(
        formulaire
      );

    const validation =
      validerPantalonJoueuse(
        nouvelleRemise
      );

    if (!validation.valide) {
      return {
        succes: false,
        remise: null,
        erreurs:
          validation.erreurs,
      };
    }

    const pantalon =
      pantalons.find(
        (element) =>
          String(element.id) ===
          String(
            nouvelleRemise.pantalonId
          )
      );

    if (!pantalon) {
      return {
        succes: false,
        remise: null,
        erreurs: [
          "La taille de pantalon est introuvable.",
        ],
      };
    }

    if (
      pantalon.actif === false
    ) {
      return {
        succes: false,
        remise: null,
        erreurs: [
          "Cette taille de pantalon est inactive.",
        ],
      };
    }

    const quantiteDisponible =
      Number(
        pantalon.quantiteStock ?? 0
      );

    if (
      quantiteDisponible <
      nouvelleRemise.quantite
    ) {
      return {
        succes: false,
        remise: null,
        erreurs: [
          "La quantité demandée dépasse le stock disponible.",
        ],
      };
    }

    const {
      data,
      error,
    } = await supabase
      .from("pantalons_joueuses")
      .insert(
        convertirRemiseVersSupabase(
          nouvelleRemise
        )
      )
      .select()
      .single();

    if (error) {
      return {
        succes: false,
        remise: null,
        erreurs: [
          error.message,
        ],
      };
    }

    const nouveauStock =
      quantiteDisponible -
      nouvelleRemise.quantite;

    const {
      error: erreurStock,
    } = await supabase
      .from("pantalons")
      .update({
        quantite_stock:
          nouveauStock,
      })
      .eq(
        "id",
        nouvelleRemise.pantalonId
      );

    if (erreurStock) {
      await supabase
        .from("pantalons_joueuses")
        .delete()
        .eq(
          "id",
          data.id
        );

      return {
        succes: false,
        remise: null,
        erreurs: [
          erreurStock.message,
        ],
      };
    }

    const remiseSauvegardee =
      convertirRemiseDepuisSupabase(
        data
      );

    setPantalonsJoueuses(
      (actuelles) => [
        remiseSauvegardee,
        ...actuelles,
      ]
    );

    if (
      typeof setPantalons ===
      "function"
    ) {
      setPantalons(
        (actuels) =>
          actuels.map(
            (pantalonActuel) =>
              String(
                pantalonActuel.id
              ) ===
              String(
                nouvelleRemise.pantalonId
              )
                ? {
                    ...pantalonActuel,
                    quantiteStock:
                      nouveauStock,
                  }
                : pantalonActuel
          )
      );
    }

    return {
      succes: true,
      remise:
        remiseSauvegardee,
      erreurs: [],
    };
  }

  function obtenirRemisesJoueuse(
    joueuseId
  ) {
    return pantalonsJoueuses.filter(
      (remise) =>
        String(remise.joueuseId) ===
        String(joueuseId)
    );
  }

  function obtenirDerniereRemise(
    joueuseId
  ) {
    const remises =
      obtenirRemisesJoueuse(
        joueuseId
      );

    if (remises.length === 0) {
      return null;
    }

    return [...remises].sort(
      (a, b) =>
        String(
          b.dateRemise
        ).localeCompare(
          String(
            a.dateRemise
          )
        )
    )[0];
  }

  return {
    pantalonsJoueuses,
    setPantalonsJoueuses,

    chargement,
    erreurChargement,

    ajouterPantalonJoueuse,

    obtenirRemisesJoueuse,
    obtenirDerniereRemise,
  };
}