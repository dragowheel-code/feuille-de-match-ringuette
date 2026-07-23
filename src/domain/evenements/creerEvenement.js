import { creerId } from "../../utils/ids";

export function creerEvenement({
  type,
  ...data
}) {
  return {
    id: creerId(),
    type,
    ...data,
  };
}