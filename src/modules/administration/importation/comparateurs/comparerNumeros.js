export function comparerNumeros(numero1, numero2) {
  const valeur1 = String(numero1 ?? "").trim();
  const valeur2 = String(numero2 ?? "").trim();

  return {
    identiques: valeur1 === valeur2,
    numero1: valeur1,
    numero2: valeur2,
  };
}