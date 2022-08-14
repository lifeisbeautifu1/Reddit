export interface IPost {
  identifier: string;
  title: string;
  body?: string;
  slug: string;
  subName: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  // Virtual fields
  url: string;
  voteScore?: number;
  commentCount?: number;
  userVote?: number;
}

export interface ISub {
  posts: IPost[];
}

export interface IUser {
  username: string;
  email: string;
  createAd: string;
}
