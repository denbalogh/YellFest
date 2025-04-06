export type Fight = {
  fight_id: number;
  author_id: number;
  author_name: string;
  title: string;
  body: string;
  upvotes: number;
  created_at: Date;
  updated_at: Date;
};

export type FightWithUpdatedAtDistance = Fight & {
  updated_at_distance: string;
};
