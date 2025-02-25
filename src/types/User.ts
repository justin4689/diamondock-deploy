  export type UserProfile = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  email_verified_at: string | null;
  otp_code: string | null;
  otp_expires_at: string | null;
  is_otp_verified: number;
  address: string | null;
  city: string | null;
  country: string | null;
  phone_number: string | null;
  image: string | null;
  profile_completed: number;
  is_approved: number;
  created_at: string;
  updated_at: string;
  image_url: string | null;
  zip_code: string | null;
}
