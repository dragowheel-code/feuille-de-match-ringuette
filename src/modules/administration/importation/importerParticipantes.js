import { importerJoueuses } from "./importateur/importerJoueuses";

export default function importerParticipantes({
  participantesSelectionnees,
  joueuses,
}) {
  return importerJoueuses({
    previsualisation: {
      lignes: participantesSelectionnees,
    },
    joueuses,
  });
}