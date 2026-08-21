import CouleurApercu from "./CouleurApercu";
import { mettreAJourMatch } from "../domain/match";
import { ROLES_JOUEUSE } from "../domain/joueuses";

export default function Alignements({
  joueuses,

  joueusesEquipeLocaleAdministration,
  joueusesEquipeVisiteuseAdministration,

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

  function modifierMatch(modifications) {
  setMatchInfo(
    mettreAJourMatch(matchInfo, modifications)
  );
}

  function afficherJoueuses(
  joueusesEquipeAdministration
) {
  return joueusesEquipeAdministration.map(
    (joueuseAdministration) => {
      const joueuseMatch =
        joueuses.find(
          (joueuse) =>
            String(joueuse.id) ===
            String(
              joueuseAdministration.id
            )
        );

      const joueuse =
        joueuseMatch ??
        joueuseAdministration;

      return (
        <div
          className="roster-row"
          key={joueuse.id}
        >
          <div className="roster-player">
            #{joueuse.numero}{" "}
            {joueuse.nom ??
              joueuse.nomComplet}

            {joueuse.remplacante &&
              " — Remplaçante"}
          </div>

          <div className="roster-options">
            <label>
              <input
                type="checkbox"
                checked={
                  Boolean(
                    joueuse.absente
                  )
                }
                onChange={() =>
  changerPresence(joueuse)
}
              />
              Abs.
            </label>

            <label>
              <input
                type="checkbox"
                checked={
                  Boolean(
                    joueuse.suspendue
                  )
                }
                onChange={() =>
  changerSuspension(joueuse)
}
              />
              Susp.
            </label>

            <label>
              <input
                type="checkbox"
                checked={
                  Boolean(
                    joueuse.gardienne
                  )
                }
                onChange={() =>
  changerRoleJoueuse(
    joueuse,
    ROLES_JOUEUSE.GARDIENNE
  )
}
              />
              Gard.
            </label>

            <label>
              <input
                type="checkbox"
                checked={
                  Boolean(
                    joueuse.capitaine
                  )
                }
                onChange={() =>
  changerRoleJoueuse(
    joueuse,
    ROLES_JOUEUSE.CAPITAINE
  )
}
              />
              Cap.
            </label>

            <label>
              <input
                type="checkbox"
                checked={
                  Boolean(
                    joueuse.assistanteCapitaine
                  )
                }
                onChange={() =>
  changerRoleJoueuse(
    joueuse,
    ROLES_JOUEUSE.ASSISTANTE_CAPITAINE
  )
}
              />
              Ass.
            </label>
          </div>
        </div>
      );
    }
  );
}

  return (
    <section className="events">
      <h2>Alignements</h2>

      {joueusesEquipeLocaleAdministration.length ===
  0 &&
joueusesEquipeVisiteuseAdministration.length ===
  0 ? (
  <p>
    Sélectionne les équipes dans la
    configuration du match pour afficher
    les alignements.
  </p>
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
  modifierMatch({
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

                {afficherJoueuses(
  joueusesEquipeLocaleAdministration
)}
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
  modifierMatch({
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

                {afficherJoueuses(
  joueusesEquipeVisiteuseAdministration
)}
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}