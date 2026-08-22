export function normaliserCategorie(
  categorie = ""
) {
  const valeur =
    String(categorie)
      .trim();

  const valeurMinuscule =
    valeur.toLowerCase();

  if (
    valeurMinuscule === "u8" ||
    valeurMinuscule === "moustique"
  ) {
    return "Moustique";
  }

  if (
    valeurMinuscule === "u10" ||
    valeurMinuscule === "novice"
  ) {
    return "Novice";
  }

  if (
    valeurMinuscule === "u12" ||
    valeurMinuscule === "atome"
  ) {
    return "Atome";
  }

  if (
    valeurMinuscule === "u14" ||
    valeurMinuscule === "benjamine"
  ) {
    return "Benjamine";
  }

  if (
    valeurMinuscule === "u16" ||
    valeurMinuscule === "junior"
  ) {
    return "Junior";
  }

  if (
    valeurMinuscule === "u19" ||
    valeurMinuscule === "cadette"
  ) {
    return "Cadette";
  }

  if (
    valeurMinuscule === "19+" ||
    valeurMinuscule === "inter" ||
    valeurMinuscule === "intermédiaire" ||
    valeurMinuscule === "intermediaire"
  ) {
    return "Inter";
  }

  return valeur;
}