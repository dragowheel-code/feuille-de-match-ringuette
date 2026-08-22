function nettoyer(valeur) {
  return String(valeur ?? "").trim();
}

function extraireAdresseComplete(valeur) {
  const texte = nettoyer(valeur);

  if (!texte) {
    return {
      adresse: "",
      ville: "",
      codePostal: "",
    };
  }

  const correspondanceCodePostal =
    texte.match(
      /([A-Z]\d[A-Z])\s*(\d[A-Z]\d)$/i
    );

  if (!correspondanceCodePostal) {
    return {
      adresse: texte,
      ville: "",
      codePostal: "",
    };
  }

  const codePostal =
    `${correspondanceCodePostal[1]} ${correspondanceCodePostal[2]}`
      .toUpperCase();

  let avantCodePostal =
    texte
      .slice(
        0,
        correspondanceCodePostal.index
      )
      .trim();

  avantCodePostal =
    avantCodePostal.replace(
      /\s+(Québec|Quebec|QC|Qc|PQ)\s*$/i,
      ""
    );

  const parties =
    avantCodePostal
      .split(/\s{2,}/)
      .map((partie) =>
        partie.trim()
      )
      .filter(Boolean);

  if (parties.length >= 2) {
    return {
      adresse:
        parties[0],

      ville:
        parties
          .slice(1)
          .join(" "),

      codePostal,
    };
  }

  return {
    adresse:
      avantCodePostal,

    ville: "",

    codePostal,
  };
}

export function adapterParticipanteSportPlus(
  participante
) {
  const adresseComplete =
    extraireAdresseComplete(
      participante.Adresse
    );

  return {
    nomComplet:
      nettoyer(participante.Nom),

    numeroInscription:
      nettoyer(
        participante["# Insc"]
      ),

    adresse:
      adresseComplete.adresse,

    ville:
      nettoyer(participante.Ville) ||
      adresseComplete.ville,

    codePostal:
      nettoyer(
        participante["Code Postal"]
      ) ||
      adresseComplete.codePostal,

    telephone:
      nettoyer(
        participante.Téléphone
      ),

    sexe:
      nettoyer(participante.Sexe) ||
      "F",

    dateNaissance:
      nettoyer(
        participante.Naissance
      ),

    age:
      nettoyer(participante.Âge),

    categorie:
      participante.categorie,

    codeCategorie:
      participante.codeCategorie,

    saison:
      participante.saison,
  };
}