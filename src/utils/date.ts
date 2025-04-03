import { formatDistance, fromUnixTime } from "date-fns";

export function getDistanceFromTimestamp(timestamp: number) {
  const date = fromUnixTime(timestamp);
  return formatDistance(date, new Date(), { addSuffix: true });
}
