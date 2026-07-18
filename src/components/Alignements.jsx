import CouleurApercu from "./CouleurApercu";

export default function Alignements({
  joueuses,
  matchInfo,
  setMatchInfo,
  equipeLocaleData,
  equipeVisiteuseData,
  localOuvert,
  setLocalOuvert,
  visiteurOuvert,
  setVisiteurOuvert,
  ouvrirFenetreRemplacante,
  changerPresence,
  changerSuspension,
  changerRoleJoueuse,
}) {
  function afficherJoueuses(equipeNom) {
    return joueuses
      .filter((joueuse) => joueuse.equipe === equipeNom)
      .map((joueuse) => (
        <div className="roster-row" key={joueuse.id}>
          <div className="roster-player">
            #{joueuse.numero} {joueuse.nom}
            {joueuse.remplacante && " — Remplaçante"}
          </div>

          <div className="roster-options">
            <label>
              <input
                type="checkbox"
                checked={joueuse.absente || false}
                onChange={() => changerPresence(joueuse.id)}
              />
              Abs.
            </label>

            <label>
              <input
                type="checkbox"
                checked={joueuse.suspendue || false}
                onChange={() => changerSuspension(joueuse.id)}
              />
              Susp.
            </label>

            <label>
              <input
                type="checkbox"
                checked={joueuse.gardienne || false}
                onChange={() =>
                  changerRoleJoueuse(joueuse.id, "gardienne")
                }
              />
              Gard.
            </label>

            <label>
              <input
                type="checkbox"
                checked={joueuse.capitaine || false}
                onChange={() =>
                  changerRoleJoueuse(joueuse.id, "capitaine")
                }
              />
              Cap.
            </label>

            <label>
              <input
                type="checkbox"
                checked={joueuse.assistanteCapitaine || false}
                onChange={() =>
                  changerRoleJoueuse(
                    joueuse.id,
                    "assistanteCapitaine"
                  )
                }
              />
              Ass.
            </label>
          </div>
        </div>
      ));
  }

  return (
    <section className="events">
      <h2>Alignements</h2>

      {joueuses.length === 0 ? (
        <p>Importe un fichier Excel pour afficher les alignements.</p>
      ) : (
        <div className="rosters">
          <div>
            <button
              className="accordion-title"
              onClick={() => setLocalOuvert(!localOuvert)}
            >
              {localOuvert ? "▼" : "▶"}{" "}
              {matchInfo.equipeLocale || "Équipe locale"} — Local
            </button>

            {localOuvert && (
              <>
                <div className="alignement-actions">
  <button
    onClick={() =>
      ouvrirFenetreRemplacante(matchInfo.equipeLocale)
    }
  >
    Ajouter remplaçante
  </button>

  <div className="jersey-selector">
    <label>Couleur du chandail</label>

    <select
      value={matchInfo.couleurLocaleChoisie}
      onChange={(e) =>
        setMatchInfo({
          ...matchInfo,
          couleurLocaleChoisie: e.target.value,
        })
      }
    >
      <option value="primaire">
        {equipeLocaleData?.nomCouleurPrimaire || "Primaire"}
      </option>

      <option value="secondaire">
        {equipeLocaleData?.nomCouleurSecondaire || "Secondaire"}
      </option>
    </select>
  </div>
</div>

                {equipeLocaleData && (
                  <div>
                    <CouleurApercu
                      nom={equipeLocaleData.nomCouleurPrimaire}
                      code={equipeLocaleData.couleurPrimaire}
                    />

                    <CouleurApercu
                      nom={equipeLocaleData.nomCouleurSecondaire}
                      code={equipeLocaleData.couleurSecondaire}
                    />
                  </div>
                )}

                {afficherJoueuses(matchInfo.equipeLocale)}
              </>
            )}
          </div>

          <div>
            <button
              className="accordion-title"
              onClick={() => setVisiteurOuvert(!visiteurOuvert)}
            >
              {visiteurOuvert ? "▼" : "▶"}{" "}
              {matchInfo.equipeVisiteuse || "Équipe visiteuse"} — Visiteur
            </button>

            {visiteurOuvert && (
              <>
                <div className="alignement-actions">
  <button
    onClick={() =>
      ouvrirFenetreRemplacante(matchInfo.equipeVisiteuse)
    }
  >
    Ajouter remplaçante
  </button>

  <div className="jersey-selector">
    <label>Couleur du chandail</label>

    <select
      value={matchInfo.couleurVisiteuseChoisie}
      onChange={(e) =>
        setMatchInfo({
          ...matchInfo,
          couleurVisiteuseChoisie: e.target.value,
        })
      }
    >
      <option value="primaire">
        {equipeVisiteuseData?.nomCouleurPrimaire || "Primaire"}
      </option>

      <option value="secondaire">
        {equipeVisiteuseData?.nomCouleurSecondaire || "Secondaire"}
      </option>
    </select>
  </div>
</div>

{equipeVisiteuseData && (
  <div>
    <CouleurApercu
      nom={equipeVisiteuseData.nomCouleurPrimaire}
      code={equipeVisiteuseData.couleurPrimaire}
    />

    <CouleurApercu
      nom={equipeVisiteuseData.nomCouleurSecondaire}
      code={equipeVisiteuseData.couleurSecondaire}
    />
  </div>
)}

                {afficherJoueuses(matchInfo.equipeVisiteuse)}
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}