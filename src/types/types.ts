export interface Creator {
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
  user: {
    name: string;
    profilePicture: string;
  };
  timestamp: string;
  caption: string;
  hashtags: string[];
  content?: string[];
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
}
