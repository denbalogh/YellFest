import { Fight, FightWithDistance } from "../types";
import { getDistanceFromTimestamp } from "./date";

export function getFightWithDateDistance(fight: Fight): FightWithDistance {
  return {
    ...fight,
    latestActivityDistance: getDistanceFromTimestamp(
      fight.latestActivityTimestamp,
    ),
  };
}

export function createFight(
  fight: Omit<Fight, "replyCount" | "upvotes" | "latestActivityTimestamp">,
) {
  return {
    ...fight,
    replyCount: 0,
    upvotes: 0,
    latestActivityTimestamp: Date.now() / 1000,
  };
}
