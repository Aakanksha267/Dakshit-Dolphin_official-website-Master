export interface Internship {
  id: string;
  title: string;
  department: string;
  mode: string;
  duration: string;
  stipend: string;
  skills_required: string[];
  description: string;
  requirements?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  event_type: string;
  mode: string;
  location?: string;
  max_participants?: number;
  registration_deadline?: string;
  image_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary: string;
  category: string;
  author: string;
  thumbnail_url?: string;
  published: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  college: string;
  program: string;
  testimonial: string;
  rating: number;
  photo_url?: string;
  approved: boolean;
  created_at: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  image_url: string;
  category: string;
  description?: string;
  created_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
}

export interface SiteStats {
  id: string;
  students_trained: number;
  events_held: number;
  institutions_partnered: number;
  updated_at: string;
}
