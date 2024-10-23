export interface UserTypes {
  _id: string;
  email: string;
  username: string;
  photo: string | null;
  fullName: string;
  emailActivated: boolean;
  role: string;
  followers: Followers[];
  following: string[];
  posts: string[];
  reels: string[];
  createdAt: string;
  updatedAt: string;
}

interface Followers {
  _id: string;
}

export interface CreatePostTypes {
  data: {
    content: string[];
    content_alt: string;
    caption: string;
    location: string;
  };
}

export interface GeoTyes {
  latitude: number;
  longitude: number;
  city: string;
}

export interface GeoHelperType {
  types: string[];
}

export interface GeoSetLocationNameType {
  setLocation: React.Dispatch<React.SetStateAction<string>>;
}

export interface PostProps {
  post: postTypes;
}

export interface postTypes {
  name?: string;
  post?: any;
  content: { url: string; type: string }[];
  owner: { photo: string; username: string };
  updatedAt: string;
  caption: string;
  content_alt: string;
  show_likes: boolean;
  likes_count: number;
  comments_count: number;
  shares_count: number;
}

export interface FileTypes {
  setFiles: React.Dispatch<React.SetStateAction<{ content: string[] }>>;
  ready: boolean;
  setReady: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface itemTypes {
  url: string;
}
