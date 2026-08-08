import { obtenirAttributionActive } from "./obtenirAttributionActive";

export function obtenirResumeAttribution({
  ensemble,
  attributions = [],
  joueuses = [],
}) {
  const attribution =
    obtenirAttributionActive(
      ensemble?.id,
      attributions
    );

  if (!attribution) {
    return {
      attribue: false,
      attribution: null,
      joueuse: null,
    };
  }

  const joueuse =
    joueuses.find(
      (joueuse) =>
        String(joueuse.id) ===
        String(attribution.joueuseId)
    ) ?? null;

  return {
    attribue: true,
    attribution,
    joueuse,
  };
}