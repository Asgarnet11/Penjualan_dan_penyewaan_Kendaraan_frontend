import axios from "axios";
import {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from "@/types/auth";
import { GetVehiclesResponse } from "@/types/vehicle";

// Konfigurasi instance Axios
const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Fungsi untuk login
export const loginUser = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>(
      "/auth/login",
      payload
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Melempar error dengan pesan dari backend jika ada
      throw new Error(error.response.data.message || "Login gagal");
    }
    throw new Error("Terjadi kesalahan pada jaringan");
  }
};

export const registerUser = async (
  payload: RegisterPayload
): Promise<RegisterResponse> => {
  try {
    const response = await apiClient.post<RegisterResponse>(
      "/auth/register",
      payload
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error ||
          "Registrasi gagal. Email atau nomor telepon mungkin sudah terdaftar."
      );
    }
    throw new Error("Terjadi kesalahan pada jaringan");
  }
};

export const getVehicles = async (): Promise<GetVehiclesResponse> => {
  try {
    // Di masa depan, kita bisa menambahkan parameter filter di sini
    const response = await apiClient.get<GetVehiclesResponse>("/vehicles");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || "Gagal mengambil data kendaraan"
      );
    }
    throw new Error("Terjadi kesalahan pada jaringan");
  }
};
