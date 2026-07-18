import { useEffect, useState } from "react";

export function useHorloge() {
  const [heureActuelle, setHeureActuelle] = useState(
    () => new Date()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setHeureActuelle(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function obtenirHeureActuelle() {
    return heureActuelle.toLocaleTimeString("en-CA", {
      hour12: false,
    });
  }

  return {
    obtenirHeureActuelle,
  };
}