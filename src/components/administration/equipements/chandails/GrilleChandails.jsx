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

  return (
    <section className="grille-chandails">
      {taillesTriees.map((taille) => {
        const ensembles =
          ensemblesParTaille[taille];

        return (
          <section
            key={taille}
            className="groupe-taille"
          >
            <h2>{taille}</h2>

            <div className="groupe-cartes">
              {ensembles.map((ensemble) => {
                const attributionActive =
                  attributionsChandails.find(
                    (attribution) =>
                      String(
                        attribution.ensembleId
                      ) ===
                        String(ensemble.id) &&
                      attribution.active === true
                  ) ?? null;

                return (
                  <CarteEnsembleChandails
                    key={ensemble.id}
                    ensemble={ensemble}
                    attributionActive={
                      attributionActive
                    }
                    selectionne={
                      ensembleSelectionne?.id ===
                      ensemble.id
                    }
                    selectionner={
                      selectionnerEnsemble
                    }
                  />
                );
              })}
            </div>
          </section>
        );
      })}
    </section>
  );
}

export default GrilleChandails;