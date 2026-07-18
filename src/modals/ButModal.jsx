export default function ButModal({
  ouverte,
  equipeNomPourBut,
  tempsTableau,
  setTempsTableau,
  calculerTempsCorrige,
  numeroButeuse,
  setNumeroButeuse,
  assistante1,
  setAssistante1,
  assistante2,
  setAssistante2,
  joueusesDisponibles,
  confirmerBut,
  fermer,
}) {
  if (!ouverte) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Ajouter un but — {equipeNomPourBut}</h2>

        <label>Temps affiché au tableau</label>
        <input
          value={tempsTableau}
          onChange={(e) => setTempsTableau(e.target.value)}
          placeholder="Exemple : 08:32"
          autoFocus
        />

        <p>
          Temps corrigé :{" "}
          <strong>
            {calculerTempsCorrige(tempsTableau) || "--:--"}
          </strong>
        </p>

        <label>Marqueuse</label>
        <select
          value={numeroButeuse}
          onChange={(e) => setNumeroButeuse(e.target.value)}
        >
          <option value="">Choisir une joueuse</option>

          {joueusesDisponibles.map((joueuse) => (
            <option key={joueuse.id} value={joueuse.numero}>
              #{joueuse.numero} — {joueuse.nom}
            </option>
          ))}
        </select>

        <label>Assistante 1 optionnelle</label>
        <select
          value={assistante1}
          onChange={(e) => setAssistante1(e.target.value)}
        >
          <option value="">Aucune</option>

          {joueusesDisponibles.map((joueuse) => (
            <option key={joueuse.id} value={joueuse.numero}>
              #{joueuse.numero} — {joueuse.nom}
            </option>
          ))}
        </select>

        <label>Assistante 2 optionnelle</label>
        <select
          value={assistante2}
          onChange={(e) => setAssistante2(e.target.value)}
        >
          <option value="">Aucune</option>

          {joueusesDisponibles.map((joueuse) => (
            <option key={joueuse.id} value={joueuse.numero}>
              #{joueuse.numero} — {joueuse.nom}
            </option>
          ))}
        </select>

        <div className="modal-actions">
          <button onClick={confirmerBut}>
            Confirmer le but
          </button>

          <button
            className="cancel-button"
            onClick={fermer}
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}