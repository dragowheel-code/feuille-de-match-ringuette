import { useState } from "react";

export function useEtatPersistant(
  cle,
  valeurInitiale
) {
  const [valeur, setValeurInterne] = useState(() => {
    try {
      const valeurSauvegardee =
        localStorage.getItem(cle);

      if (valeurSauvegardee !== null) {
        return JSON.parse(valeurSauvegardee);
      }
    } catch (erreur) {
      console.error(
        `Impossible de charger « ${cle} ».`,
        erreur
      );
    }

    return typeof valeurInitiale === "function"
      ? valeurInitiale()
      : valeurInitiale;
  });

  function setValeur(nouvelleValeur) {
    setValeurInterne((valeurActuelle) => {
      const valeurMiseAJour =
        typeof nouvelleValeur === "function"
          ? nouvelleValeur(valeurActuelle)
          : nouvelleValeur;

      try {
        localStorage.setItem(
          cle,
          JSON.stringify(valeurMiseAJour)
        );
      } catch (erreur) {
        console.error(
          `Impossible de sauvegarder « ${cle} ».`,
          erreur
        );
      }

      return valeurMiseAJour;
    });
  }

  return [valeur, setValeur];
}