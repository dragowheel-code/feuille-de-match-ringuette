export function validerBut(
  numeroButeuse,
  assistante1,
  assistante2
) {
  if (assistante1 && assistante1 === numeroButeuse) {
    return "La marqueuse ne peut pas être aussi assistante 1.";
  }

  if (assistante2 && assistante2 === numeroButeuse) {
    return "La marqueuse ne peut pas être aussi assistante 2.";
  }

  if (
    assistante1 &&
    assistante2 &&
    assistante1 === assistante2
  ) {
    return "L'assistante 1 et l'assistante 2 ne peuvent pas être la même joueuse.";
  }

  return null;
}

export function validerPunition(
  joueuse,
  joueusePunition,
  joueusePurgeePar
) {
  if (joueuse?.suspendue) {
    return "Cette joueuse est suspendue.";
  }

  if (
    joueusePurgeePar &&
    joueusePurgeePar === joueusePunition
  ) {
    return "La joueuse qui purge doit être différente.";
  }

  return null;
}