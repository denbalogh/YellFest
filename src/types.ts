export type Thread = {
  id: number;
  authorName?: string;
  authorSecret?: string;
  title: string;
  body: string;
  replyCount: number;
  upvotes: number;
  latestActivityTimestamp: number;
};

export type ThreadWithDistance = Thread & {
  latestActivityDistance: string;
};
