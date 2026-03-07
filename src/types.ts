export type UserRole = 'tourist' | 'business' | 'admin';
export type BusinessStatus = 'pending' | 'approved' | 'rejected';
export type PackageType = 'basic' | 'standard' | 'premium';

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  country_code?: string;
  continent?: string;
  created_at: string;
}

export interface Business {
  id: string;
  user_id: string;
  business_name: string;
  category: string;
  description: string;
  location_district: string;
  location_place: string;
  phone_whatsapp: string;
  phone_office: string;
  email: string;
  website?: string;
  status: BusinessStatus;
  package_type: PackageType;
  price_range?: string;
  image_url: string;
  certificate_url?: string;
  payment_proof_url?: string;
  rejection_reason?: string;
}

export interface BusinessMedia {
  id: string;
  business_id: string;
  media_url: string;
  media_type: 'image' | 'video';
  subheading?: string;
  display_order: number;
}

export interface Package {
  id: string;
  name: string;
  price: number;
  features: string[];
  limits: {
    photos: number;
    videos: number;
    videoSizeMB: number;
  };
}
