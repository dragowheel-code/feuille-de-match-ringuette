import {
  obtenirStatutEnsembleChandails,
} from "../../../../domain/equipements";

function CarteEnsembleChandails({
  ensemble,
  attributionActive,
  selectionne,
  selectionner,
}) {
  const statutPhysique =
    obtenirStatutEnsembleChandails(
      ensemble
    );

  const statut =
    attributionActive
      ? "attribue"
      : statutPhysique;

  return (
    <button
      type="button"
      className={`carte-ensemble-chandails
        carte-ensemble-${statut}
        ${
          selectionne
            ? "carte-ensemble-selectionnee"
            : ""
        }
      `}
      onClick={() =>
        selectionner(ensemble)
      }
    >
      <strong>{ensemble.numero}</strong>

      <span>{ensemble.taille}</span>
    </button>
  );
}

export default CarteEnsembleChandails;