export type Fight = {
  id: number;
  authorName?: string;
  authorSecret?: string;
  title: string;
  body: string;
  replyCount: number;
  upvotes: number;
  latestActivityTimestamp: number;
};

export type FightWithDistance = Fight & {
  latestActivityDistance: string;
};
