export type Reply = {
  reply_id: number;
  fight_id: number;
  author_name: string;
  author_id: number;
  parent_reply_id: number;
  body: string;
  upvotes: number;
  created_at: Date;
};
