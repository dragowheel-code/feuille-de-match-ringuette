export async function creerLogoDepuisFichier(fichier) {
  if (!fichier) {
    return null;
  }

  const donnees = await lireFichierBase64(fichier);

  return {
    id: crypto.randomUUID(),
    nom: fichier.name,
    type: fichier.type,
    taille: fichier.size,
    donnees,
  };
}

function lireFichierBase64(fichier) {
  return new Promise((resolve, reject) => {
    const lecteur = new FileReader();

    lecteur.onload = () => resolve(lecteur.result);

    lecteur.onerror = reject;

    lecteur.readAsDataURL(fichier);
  });
}