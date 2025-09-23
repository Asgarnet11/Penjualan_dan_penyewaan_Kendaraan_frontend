export interface User {
  name: any;
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  role: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface GetMyProfileResponse {
  status_code: number;
  message: string;
  data: User;
}
