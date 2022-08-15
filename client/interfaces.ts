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
  comments?: IComment[];
  userVote?: number;
  sub?: ISub;
}

export interface ISub {
  posts: IPost[];
  createdAt: string;
  name: string;
  title: string;
  description: string;
  imageUrn: string;
  bannerUrn: string;
  username: string;
  imageUrl: string;
  bannerUrl: string;
}

export interface IUser {
  username: string;
  email: string;
  createAd: string;
}

export interface IComment {
  identifier: string;
  body: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  // Virtual fields
  voteScore: number;
  userVote: number;
}
