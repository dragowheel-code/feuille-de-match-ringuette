export function creerAlignementDepuisAdministration({
  equipe,
  nomEquipeMatch = "",
  joueuses = [],
  affectations = [],
} = {}) {
  if (!equipe?.id) {
    return [];
  }

  return affectations
    .filter(
      (affectation) =>
        affectation.active !== false &&
        String(affectation.equipeId) ===
          String(equipe.id)
    )
    .map((affectation) => {
      const joueuse =
        joueuses.find(
          (element) =>
            String(element.id) ===
            String(affectation.joueuseId)
        );

      if (!joueuse) {
        return null;
      }

      return {
        id: joueuse.id,

        equipe: nomEquipeMatch,

        numero:
          String(affectation.numero ?? ""),

        nom:
          joueuse.nomComplet ?? "",

        numeroInscription:
          joueuse.numeroInscription ?? "",

        dateNaissance:
          joueuse.dateNaissance ?? "",

        adresse:
          joueuse.adresse ?? "",

        ville:
          joueuse.ville ?? "",

        codePostal:
          joueuse.codePostal ?? "",

        telephone:
          joueuse.telephone ?? "",

        sexe:
          joueuse.sexe ?? "",

        categorie:
          joueuse.categorie ?? "",

        codeCategorie:
          joueuse.codeCategorie ?? "",

        saison:
          joueuse.saison ?? "",

        gardienne: false,
capitaine: false,
assistanteCapitaine: false,

        absente: false,
        suspendue: false,
        remplacante: false,

        equipeProvenance: "",
      };
    })
    .filter(Boolean);
}