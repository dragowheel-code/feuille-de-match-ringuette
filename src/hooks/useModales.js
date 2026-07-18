import { useState } from "react";

export function useModales() {
  const [fenetreConfigOuverte, setFenetreConfigOuverte] =
    useState(false);

  const [fenetreImportOuverte, setFenetreImportOuverte] =
    useState(false);

  const [
    fenetreParametresOuverte,
    setFenetreParametresOuverte,
  ] = useState(false);

  const [
    fenetreListeOfficielsOuverte,
    setFenetreListeOfficielsOuverte,
  ] = useState(false);

  const [
    fenetreSuppressionJoueuseOuverte,
    setFenetreSuppressionJoueuseOuverte,
  ] = useState(false); 

  const [
    fenetreSuppressionEquipeOuverte,
    setFenetreSuppressionEquipeOuverte,
  ] = useState(false);

  const [
    fenetreSuppressionOfficielOuverte,
    setFenetreSuppressionOfficielOuverte,
  ] = useState(false);

  const [
  fenetreRemplacanteOuverte,
  setFenetreRemplacanteOuverte,
] = useState(false);

  function ouvrirConfiguration() {
    setFenetreConfigOuverte(true);
  }

  function fermerConfiguration() {
    setFenetreConfigOuverte(false);
  }

  function ouvrirImport() {
    setFenetreImportOuverte(true);
  }

  function fermerImport() {
    setFenetreImportOuverte(false);
  }

  function ouvrirParametres() {
    setFenetreParametresOuverte(true);
  }

  function fermerParametres() {
    setFenetreParametresOuverte(false);
  }

  function ouvrirListeOfficiels() {
    setFenetreListeOfficielsOuverte(true);
  }

  function fermerListeOfficiels() {
    setFenetreListeOfficielsOuverte(false);
  }

  function ouvrirSuppressionJoueuse() {
    setFenetreSuppressionJoueuseOuverte(true);
  }

  function fermerSuppressionJoueuse() {
    setFenetreSuppressionJoueuseOuverte(false);
  }

  function ouvrirSuppressionEquipe() {
    setFenetreSuppressionEquipeOuverte(true);
  }

  function fermerSuppressionEquipe() {
    setFenetreSuppressionEquipeOuverte(false);
  }

  function ouvrirSuppressionOfficiel() {
    setFenetreSuppressionOfficielOuverte(true);
  }

  function fermerSuppressionOfficiel() {
    setFenetreSuppressionOfficielOuverte(false);
  }

  function ouvrirRemplacante() {
  setFenetreRemplacanteOuverte(true);
}

function fermerRemplacante() {
  setFenetreRemplacanteOuverte(false);
}
  return {
    fenetreConfigOuverte,
    ouvrirConfiguration,
    fermerConfiguration,

    fenetreImportOuverte,
    ouvrirImport,
    fermerImport,

    fenetreParametresOuverte,
    ouvrirParametres,
    fermerParametres,

    fenetreListeOfficielsOuverte,
    ouvrirListeOfficiels,
    fermerListeOfficiels,

    fenetreSuppressionJoueuseOuverte,
    ouvrirSuppressionJoueuse,
    fermerSuppressionJoueuse,

    fenetreSuppressionEquipeOuverte,
    ouvrirSuppressionEquipe,
    fermerSuppressionEquipe,

    fenetreSuppressionOfficielOuverte,
    ouvrirSuppressionOfficiel,
    fermerSuppressionOfficiel,

    fenetreRemplacanteOuverte,
    ouvrirRemplacante,
    fermerRemplacante,
  };
}