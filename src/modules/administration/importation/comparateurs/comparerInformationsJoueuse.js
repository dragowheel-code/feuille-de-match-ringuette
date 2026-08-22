export function comparerInformationsJoueuse(
  participante,
  joueuse
) {
  const differences = [];

  const champs = [
  "dateNaissance",
  "numeroInscription",
  "adresse",
  "ville",
  "codePostal",
  "telephone",
  "sexe",
];

  for (const champ of champs) {
    const ancienneValeur = joueuse?.[champ] ?? "";
    const nouvelleValeur = participante?.[champ] ?? "";

    if (ancienneValeur !== nouvelleValeur) {
      differences.push({
        champ,
        ancienneValeur,
        nouvelleValeur,
      });
    }
  }

  return differences;
}