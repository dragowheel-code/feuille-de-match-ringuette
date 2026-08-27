import {
  useState,
} from "react";

function ConnexionAdministration({
  authentification,
  fermer,
}) {
  const [
    courriel,
    setCourriel,
  ] = useState("");

  const [
    motDePasse,
    setMotDePasse,
  ] = useState("");

  const [
    connexionEnCours,
    setConnexionEnCours,
  ] = useState(false);

  const [
    erreurLocale,
    setErreurLocale,
  ] = useState("");

  async function soumettre(
    event
  ) {
    event.preventDefault();

    setErreurLocale("");
    setConnexionEnCours(true);

    const resultat =
      await authentification.connecter(
        courriel,
        motDePasse
      );

    setConnexionEnCours(false);

    if (!resultat.succes) {
      setErreurLocale(
        resultat.erreur ||
          "Connexion impossible."
      );
    }
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>
          Connexion à l’administration
        </h2>

        <form
          onSubmit={soumettre}
        >
          <label>
            Courriel
          </label>

          <input
            type="email"
            value={courriel}
            onChange={(event) =>
              setCourriel(
                event.target.value
              )
            }
            autoComplete="username"
            required
          />

          <label>
            Mot de passe
          </label>

          <input
            type="password"
            value={motDePasse}
            onChange={(event) =>
              setMotDePasse(
                event.target.value
              )
            }
            autoComplete="current-password"
            required
          />

          {(erreurLocale ||
            authentification.erreur) && (
            <p className="erreur">
              {erreurLocale ||
                authentification.erreur}
            </p>
          )}

          <div className="modal-actions">
            <button
              type="submit"
              disabled={
                connexionEnCours
              }
            >
              {connexionEnCours
                ? "Connexion..."
                : "Se connecter"}
            </button>

            <button
              type="button"
              className="cancel-button"
              onClick={fermer}
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ConnexionAdministration;