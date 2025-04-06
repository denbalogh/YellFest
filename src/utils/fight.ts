import { Fight, FightWithUpdatedAtDistance } from "../types/fight";
import { getDistanceFromNow } from "./date";

export function getFightWithUpdatedAtDistance(
  fight: Fight,
): FightWithUpdatedAtDistance {
  return {
    ...fight,
    updated_at_distance: getDistanceFromNow(fight.updated_at),
  };
}
