import { Thread, ThreadWithDistance } from "../types";
import { getDistanceFromTimestamp } from "./date";

export function getThreadWithDateDistance(thread: Thread): ThreadWithDistance {
  return {
    ...thread,
    latestActivityDistance: getDistanceFromTimestamp(
      thread.latestActivityTimestamp,
    ),
  };
}

export function createThread(
  thread: Omit<Thread, "replyCount" | "upvotes" | "latestActivityTimestamp">,
) {
  return {
    ...thread,
    replyCount: 0,
    upvotes: 0,
    latestActivityTimestamp: Date.now() / 1000,
  };
}
