import {
  formaterTempsPendantSaisie,
} from "../utils/temps";

export default function ButModal({
  ouverte,
  equipeNomPourBut,
  tempsTableau,
  setTempsTableau,
  calculerTempsCorrige,
  numeroButeuse,
  setNumeroButeuse,
  assistante1,
  setAssistante1,
  assistante2,
  setAssistante2,
  joueusesDisponibles,
  confirmerBut,
  fermer,
}) {
  if (!ouverte) {
    return null;
  }

  const selections = [
    numeroButeuse,
    assistante1,
    assistante2,
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
      nouvellesSelections.length < 3
    ) {
      nouvellesSelections.push(
        numero
      );
    }

    setNumeroButeuse(
      nouvellesSelections[0] ?? ""
    );

    setAssistante1(
      nouvellesSelections[1] ?? ""
    );

    setAssistante2(
      nouvellesSelections[2] ?? ""
    );
  }

  function obtenirJoueuseParNumero(
    numero
  ) {
    if (!numero) {
      return null;
    }

    return (
      joueusesDisponibles.find(
        (joueuse) =>
          String(joueuse.numero) ===
          String(numero)
      ) ?? null
    );
  }

  const buteuse =
    obtenirJoueuseParNumero(
      numeroButeuse
    );

  const premiereAssistante =
    obtenirJoueuseParNumero(
      assistante1
    );

  const deuxiemeAssistante =
    obtenirJoueuseParNumero(
      assistante2
    );

  const joueusesTriees =
    [...joueusesDisponibles].sort(
      (a, b) =>
        Number(a.numero) -
        Number(b.numero)
    );

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>
          Ajouter un but —{" "}
          {equipeNomPourBut}
        </h2>

        <label>
          Temps affiché au tableau
        </label>

        <input
  value={tempsTableau}
  onChange={(e) =>
    setTempsTableau(
      formaterTempsPendantSaisie(
        e.target.value
      )
    )
  }
  placeholder="Exemple : 832 → 8:32"
  inputMode="numeric"
  autoFocus
/>

        <p>
          Temps corrigé :{" "}
          <strong>
            {calculerTempsCorrige(
              tempsTableau
            ) || "--:--"}
          </strong>
        </p>

        <div className="selection-but-resume">
          <div>
            <strong>
              Marqueuse :
            </strong>{" "}
            {buteuse
              ? `#${buteuse.numero} — ${buteuse.nom}`
              : "—"}
          </div>

          <div>
            <strong>
              Assistante 1 :
            </strong>{" "}
            {premiereAssistante
              ? `#${premiereAssistante.numero} — ${premiereAssistante.nom}`
              : "—"}
          </div>

          <div>
            <strong>
              Assistante 2 :
            </strong>{" "}
            {deuxiemeAssistante
              ? `#${deuxiemeAssistante.numero} — ${deuxiemeAssistante.nom}`
              : "—"}
          </div>
        </div>

        <p>
          Cliquez les numéros dans
          l'ordre : marqueuse, puis
          assistantes.
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
                        ? "B"
                        : indexSelection ===
                          1
                        ? "A1"
                        : "A2"}
                    </small>
                  )}
                </button>
              );
            }
          )}
        </div>

        <div className="modal-actions">
          <button
            onClick={confirmerBut}
          >
            Confirmer le but
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