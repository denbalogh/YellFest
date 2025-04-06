import { formatDistance } from "date-fns";

export function getDistanceFromNow(date: Date) {
  return formatDistance(date, new Date(), { addSuffix: true });
}
