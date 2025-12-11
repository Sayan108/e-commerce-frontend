// src/types/dashboard.types.ts

export interface Banner {
  _id: string;
  name: string;
  description: string;
  link: string;
  imageurl: string;
}

export interface Video {
  _id: string;
  title: string;
  description: string;
  videolink: string;
  thumbnail: string;
}

export interface DashboardState {
  banners: Banner[];
  videos: Video[];
  loading: boolean;
  error: string | null;
}
