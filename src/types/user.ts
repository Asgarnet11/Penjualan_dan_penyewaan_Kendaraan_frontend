export interface User {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  role: "customer" | "vendor" | "admin";
  is_verified: boolean;
  verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface GetMyProfileResponse {
  status_code: number;
  message: string;
  data: User;
}

export interface GetAllUsersResponse {
  status_code: number;
  message: string;
  data: User[];
}
