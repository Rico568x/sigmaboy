export interface User {
  id: string;
  username: string;
  createdAt: Date;
}

export interface Image {
  id: string;
  title: string;
  description: string;
  imageData: string; // Base64 encoded image data
  userId: string;
  username: string;
  createdAt: Date;
  likes: number;
  dislikes: number;
  userLiked?: boolean;
  userDisliked?: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}