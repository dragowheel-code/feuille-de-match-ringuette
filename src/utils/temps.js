export function calculerTempsCorrige(temps, dureePeriode) {
  if (!temps.includes(":")) return "";

  const [minutesTexte, secondesTexte] = temps.split(":");
  const minutes = Number(minutesTexte);
  const secondes = Number(secondesTexte);

  if (Number.isNaN(minutes) || Number.isNaN(secondes)) {
    return "";
  }

  if (minutes < 0 || secondes < 0 || secondes > 59) {
    return "";
  }

  const totalSecondesPeriode = dureePeriode * 60;
  const totalSecondesTableau = minutes * 60 + secondes;
  const totalSecondesCorrige =
    totalSecondesPeriode - totalSecondesTableau;

  if (totalSecondesCorrige < 0) {
    return "";
  }

  const minutesCorrigees = Math.floor(
    totalSecondesCorrige / 60
  );

  const secondesCorrigees =
    totalSecondesCorrige % 60;

  return `${String(minutesCorrigees).padStart(
    2,
    "0"
  )}:${String(secondesCorrigees).padStart(2, "0")}`;
}

export function ajouterMinutes(temps, minutesAAjouter) {
  const [minutes, secondes] = temps
    .split(":")
    .map(Number);

  const totalSecondes =
    minutes * 60 +
    secondes +
    Number(minutesAAjouter) * 60;

  const nouvellesMinutes = Math.floor(
    totalSecondes / 60
  );

  const nouvellesSecondes =
    totalSecondes % 60;

  return `${String(nouvellesMinutes).padStart(
    2,
    "0"
  )}:${String(nouvellesSecondes).padStart(2, "0")}`;
}