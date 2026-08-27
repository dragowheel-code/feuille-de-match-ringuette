import {
  useEffect,
  useState,
} from "react";

import {
  supabase,
} from "../services/supabase";

export function useAuthentification() {
  const [
    session,
    setSession,
  ] = useState(null);

  const [
    utilisateur,
    setUtilisateur,
  ] = useState(null);

  const [
    chargement,
    setChargement,
  ] = useState(true);

  const [
    erreur,
    setErreur,
  ] = useState(null);

  async function chargerUtilisateur(
    sessionActive
  ) {
    if (!sessionActive?.user?.id) {
      setUtilisateur(null);
      return;
    }

    const {
      data,
      error,
    } = await supabase
      .from(
        "utilisateurs_plateforme"
      )
      .select(`
        user_id,
        role,
        association_id,
        actif
      `)
      .eq(
        "user_id",
        sessionActive.user.id
      )
      .single();

    if (error) {
      console.error(
        "Erreur chargement utilisateur :",
        error
      );

      setErreur(error.message);
      setUtilisateur(null);

      return;
    }

    if (data.actif !== true) {
      setErreur(
        "Ce compte est désactivé."
      );

      setUtilisateur(null);

      return;
    }

    setUtilisateur({
      userId:
        data.user_id,

      courriel:
        sessionActive.user.email ??
        "",

      role:
        data.role,

      associationId:
        data.association_id ??
        null,
    });
  }

  useEffect(() => {
    let composantActif = true;

    async function initialiser() {
      setChargement(true);
      setErreur(null);

      const {
        data,
        error,
      } =
        await supabase.auth.getSession();

      if (!composantActif) {
        return;
      }

      if (error) {
        console.error(
          "Erreur lecture session :",
          error
        );

        setErreur(error.message);
        setChargement(false);

        return;
      }

      const sessionInitiale =
        data.session ?? null;

      setSession(
        sessionInitiale
      );

      await chargerUtilisateur(
        sessionInitiale
      );

      if (composantActif) {
        setChargement(false);
      }
    }

    initialiser();

    const {
      data: abonnement,
    } =
      supabase.auth.onAuthStateChange(
        async (
          _evenement,
          nouvelleSession
        ) => {
          if (!composantActif) {
            return;
          }

          setSession(
            nouvelleSession
          );

          setErreur(null);

          await chargerUtilisateur(
            nouvelleSession
          );

          if (composantActif) {
            setChargement(false);
          }
        }
      );

    return () => {
      composantActif = false;

      abonnement.subscription.unsubscribe();
    };
  }, []);

  async function connecter(
    courriel,
    motDePasse
  ) {
    setErreur(null);

    const {
      data,
      error,
    } =
      await supabase.auth.signInWithPassword({
        email: courriel.trim(),
        password: motDePasse,
      });

    if (error) {
      setErreur(error.message);

      return {
        succes: false,
        erreur: error.message,
      };
    }

    setSession(
      data.session
    );

    await chargerUtilisateur(
      data.session
    );

    return {
      succes: true,
      erreur: null,
    };
  }

  async function deconnecter() {
    setErreur(null);

    const {
      error,
    } =
      await supabase.auth.signOut();

    if (error) {
      setErreur(error.message);

      return {
        succes: false,
        erreur: error.message,
      };
    }

    setSession(null);
    setUtilisateur(null);

    return {
      succes: true,
      erreur: null,
    };
  }

  const estConnecte =
    Boolean(
      session &&
      utilisateur
    );

  const estPlateforme =
    utilisateur?.role ===
    "PLATEFORME";

  const estAssociation =
    utilisateur?.role ===
    "ASSOCIATION";

  return {
    session,
    utilisateur,

    chargement,
    erreur,

    estConnecte,
    estPlateforme,
    estAssociation,

    connecter,
    deconnecter,
  };
}