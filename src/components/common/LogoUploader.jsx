import { useRef, useState } from "react";
import { creerLogoDepuisFichier } from "../../services/logoService";

function LogoUploader({
  valeur,
  logoDefaut,
  onChange,
}) {
  const inputRef = useRef(null);
  const [chargement, setChargement] = useState(false);

  function choisirFichier() {
    inputRef.current?.click();
  }

  async function gererFichier(fichier) {
    if (!fichier) {
      return;
    }

    if (!fichier.type.startsWith("image/")) {
      alert("Veuillez sélectionner une image.");
      return;
    }

    try {
      setChargement(true);

      const logo = await creerLogoDepuisFichier(fichier);

      onChange(logo);
    } catch (erreur) {
      console.error(
        "Erreur pendant la conversion du logo :",
        erreur
      );

      alert("Impossible de charger cette image.");
    } finally {
      setChargement(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  async function deposer(evenement) {
    evenement.preventDefault();

    await gererFichier(
      evenement.dataTransfer.files[0]
    );
  }

  return (
    <div
      onDragOver={(evenement) =>
        evenement.preventDefault()
      }
      onDrop={deposer}
      style={{
        border: "2px dashed #999",
        borderRadius: "10px",
        padding: "15px",
        textAlign: "center",
      }}
    >
      <img
        src={valeur?.donnees || logoDefaut}
        alt="Logo"
        style={{
          width: 120,
          height: 120,
          objectFit: "contain",
          marginBottom: 10,
        }}
      />

      <br />

      <button
        type="button"
        onClick={choisirFichier}
        disabled={chargement}
      >
        {chargement
          ? "Chargement..."
          : "Choisir un logo"}
      </button>

      <p>ou glissez-déposez une image ici</p>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        disabled={chargement}
        onChange={(evenement) =>
          gererFichier(
            evenement.target.files[0]
          )
        }
      />
    </div>
  );
}

export default LogoUploader;