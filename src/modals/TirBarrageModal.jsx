export default function TirBarrageModal({
  ouverte,
  equipeTirBarrage,
  setEquipeTirBarrage,
  matchInfo,
  joueuseTirBarrage,
  setJoueuseTirBarrage,
  joueusesTirBarrageDisponibles,
  tirBarrageReussi,
  setTirBarrageReussi,
  confirmerTirBarrage,
  fermer,
}) {
  if (!ouverte) {
    return null;
  }

  function cliquerJoueuse(joueuse) {
    const numero =
      String(joueuse.numero);

    if (
      String(joueuseTirBarrage) ===
      numero
    ) {
      setJoueuseTirBarrage("");
      return;
    }

    setJoueuseTirBarrage(
      numero
    );
  }

  function changerEquipe(
    nouvelleEquipe
  ) {
    setEquipeTirBarrage(
      nouvelleEquipe
    );

    setJoueuseTirBarrage("");
  }

  const joueuseSelectionnee =
    joueusesTirBarrageDisponibles.find(
      (joueuse) =>
        String(joueuse.numero) ===
        String(joueuseTirBarrage)
    ) ?? null;

  const joueusesTriees =
    [...joueusesTirBarrageDisponibles].sort(
      (a, b) =>
        Number(a.numero) -
        Number(b.numero)
    );

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>
          Ajouter un tir de barrage
        </h2>

        <label>Équipe</label>

        <select
          value={equipeTirBarrage}
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

        <div className="selection-tir-barrage-resume">
          <strong>
            Joueuse :
          </strong>{" "}
          {joueuseSelectionnee
            ? `#${joueuseSelectionnee.numero} — ${joueuseSelectionnee.nom}`
            : "—"}
        </div>

        <p>
          Cliquez sur le numéro de la
          joueuse qui effectue le tir.
        </p>

        <div className="grille-numeros-joueuses">
          {joueusesTriees.map(
            (joueuse) => {
              const selectionnee =
                String(
                  joueuse.numero
                ) ===
                String(
                  joueuseTirBarrage
                );

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
                      Tir
                    </small>
                  )}
                </button>
              );
            }
          )}
        </div>

        <label>
          <input
            type="checkbox"
            checked={
              tirBarrageReussi
            }
            onChange={(e) =>
              setTirBarrageReussi(
                e.target.checked
              )
            }
          />

          Tir réussi
        </label>

        <div className="modal-actions">
          <button
            onClick={
              confirmerTirBarrage
            }
          >
            Confirmer
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