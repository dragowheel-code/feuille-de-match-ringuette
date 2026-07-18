export default function Evenements({
  evenements,
  supprimerEvenement,
}) {
  return (
    <section className="events">
      <h2>Événements</h2>

      {evenements.length === 0 ? (
        <p>Aucun événement pour le moment.</p>
      ) : (
        <ul>
          {evenements.map((event) => (
            <li key={event.id}>
              <span>
                {event.type} — {event.equipeNom} — Période{" "}
                {event.periode}

                {event.tempsTableau && (
                  <>
                    {" "}
                    — Tableau {event.tempsTableau}
                  </>
                )}

                {event.tempsCorrige && (
                  <>
                    {" "}
                    — Corrigé {event.tempsCorrige}
                  </>
                )}

                {event.type === "But" && (
                  <>
                    {" "}
                    — But #{event.buteuseNumero}{" "}
                    {event.buteuseNom}

                    {event.assistante1Numero &&
                      ` — A1 #${event.assistante1Numero} ${event.assistante1Nom}`}

                    {event.assistante2Numero &&
                      ` — A2 #${event.assistante2Numero} ${event.assistante2Nom}`}
                  </>
                )}

                {event.type === "Punition" && (
                  <>
                    {" "}
                    — #{event.joueuseNumero}{" "}
                    {event.joueuseNom}
                    {" "}
                    — {event.punition}
                    {" "}
                    —{" "}
                    {event.dureeTotale ??
                      event.dureeParPortion ??
                      event.duree}{" "}
                    min
                  </>
                )}

                {event.type === "Tir de barrage" && (
                  <>
                    {" "}
                    — #{event.joueuseNumero}{" "}
                    {event.joueuseNom}
                    {" "}
                    — {event.reussi ? "Réussi" : "Raté"}
                  </>
                )}

                {event.type ===
                  "Changement gardienne" && (
                  <>
                    {" "}
                    — Temps {event.tempsCorrige}
                  </>
                )}

                {event.type === "Temps mort" && (
                  <> — Temps mort utilisé</>
                )}
              </span>

              <button
                className="delete-button"
                onClick={() =>
                  supprimerEvenement(event.id)
                }
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}