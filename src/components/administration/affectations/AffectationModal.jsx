import {
  calculerInformationsEquipe,
  filtrerEquipes,
  filtrerJoueuses,
  verifierNumeroDisponible,
} from "../../../domain/affectation";

function obtenirNomSaison(saison) {
  return (
    saison?.nom ??
    saison?.libelle ??
    saison?.code ??
    "Saison sans nom"
  );
}

function obtenirNomAssociation(association) {
  return (
    association?.nom ??
    association?.nomAssociation ??
    "Association sans nom"
  );
}

function obtenirNomEquipe(equipe) {
  return (
    equipe?.nom ??
    equipe?.nomEquipe ??
    [equipe?.categorie, equipe?.niveau]
      .filter(Boolean)
      .join(" ") ??
    "Équipe sans nom"
  );
}

function obtenirNomJoueuse(joueuse) {
  if (joueuse?.nomComplet) {
    return joueuse.nomComplet;
  }

  return [joueuse?.prenom, joueuse?.nom]
    .filter(Boolean)
    .join(" ");
}

function AffectationModal({
  ouverte,
  fermer,
  enregistrer,
  formulaire,
  setFormulaire,
  affectation,
  affectations,
  erreurs,
  saisons,
  associations,
  equipes,
  joueuses,
}) {
  if (!ouverte) {
    return null;
  }

  const saisonSelectionnee =
    saisons.find(
      (saison) =>
        String(saison.id) ===
        String(formulaire.saisonId)
    ) ?? null;
    console.table(
  joueuses.slice(0, 5),
  [
    "id",
    "nomComplet",
    "numeroInscription",
    "codeCategorie"
  ]
);

  const equipesDisponibles =
    filtrerEquipes({
      equipes,
      associationId:
        formulaire.associationId,
    });

  const equipeSelectionnee =
    equipesDisponibles.find(
      (equipe) =>
        String(equipe.id) ===
        String(formulaire.equipeId)
    ) ?? null;

  const joueusesDisponibles =
    filtrerJoueuses({
      joueuses,
      equipe: equipeSelectionnee,
      saison: saisonSelectionnee,
    });

  const joueuseSelectionnee =
    joueuses.find(
      (joueuse) =>
        String(joueuse.id) ===
        String(formulaire.joueuseId)
    ) ?? null;

  const informationsEquipe =
    calculerInformationsEquipe({
      affectations,
      equipeId: formulaire.equipeId,
      saisonId: formulaire.saisonId,
    });

  const numeroSaisi =
    String(formulaire.numero ?? "").trim();

  const numeroDisponible =
    !numeroSaisi ||
    verifierNumeroDisponible({
      affectations,
      equipeId: formulaire.equipeId,
      saisonId: formulaire.saisonId,
      numero: numeroSaisi,
      affectationId: affectation?.id,
    });

    const formulaireValide =
  formulaire.saisonId &&
  formulaire.associationId &&
  formulaire.equipeId &&
  formulaire.joueuseId;
 
  function modifierChamp(champ, valeur) {
    setFormulaire((formulaireActuel) => ({
      ...formulaireActuel,
      [champ]: valeur,
    }));
  }

  function changerSaison(event) {
  setFormulaire((formulaireActuel) => ({
    ...formulaireActuel,
    saisonId: event.target.value,
    associationId: "",
    equipeId: "",
    joueuseId: "",
    numero: "",
    gardienne: false,
    capitaine: false,
    assistante: false,
  }));
}

  function changerAssociation(event) {
    setFormulaire((formulaireActuel) => ({
      ...formulaireActuel,
      associationId: event.target.value,
      equipeId: "",
      joueuseId: "",
    }));
  }

  function changerEquipe(event) {
    setFormulaire((formulaireActuel) => ({
      ...formulaireActuel,
      equipeId: event.target.value,
      joueuseId: "",
      numero: "",
      gardienne: false,
      capitaine: false,
      assistante: false,
    }));
  }

  function changerCapitaine(event) {
    const cochee = event.target.checked;

    setFormulaire((formulaireActuel) => ({
      ...formulaireActuel,
      capitaine: cochee,
      assistante: cochee
        ? false
        : formulaireActuel.assistante,
    }));
  }

  function changerAssistante(event) {
    const cochee = event.target.checked;

    setFormulaire((formulaireActuel) => ({
      ...formulaireActuel,
      assistante: cochee,
      capitaine: cochee
        ? false
        : formulaireActuel.capitaine,
    }));
  }

  function soumettreFormulaire(event) {
    event.preventDefault();

    enregistrer({
      saisonId: formulaire.saisonId,
      equipeId: formulaire.equipeId,
      joueuseId: formulaire.joueuseId,
      numero: String(
        formulaire.numero ?? ""
      ).trim(),
      gardienne: Boolean(
        formulaire.gardienne
      ),
      capitaine: Boolean(
        formulaire.capitaine
      ),
      assistante: Boolean(
        formulaire.assistante
      ),
      dateDebut:
        formulaire.dateDebut ?? "",
      dateFin:
        formulaire.dateFin ?? "",
      active: Boolean(formulaire.active),
      notes: String(
        formulaire.notes ?? ""
      ).trim(),
    });
  }

  return (
    <div
      className="modal-overlay"
      role="presentation"
    >
      <section
        className="modal-contenu affectation-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="affectation-modal-titre"
      >
        <div className="modal-entete">
          <h2 id="affectation-modal-titre">
            {affectation
              ? "Modifier l’affectation"
              : "Nouvelle affectation"}
          </h2>

          <button
            type="button"
            onClick={fermer}
            aria-label="Fermer"
          >
            ×
          </button>
        </div>

        <form onSubmit={soumettreFormulaire}>
          {erreurs?.length > 0 && (
            <div
              className="administration-message-erreur"
              role="alert"
            >
              <strong>
                L’affectation ne peut pas être
                enregistrée.
              </strong>

              <ul>
                {erreurs.map(
                  (erreur, index) => (
                    <li
                      key={`${erreur}-${index}`}
                    >
                      {erreur}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

          <fieldset>
            <legend>Contexte</legend>

            <label>
              Saison
              <select
                value={formulaire.saisonId}
                onChange={changerSaison}
                required
              >
                <option value="">
                  Sélectionner une saison
                </option>

                {saisons.map((saison) => (
                  <option
                    key={saison.id}
                    value={saison.id}
                  >
                    {obtenirNomSaison(saison)}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Association
              <select
                value={
                  formulaire.associationId
                }
                onChange={changerAssociation}
                required
              >
                <option value="">
                  Sélectionner une association
                </option>

                {associations.map(
                  (association) => (
                    <option
                      key={association.id}
                      value={association.id}
                    >
                      {obtenirNomAssociation(
                        association
                      )}
                    </option>
                  )
                )}
              </select>
            </label>

            <label>
              Équipe
              <select
                value={formulaire.equipeId}
                onChange={changerEquipe}
                disabled={
                  !formulaire.associationId
                }
                required
              >
                <option value="">
                  Sélectionner une équipe
                </option>

                {equipesDisponibles.map(
                  (equipe) => (
                    <option
                      key={equipe.id}
                      value={equipe.id}
                    >
                      {obtenirNomEquipe(equipe)}
                    </option>
                  )
                )}
              </select>
            </label>
          </fieldset>

          <fieldset>
            <legend>Joueuse</legend>

            <label>
              Joueuse
       <select
  value={formulaire.joueuseId}
  onChange={(event) => {
    const joueuseId = event.target.value;

    const joueuseSelectionnee =
      joueusesDisponibles.find(
        (joueuse) =>
          String(joueuse.id) ===
          String(joueuseId)
      );

    setFormulaire((formulaireActuel) => ({
      ...formulaireActuel,
      joueuseId,
      numero:
        joueuseSelectionnee?.numero ??
        joueuseSelectionnee?.numeroChandail ??
        "",
      gardienne: false,
      capitaine: false,
      assistante: false,
    }));
  }}
  disabled={
    !formulaire.saisonId ||
    !formulaire.equipeId
  }
  required
>
  <option value="">
    Sélectionner une joueuse
  </option>

  {joueusesDisponibles.map(
    (joueuse) => (
      <option
        key={
          joueuse.id ??
          joueuse.numeroInscription
        }
        value={joueuse.id}
      >
        {obtenirNomJoueuse(joueuse)}
      </option>
    )
  )}
</select>
            </label>

            {equipeSelectionnee &&
              joueusesDisponibles.length ===
                0 && (
                <p>
                  Aucune joueuse SportPlus ne
                  correspond à cette catégorie
                  pour la saison sélectionnée.
                </p>
              )}

            {joueuseSelectionnee && (
              <div className="affectation-joueuse-informations">
                <h3>
                  {obtenirNomJoueuse(
                    joueuseSelectionnee
                  )}
                </h3>

                <p>
                  <strong>
                    Date de naissance :
                  </strong>{" "}
                  {joueuseSelectionnee.dateNaissance ||
                    "Non précisée"}
                </p>

                <p>
                  <strong>
                    Catégorie SportPlus :
                  </strong>{" "}
                  {joueuseSelectionnee.categorie ||
                    "Non précisée"}
                </p>

                <p>
                  <strong>
                    Code :
                  </strong>{" "}
                  {joueuseSelectionnee.codeCategorie ||
                    "Non précisé"}
                </p>

                <p>
                  <strong>
                    Numéro d’inscription :
                  </strong>{" "}
                  {joueuseSelectionnee.numeroInscription ||
                    "Non précisé"}
                </p>
              </div>
            )}
          </fieldset>

          <fieldset>
            <legend>Affectation</legend>

            <label>
  Numéro de chandail
  <input
    type="text"
    inputMode="numeric"
    pattern="[0-9]*"
    value={formulaire.numero}
    onChange={(event) => {
      const valeurNumerique =
        event.target.value.replace(/\D/g, "");

      modifierChamp(
        "numero",
        valeurNumerique
      );
    }}
    />
</label>

            {numeroSaisi &&
              formulaire.equipeId &&
              formulaire.saisonId && (
                <p
                  className={
                    numeroDisponible
                      ? "validation-ok"
                      : "validation-erreur"
                  }
                >
                  {numeroDisponible
                    ? "✓ Numéro disponible"
                    : "✕ Numéro déjà utilisé dans cette équipe."}
                </p>
              )}

            <div className="affectation-roles">
              <label>
                <input
                  type="checkbox"
                  checked={
                    formulaire.gardienne
                  }
                  onChange={(event) =>
                    modifierChamp(
                      "gardienne",
                      event.target.checked
                    )
                  }
                />
                Gardienne
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={
                    formulaire.capitaine
                  }
                  onChange={
                    changerCapitaine
                  }
                />
                Capitaine
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={
                    formulaire.assistante
                  }
                  onChange={
                    changerAssistante
                  }
                />
                Assistante
              </label>
            </div>

            <label>
              Date de début
              <input
                type="date"
                value={
                  formulaire.dateDebut
                }
                onChange={(event) =>
                  modifierChamp(
                    "dateDebut",
                    event.target.value
                  )
                }
              />
            </label>

            <label>
              Date de fin
              <input
                type="date"
                value={formulaire.dateFin}
                onChange={(event) =>
                  modifierChamp(
                    "dateFin",
                    event.target.value
                  )
                }
              />
            </label>

            <label>
              <input
                type="checkbox"
                checked={formulaire.active}
                onChange={(event) =>
                  modifierChamp(
                    "active",
                    event.target.checked
                  )
                }
              />
              Affectation active
            </label>

            <label>
              Notes
              <textarea
                value={formulaire.notes}
                onChange={(event) =>
                  modifierChamp(
                    "notes",
                    event.target.value
                  )
                }
                rows="4"
              />
            </label>
          </fieldset>

          {equipeSelectionnee && (
            <fieldset>
              <legend>
                Informations de l’équipe
              </legend>

              <p>
                <strong>Équipe :</strong>{" "}
                {obtenirNomEquipe(
                  equipeSelectionnee
                )}
              </p>

              <p>
                <strong>
                  Joueuses actives :
                </strong>{" "}
                {
                  informationsEquipe.nombreJoueuses
                }
              </p>

              <p>
                <strong>
                  Gardiennes :
                </strong>{" "}
                {
                  informationsEquipe.nombreGardiennes
                }
              </p>

              <p>
                <strong>
                  Capitaines :
                </strong>{" "}
                {
                  informationsEquipe.nombreCapitaines
                }
              </p>

              <p>
                <strong>
                  Assistantes :
                </strong>{" "}
                {
                  informationsEquipe.nombreAssistantes
                }
              </p>

              <p>
                <strong>
                  Lettres utilisées :
                </strong>{" "}
                {
                  informationsEquipe.nombreLettres
                }{" "}
                / 3
              </p>

              <p>
                <strong>
                  Numéros utilisés :
                </strong>{" "}
                {informationsEquipe
                  .numerosUtilises.length > 0
                  ? informationsEquipe.numerosUtilises.join(
                      ", "
                    )
                  : "Aucun"}
              </p>
            </fieldset>
          )}

          <div className="modal-actions">
            <button
              type="button"
              onClick={fermer}
            >
              Annuler
            </button>

            <button
  type="submit"
  disabled={!formulaireValide}
>
  {affectation
    ? "Enregistrer les modifications"
    : "Créer l’affectation"}
</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default AffectationModal;