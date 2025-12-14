// src/types/dashboard.types.ts

export interface Banner {
  _id: string;
  name: string;
  description: string;
  link: string;
  imageurl: string;
  ctaButtonTitle: string;
  subFeatures: string[];
}

export interface Video {
  _id: string;
  title: string;
  description: string;
  videolink: string;
  thumbnail: string;
}
export interface faq {
  _id: string;
  question: string;
  answer: string;
}

export interface ContactUsInfo {
  email: string;
  phone: string;
  address: string;
  contactusEmail: string;
}

export interface DashboardState {
  banners: Banner[];
  videos: Video[];
  faqs: faq[];
  contactUsInfo: ContactUsInfo;
  loading: boolean;
  error: string | null;
}
