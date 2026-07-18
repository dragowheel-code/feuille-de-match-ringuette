import { useEffect } from "react";
import { sauvegarderDansStockage } from "../services/storage";

export function usePersistanceDonnees({
  matchInfo,
  equipes,
  joueuses,
  evenements,
  officiels,
}) {
  useEffect(() => {
    sauvegarderDansStockage("matchInfo", matchInfo);
  }, [matchInfo]);

  useEffect(() => {
    sauvegarderDansStockage("equipes", equipes);
  }, [equipes]);

  useEffect(() => {
    sauvegarderDansStockage("joueuses", joueuses);
  }, [joueuses]);

  useEffect(() => {
    sauvegarderDansStockage("evenements", evenements);
  }, [evenements]);

  useEffect(() => {
    sauvegarderDansStockage("officiels", officiels);
  }, [officiels]);
}