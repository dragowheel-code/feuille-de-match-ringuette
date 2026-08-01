function normaliser(valeur) {
  return String(valeur ?? "")
    .trim()
    .toLowerCase();
}

export function filtrerJoueuses({
  joueuses,
  equipe,
  saison,
}) {
  if (!equipe) {
    return [];
  }

  const abreviationEquipe = normaliser(
    equipe.abreviation
  );

  const saisonSelectionnee = normaliser(
    saison?.nom ??
      saison?.libelle ??
      saison?.code
  );

  return joueuses.filter((joueuse) => {
    const codeCategorieJoueuse = normaliser(
      joueuse.codeCategorie
    );

    const saisonJoueuse = normaliser(
      joueuse.saison
    );

    const memeCodeCategorie =
      abreviationEquipe &&
      codeCategorieJoueuse ===
        abreviationEquipe;

    const memeSaison =
      !saisonSelectionnee ||
      saisonJoueuse === saisonSelectionnee;

    return (
      memeCodeCategorie &&
      memeSaison
    );
  });
}