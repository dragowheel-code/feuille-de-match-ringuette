import { useState } from "react";

import AdministrationAccueil from "./AdministrationAccueil";
import GestionAssociations from "./GestionAssociations";

function AdministrationV2() {
  const [sectionActive, setSectionActive] = useState(null);

  if (sectionActive === "associations") {
    return (
      <GestionAssociations
        retourAccueil={() => setSectionActive(null)}
      />
    );
  }

  return (
    <AdministrationAccueil
      ouvrirSection={setSectionActive}
    />
  );
}

export default AdministrationV2;