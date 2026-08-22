import { useState } from "react";

import CarteEnsembleChandails from "./CarteEnsembleChandails";

import {
  comparerTailles,
} from "../../../../constants/tailles";

function GrilleChandails({
  ensemblesParTaille,
  ensembleSelectionne,
  selectionnerEnsemble,
  attributionsChandails = [],
}) {
  const taillesTriees = Object.keys(
    ensemblesParTaille
  ).sort(comparerTailles);

  const [
  taillesFermees,
  setTaillesFermees,
] = useState(
  () => new Set(taillesTriees)
);

  function basculerTaille(taille) {
    setTaillesFermees(
      (precedentes) => {
        const nouvelles =
          new Set(precedentes);

        if (
          nouvelles.has(taille)
        ) {
          nouvelles.delete(taille);
        } else {
          nouvelles.add(taille);
        }

        return nouvelles;
      }
    );
  }

  function tailleEstOuverte(
    taille
  ) {
    return !taillesFermees.has(
      taille
    );
  }

  return (
    <section className="grille-chandails">
      {taillesTriees.map(
        (taille) => {
          const ensembles =
            ensemblesParTaille[
              taille
            ];

          const ouverte =
            tailleEstOuverte(
              taille
            );

          return (
            <section
              key={taille}
              className="groupe-taille"
            >
              <button
                type="button"
                className="groupe-taille-entete"
                onClick={() =>
                  basculerTaille(
                    taille
                  )
                }
              >
                <span>
                  {ouverte
                    ? "▼"
                    : "▶"}
                </span>

                <strong>
                  {taille}
                </strong>

                <span>
                  {ensembles.length}{" "}
                  ensemble
                  {ensembles.length >
                  1
                    ? "s"
                    : ""}
                </span>
              </button>

              {ouverte && (
                <div className="groupe-cartes">
                  {ensembles.map(
                    (ensemble) => {
                      const attributionActive =
                        attributionsChandails.find(
                          (
                            attribution
                          ) =>
                            String(
                              attribution.ensembleId
                            ) ===
                              String(
                                ensemble.id
                              ) &&
                            attribution.active ===
                              true
                        ) ?? null;

                      return (
                        <CarteEnsembleChandails
                          key={
                            ensemble.id
                          }
                          ensemble={
                            ensemble
                          }
                          attributionActive={
                            attributionActive
                          }
                          selectionne={
                            String(
                              ensembleSelectionne
                                ?.id
                            ) ===
                            String(
                              ensemble.id
                            )
                          }
                          selectionner={
                            selectionnerEnsemble
                          }
                        />
                      );
                    }
                  )}
                </div>
              )}
            </section>
          );
        }
      )}
    </section>
  );
}

export default GrilleChandails;