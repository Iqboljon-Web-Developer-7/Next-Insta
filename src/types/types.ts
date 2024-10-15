export interface Creator {
  _id: string;
  email: string;
  username: string;
  photo: string | null;
  fullName: string;
  emailActivated: boolean;
  role: string;
  followers: string[];
  following: string[];
  posts: string[];
  reels: string[];
  createdAt: string;
  updatedAt: string;
}
