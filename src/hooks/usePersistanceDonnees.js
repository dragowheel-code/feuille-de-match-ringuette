import { useEffect } from "react";

import {
  sauvegarderDansStockage,
} from "../services/storage";

export function usePersistanceDonnees({
  matchInfo,
  evenements,
  joueusesMatch,
}) {
  useEffect(() => {
    sauvegarderDansStockage(
      "matchInfo",
      matchInfo
    );
  }, [matchInfo]);

  useEffect(() => {
    sauvegarderDansStockage(
      "evenements",
      evenements
    );
  }, [evenements]);

  useEffect(() => {
    sauvegarderDansStockage(
      "joueusesMatch",
      joueusesMatch
    );
  }, [joueusesMatch]);
}