function RechercheChandails({
  valeur,
  setValeur,
}) {
  return (
    <div className="recherche-chandails">
      <input
        type="search"
        placeholder="Rechercher un numéro ou une taille..."
        value={valeur}
        onChange={(event) =>
          setValeur(event.target.value)
        }
      />
    </div>
  );
}

export default RechercheChandails;