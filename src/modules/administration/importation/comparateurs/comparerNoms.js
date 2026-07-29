import { normaliserNom } from "./normaliserNom";

export function comparerNoms(nom1, nom2) {
  const nomNormalise1 = normaliserNom(nom1);
  const nomNormalise2 = normaliserNom(nom2);

  if (!nomNormalise1 || !nomNormalise2) {
    return {
      identiques: false,
      confiance: 0,
      nomNormalise1,
      nomNormalise2,
    };
  }

  const identiques = nomNormalise1 === nomNormalise2;

  let confiance = 0;

  if (identiques) {
    confiance = 100;
  } else if (
    nomNormalise1.includes(nomNormalise2) ||
    nomNormalise2.includes(nomNormalise1)
  ) {
    confiance = 90;
  }

  return {
    identiques,
    confiance,
    nomNormalise1,
    nomNormalise2,
  };
}