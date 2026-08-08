function HistoriqueChandailModal({
  ouverte,
  fermer,

  ensemble,

  historique = [],
  joueuses = [],
  saisons = [],
}) {
  if (!ouverte) {
    return null;
  }

  function obtenirNomJoueuse(
    joueuseId
  ) {
    const joueuse =
      joueuses.find(
        (element) =>
          String(element.id) ===
          String(joueuseId)
      );

    return (
      joueuse?.nomComplet ??
      "Joueuse introuvable"
    );
  }

  function obtenirNomSaison(
    saisonId
  ) {
    const saison =
      saisons.find(
        (element) =>
          String(element.id) ===
          String(saisonId)
      );

    return (
      saison?.nom ??
      "Saison inconnue"
    );
  }

  function obtenirLibelleFin(
    attribution
  ) {
    if (
      attribution.typeFin ===
      "LIBERATION"
    ) {
      return "Libéré";
    }

    if (attribution.dateRetour) {
      return "Retourné";
    }

    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-contenu">
        <header className="modal-entete">
          <div>
            <h2>
              Historique de
              l'ensemble #
              {ensemble?.numero ?? ""}
            </h2>

            <p>
              Taille :{" "}
              <strong>
                {ensemble?.taille ?? ""}
              </strong>
            </p>
          </div>

          <button
            type="button"
            onClick={fermer}
          >
            ×
          </button>
        </header>

        {historique.length === 0 ? (
          <p>
            Aucun historique
            disponible pour cet
            ensemble.
          </p>
        ) : (
          <div className="historique-chandail">
            {historique.map(
              (attribution) => {
                const libelleFin =
                  obtenirLibelleFin(
                    attribution
                  );

                return (
                  <section
                    key={
                      attribution.id
                    }
                    className="historique-chandail-entree"
                  >
                    <h3>
                      {obtenirNomSaison(
                        attribution.saisonId
                      )}
                    </h3>

                    <p>
                      <strong>
                        Joueuse :
                      </strong>{" "}
                      {obtenirNomJoueuse(
                        attribution.joueuseId
                      )}
                    </p>

                    <p>
                      <strong>
                        Attribué :
                      </strong>{" "}
                      {
                        attribution.dateAttribution
                      }
                    </p>

                    {libelleFin &&
                      attribution.dateRetour && (
                        <p>
                          <strong>
                            {libelleFin} :
                          </strong>{" "}
                          {
                            attribution.dateRetour
                          }
                        </p>
                      )}

                    {attribution.active && (
                      <p>
                        <strong>
                          Statut :
                        </strong>{" "}
                        Attribution active
                      </p>
                    )}

                    {attribution.commentaire && (
                      <p>
                        <strong>
                          Commentaire :
                        </strong>{" "}
                        {
                          attribution.commentaire
                        }
                      </p>
                    )}
                  </section>
                );
              }
            )}
          </div>
        )}

        <div className="modal-actions">
          <button
            type="button"
            onClick={fermer}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}

export default HistoriqueChandailModal;