import { User } from "./user";

// Tipe untuk data yang dikirim saat login
export interface LoginPayload {
  email: string;
  password: string;
}

// Tipe untuk data yang diterima dari backend setelah login berhasil
export interface LoginResponse {
  status_code: number;
  message: string;
  data: {
    token: string;
  };
}

// TIPE BARU: untuk data yang dikirim saat registrasi
export interface RegisterPayload {
  full_name: string;
  email: string;
  password: string;
  phone_number: string;
  role: "customer" | "vendor";
}

// TIPE BARU: untuk data yang diterima setelah registrasi berhasil
export interface RegisterResponse {
  status_code: number;
  message: string;
  data: User;
}
