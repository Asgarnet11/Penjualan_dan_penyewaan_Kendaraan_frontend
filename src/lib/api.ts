import axios from "axios";
import {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from "@/types/auth";
import {
  GetVehicleResponse,
  GetVehiclesResponse,
  Vehicle,
  CreateVehiclePayload,
  UpdateVehiclePayload,
} from "@/types/vehicle";

import { useAuthStore } from "@/stores/authStore";

import { GetMyProfileResponse } from "@/types/user";
import { GetMyBookingsResponse } from "@/types/booking";

import {
  CreateBookingResponse,
  UpdateBookingStatusPayload,
} from "@/types/booking";
import { format } from "date-fns";

import { InitiatePurchaseResponse, GetMySalesResponse } from "@/types/sales";

// Konfigurasi instance Axios
const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState(); // Ambil token dari Zustand
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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

export const getVehicleById = async (id: string): Promise<Vehicle> => {
  try {
    const response = await apiClient.get<GetVehicleResponse>(`/vehicles/${id}`);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || "Gagal mengambil detail kendaraan"
      );
    }
    throw new Error("Terjadi kesalahan pada jaringan");
  }
};

export const createBooking = async (
  vehicleId: string,
  startDate: Date,
  endDate: Date
): Promise<CreateBookingResponse> => {
  // Backend kita mengharapkan format "YYYY-MM-DD"
  const payload = {
    vehicle_id: vehicleId,
    start_date: format(startDate, "yyyy-MM-dd"),
    end_date: format(endDate, "yyyy-MM-dd"),
  };

  try {
    const response = await apiClient.post<CreateBookingResponse>(
      "/bookings",
      payload
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Gagal membuat booking");
    }
    throw new Error("Terjadi kesalahan pada jaringan");
  }
};

export const getMyProfile = async (): Promise<GetMyProfileResponse> => {
  try {
    const response = await apiClient.get<GetMyProfileResponse>("/auth/me");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || "Gagal mengambil data profil"
      );
    }
    throw new Error("Terjadi kesalahan pada jaringan");
  }
};

export const getMyBookings = async (): Promise<GetMyBookingsResponse> => {
  try {
    const response = await apiClient.get<GetMyBookingsResponse>(
      "/bookings/my-bookings"
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || "Gagal mengambil riwayat booking"
      );
    }
    throw new Error("Terjadi kesalahan pada jaringan");
  }
};

export const initiatePurchase = async (
  vehicleId: string
): Promise<InitiatePurchaseResponse> => {
  try {
    // Backend sudah siap dengan endpoint ini
    const response = await apiClient.post<InitiatePurchaseResponse>(
      `/vehicles/${vehicleId}/purchase`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Gagal memulai proses pembelian"
      );
    }
    throw new Error("Terjadi kesalahan pada jaringan");
  }
};

export const getMyPurchases = async (): Promise<GetMySalesResponse> => {
  try {
    const response = await apiClient.get<GetMySalesResponse>(
      "/sales/purchases"
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || "Gagal mengambil riwayat pembelian"
      );
    }
    throw new Error("Terjadi kesalahan pada jaringan");
  }
};

export const getMyListings = async (): Promise<GetVehiclesResponse> => {
  try {
    const response = await apiClient.get<GetVehiclesResponse>(
      "/vehicles/my-listings"
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Gagal mengambil listing");
    }
    throw new Error("Terjadi kesalahan pada jaringan");
  }
};

export const createVehicle = async (
  payload: CreateVehiclePayload
): Promise<GetVehicleResponse> => {
  try {
    const response = await apiClient.post<GetVehicleResponse>(
      "/vehicles",
      payload
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Gagal membuat listing");
    }
    throw new Error("Terjadi kesalahan pada jaringan");
  }
};

export const getVendorBookings = async (): Promise<GetMyBookingsResponse> => {
  try {
    const response = await apiClient.get<GetMyBookingsResponse>(
      "/bookings/vendor"
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || "Gagal mengambil data booking vendor"
      );
    }
    throw new Error("Terjadi kesalahan pada jaringan");
  }
};

export const getVendorSales = async (): Promise<GetMySalesResponse> => {
  try {
    const response = await apiClient.get<GetMySalesResponse>("/sales/sales");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || "Gagal mengambil data penjualan vendor"
      );
    }
    throw new Error("Terjadi kesalahan pada jaringan");
  }
};

export const updateVehicle = async (
  id: string,
  payload: UpdateVehiclePayload
): Promise<GetVehicleResponse> => {
  try {
    const response = await apiClient.put<GetVehicleResponse>(
      `/vehicles/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Gagal mengupdate listing");
    }
    throw new Error("Terjadi kesalahan pada jaringan");
  }
};

export const deleteVehicle = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/vehicles/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Gagal menghapus listing");
    }
    throw new Error("Terjadi kesalahan pada jaringan");
  }
};

export const updateBookingStatus = async (
  bookingId: string,
  payload: UpdateBookingStatusPayload
): Promise<void> => {
  try {
    await apiClient.patch(`/bookings/${bookingId}/status`, payload);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Gagal mengupdate status booking"
      );
    }
    throw new Error("Terjadi kesalahan pada jaringan");
  }
};
