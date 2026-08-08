import {
  obtenirStatutEnsembleChandails,
} from "../../../../domain/equipements";

function ResumeInventaireChandails({
  ensemblesChandails = [],
  attributionsChandails = [],
  filtreActif = "tous",
  changerFiltre,
}) {
  const resume = {
    disponible: 0,
    attribue: 0,
    attention: 0,
    incomplet: 0,
    perdu: 0,
  };

  function obtenirStatut(ensemble) {
    const attributionActive =
      attributionsChandails.some(
        (attribution) =>
          String(attribution.ensembleId) ===
            String(ensemble.id) &&
          attribution.active === true
      );

    if (attributionActive) {
      return "attribue";
    }

    return obtenirStatutEnsembleChandails(
      ensemble
    );
  }

  ensemblesChandails.forEach(
    (ensemble) => {
      const statut =
        obtenirStatut(ensemble);

      if (
        Object.prototype.hasOwnProperty.call(
          resume,
          statut
        )
      ) {
        resume[statut]++;
      }
    }
  );

  function selectionnerFiltre(
    statut
  ) {
    if (!changerFiltre) {
      return;
    }

    if (filtreActif === statut) {
      changerFiltre("tous");
      return;
    }

    changerFiltre(statut);
  }

  return (
    <section className="resume-inventaire">
      <button
        type="button"
        className={`resume-carte disponible ${
          filtreActif === "disponible"
            ? "resume-carte-active"
            : ""
        }`}
        onClick={() =>
          selectionnerFiltre(
            "disponible"
          )
        }
      >
        <span>🟢</span>

        <strong>
          {resume.disponible}
        </strong>

        <p>Disponibles</p>
      </button>

      <button
        type="button"
        className={`resume-carte attribue ${
          filtreActif === "attribue"
            ? "resume-carte-active"
            : ""
        }`}
        onClick={() =>
          selectionnerFiltre(
            "attribue"
          )
        }
      >
        <span>🔵</span>

        <strong>
          {resume.attribue}
        </strong>

        <p>Attribués</p>
      </button>

      <button
        type="button"
        className={`resume-carte attention ${
          filtreActif === "attention"
            ? "resume-carte-active"
            : ""
        }`}
        onClick={() =>
          selectionnerFiltre(
            "attention"
          )
        }
      >
        <span>🟠</span>

        <strong>
          {resume.attention}
        </strong>

        <p>À réparer</p>
      </button>

      <button
        type="button"
        className={`resume-carte incomplet ${
          filtreActif === "incomplet"
            ? "resume-carte-active"
            : ""
        }`}
        onClick={() =>
          selectionnerFiltre(
            "incomplet"
          )
        }
      >
        <span>🔴</span>

        <strong>
          {resume.incomplet}
        </strong>

        <p>Incomplets</p>
      </button>

      <button
        type="button"
        className={`resume-carte perdu ${
          filtreActif === "perdu"
            ? "resume-carte-active"
            : ""
        }`}
        onClick={() =>
          selectionnerFiltre(
            "perdu"
          )
        }
      >
        <span>⚫</span>

        <strong>
          {resume.perdu}
        </strong>

        <p>Perdus</p>
      </button>
    </section>
  );
}

export default ResumeInventaireChandails;