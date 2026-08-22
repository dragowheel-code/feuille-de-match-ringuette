import PenaliteForm from "../components/PenaliteForm";
import {
  formaterTempsPendantSaisie,
} from "../utils/temps";

export default function PunitionModal({
  ouverte,
  equipePunition,
  setEquipePunition,
  matchInfo,
  penalites,
  setPenalites,
  tempsPunitionTableau,
  setTempsPunitionTableau,
  tempsCorrige,
  joueusePunition,
  setJoueusePunition,
  joueusePurgeePar,
  setJoueusePurgeePar,
  joueusesPunitionDisponibles,
  nombrePenalites,
  setNombrePenalites,
  confirmerPunition,
  fermer,
}) {
  if (!ouverte) {
    return null;
  }

  const selections = [
    joueusePunition,
    joueusePurgeePar,
  ].filter(Boolean);

  function cliquerJoueuse(joueuse) {
    const numero =
      String(joueuse.numero);

    const nouvellesSelections =
      [...selections];

    const indexExistant =
      nouvellesSelections.findIndex(
        (selection) =>
          String(selection) === numero
      );

    if (indexExistant >= 0) {
      nouvellesSelections.splice(
        indexExistant,
        1
      );
    } else if (
      nouvellesSelections.length < 2
    ) {
      nouvellesSelections.push(
        numero
      );
    }

    setJoueusePunition(
      nouvellesSelections[0] ?? ""
    );

    setJoueusePurgeePar(
      nouvellesSelections[1] ?? ""
    );
  }

  function obtenirJoueuseParNumero(
    numero
  ) {
    if (!numero) {
      return null;
    }

    return (
      joueusesPunitionDisponibles.find(
        (joueuse) =>
          String(joueuse.numero) ===
          String(numero)
      ) ?? null
    );
  }

  const joueusePunitionSelectionnee =
    obtenirJoueuseParNumero(
      joueusePunition
    );

  const joueusePurgeeParSelectionnee =
    obtenirJoueuseParNumero(
      joueusePurgeePar
    );

  const joueusesTriees =
    [...joueusesPunitionDisponibles].sort(
      (a, b) =>
        Number(a.numero) -
        Number(b.numero)
    );

  function changerEquipe(
    nouvelleEquipe
  ) {
    setEquipePunition(
      nouvelleEquipe
    );

    setJoueusePunition("");
    setJoueusePurgeePar("");
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>
          Ajouter une punition
        </h2>

        <label>Équipe</label>

        <select
          value={equipePunition}
          onChange={(e) =>
            changerEquipe(
              e.target.value
            )
          }
        >
          <option value="Local">
            {matchInfo.equipeLocale ||
              "Local"}
          </option>

          <option value="Visiteur">
            {matchInfo.equipeVisiteuse ||
              "Visiteur"}
          </option>
        </select>

        <label>
          Temps affiché au tableau
        </label>

        <input
  value={tempsPunitionTableau}
  onChange={(e) =>
    setTempsPunitionTableau(
      formaterTempsPendantSaisie(
        e.target.value
      )
    )
  }
  placeholder="Exemple : 832 → 8:32"
  inputMode="numeric"
/>

        <p>
          Temps corrigé :{" "}
          <strong>
            {tempsCorrige ||
              "--:--"}
          </strong>
        </p>

        <div className="selection-punition-resume">
          <div>
            <strong>
              Joueuse punie :
            </strong>{" "}
            {joueusePunitionSelectionnee
              ? `#${joueusePunitionSelectionnee.numero} — ${joueusePunitionSelectionnee.nom}`
              : "—"}
          </div>

          <div>
            <strong>
              Purgée par :
            </strong>{" "}
            {joueusePurgeeParSelectionnee
              ? `#${joueusePurgeeParSelectionnee.numero} — ${joueusePurgeeParSelectionnee.nom}`
              : "Même joueuse / aucune"}
          </div>
        </div>

        <p>
          Cliquez d'abord le numéro
          de la joueuse punie, puis
          celui de la joueuse qui
          purge si nécessaire.
        </p>

        <div className="grille-numeros-joueuses">
          {joueusesTriees.map(
            (joueuse) => {
              const numero =
                String(
                  joueuse.numero
                );

              const indexSelection =
                selections.findIndex(
                  (selection) =>
                    String(
                      selection
                    ) === numero
                );

              const selectionnee =
                indexSelection >= 0;

              return (
                <button
                  key={joueuse.id}
                  type="button"
                  className={
                    selectionnee
                      ? "numero-joueuse selectionne"
                      : "numero-joueuse"
                  }
                  onClick={() =>
                    cliquerJoueuse(
                      joueuse
                    )
                  }
                >
                  <strong>
                    #{joueuse.numero}
                  </strong>

                  {selectionnee && (
                    <small>
                      {indexSelection ===
                      0
                        ? "P"
                        : "PP"}
                    </small>
                  )}
                </button>
              );
            }
          )}
        </div>

        <label>
          Pénalités imposées
        </label>

        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="nombrePenalites"
              checked={
                nombrePenalites ===
                1
              }
              onChange={() =>
                setNombrePenalites(
                  1
                )
              }
            />
            1 pénalité
          </label>

          <label>
            <input
              type="radio"
              name="nombrePenalites"
              checked={
                nombrePenalites ===
                2
              }
              onChange={() => {
                setNombrePenalites(
                  2
                );

                setPenalites(
                  (
                    anciennesPenalites
                  ) => {
                    if (
                      anciennesPenalites.length >=
                      2
                    ) {
                      return anciennesPenalites;
                    }

                    return [
                      ...anciennesPenalites,
                      {
                        libelle:
                          "ACCROCHER / HOOKING",
                        duree: 2,
                      },
                    ];
                  }
                );
              }}
            />
            2 pénalités
          </label>
        </div>

        <PenaliteForm
          titre="Pénalité 1"
          penalite={
            penalites[0]
          }
          onChange={(
            nouvellePenalite
          ) => {
            const nouvellesPenalites =
              [...penalites];

            nouvellesPenalites[0] =
              nouvellePenalite;

            setPenalites(
              nouvellesPenalites
            );
          }}
          setNombrePenalites={
            setNombrePenalites
          }
        />

        {nombrePenalites ===
          2 && (
          <PenaliteForm
            titre="Pénalité 2"
            penalite={
              penalites[1] ?? {
                libelle:
                  "ACCROCHER / HOOKING",
                duree: 2,
              }
            }
            onChange={(
              nouvellePenalite
            ) => {
              const nouvellesPenalites =
                [...penalites];

              while (
                nouvellesPenalites.length <
                2
              ) {
                nouvellesPenalites.push({
                  libelle:
                    "ACCROCHER / HOOKING",
                  duree: 2,
                });
              }

              nouvellesPenalites[1] =
                nouvellePenalite;

              setPenalites(
                nouvellesPenalites
              );
            }}
          />
        )}

        <div className="modal-actions">
          <button
            onClick={
              confirmerPunition
            }
          >
            Confirmer la punition
          </button>

          <button
            className="cancel-button"
            onClick={fermer}
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}