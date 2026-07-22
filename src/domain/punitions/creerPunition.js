import { calculerCategories } from "./calculs/calculerCategories";
import { calculerDureeTotale } from "./calculs/calculerDureeTotale";
import { calculerLibellePunition } from "./calculs/calculerLibellePunition";
import { calculerTempsFinPrevue } from "./calculs/calculerTempsFinPrevue";
import { creerPenalite } from "./penalite";
import { creerPortionsPunition } from "./creerPortionsPunition";

export function creerPunition({
  equipe,
  equipeNom,
  periode,
  tempsTableau,
  tempsCorrige,
  joueuseNumero,
  joueuseNom,
  purgeeParNumero,
  penalites,
}) {
 
  const tempsSortie = tempsCorrige;

  const penalitesNormalisees = penalites.map(
  (penalite) =>
    creerPenalite({
      libelle: penalite.libelle,
      code: penalite.code,
      duree: penalite.duree,
      lettre: penalite.lettre ?? null,
      categorie: penalite.categorie,
      annulableParBut:
        penalite.annulableParBut === true,
    })
);

  penalitesNormalisees.map((p) => ({
    libelle: p.libelle,
    code: p.code,
    lettre: p.lettre,
  }))

  const portions = creerPortionsPunition(
    tempsSortie,
    penalitesNormalisees
  );

  const tempsFinPrevue = calculerTempsFinPrevue(
    portions,
    tempsSortie
  );

  const dureeTotale = calculerDureeTotale(
    penalitesNormalisees
  );

  const categories = calculerCategories(
    penalitesNormalisees
  );

  return {
    equipe,
    equipeNom,
    periode,
    tempsTableau,
    tempsCorrige,

    joueuseNumero,
    joueuseNom,
    purgeeParNumero,

    penalites: penalitesNormalisees,

    punition: calculerLibellePunition(
      penalitesNormalisees
    ),

    categorie: categories.join(" + "),

    nombrePortions: portions.length,

    // Conservé temporairement pour compatibilité
    dureeParPortion:
      penalitesNormalisees[0]?.duree || 0,

    dureeTotale,

    tempsSortie,
    tempsDebut: tempsSortie,
    tempsFinPrevue,
    tempsRetour: tempsFinPrevue,

    annulableParBut: penalitesNormalisees.some(
      (penalite) =>
        penalite.annulableParBut === true
    ),

    annuleeParBut: false,

    portions,
  };
}