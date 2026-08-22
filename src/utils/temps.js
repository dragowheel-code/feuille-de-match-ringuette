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

export function formaterTempsSaisi(valeur) {
  const texte = String(valeur ?? "");

  // On conserve uniquement les chiffres.
  const chiffres = texte
    .replace(/\D/g, "")
    .slice(0, 4);

  if (!chiffres) {
    return "";
  }

  // 1 ou 2 chiffres = secondes
  if (chiffres.length <= 2) {
    return chiffres;
  }

  // 3 chiffres : M:SS
  if (chiffres.length === 3) {
    return `${chiffres.slice(0, 1)}:${chiffres.slice(1)}`;
  }

  // 4 chiffres : MM:SS
  return `${chiffres.slice(0, 2)}:${chiffres.slice(2)}`;
}

export function formaterTempsPendantSaisie(
  valeur
) {
  const chiffres = String(
    valeur ?? ""
  )
    .replace(/\D/g, "")
    .slice(0, 4);

  if (!chiffres) {
    return "";
  }

  if (chiffres.length === 1) {
    return `0:0${chiffres}`;
  }

  if (chiffres.length === 2) {
    return `0:${chiffres}`;
  }

  if (chiffres.length === 3) {
    return `${chiffres.slice(
      0,
      1
    )}:${chiffres.slice(1)}`;
  }

  return `${chiffres.slice(
    0,
    2
  )}:${chiffres.slice(2)}`;
}