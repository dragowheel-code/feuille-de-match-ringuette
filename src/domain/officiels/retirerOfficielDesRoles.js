import { ROLES_OFFICIEL } from "./roles";

export function retirerOfficielDesRoles(
  matchInfo,
  nomOfficiel
) {
  const nouvellesInformations = {
    ...matchInfo,
  };

  Object.values(ROLES_OFFICIEL).forEach((role) => {
    if (nouvellesInformations[role] === nomOfficiel) {
      nouvellesInformations[role] = "";
    }
  });

  return nouvellesInformations;
}