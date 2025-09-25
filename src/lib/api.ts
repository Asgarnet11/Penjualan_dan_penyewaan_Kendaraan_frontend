import axios from "axios";
import { format } from "date-fns";
import { useAuthStore } from "@/stores/authStore";

// Type imports
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
  VehicleFilterParams,
} from "@/types/vehicle";
import { GetMyProfileResponse } from "@/types/user";
import {
  GetMyBookingsResponse,
  CreateBookingResponse,
  UpdateBookingStatusPayload,
} from "@/types/booking";
import {
  GetConversationsResponse,
  GetMessagesResponse,
  Conversation,
} from "@/types/chat";
import { InitiatePurchaseResponse, GetMySalesResponse } from "@/types/sales";

// ==========================================
// API CLIENT CONFIGURATION
// ==========================================

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1/";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor untuk menambahkan token otomatis
apiClient.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

const handleApiError = (error: unknown, defaultMessage: string): void => {
  if (axios.isAxiosError(error) && error.response) {
    const errorMessage =
      error.response.data.message ||
      error.response.data.error ||
      defaultMessage;
    throw new Error(errorMessage);
  }
  throw new Error("Terjadi kesalahan pada jaringan");
};

// ==========================================
// AUTHENTICATION API
// ==========================================

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
    handleApiError(error, "Login gagal");
    throw error; // This will never be reached due to handleApiError throwing
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
    handleApiError(error, "Registrasi gagal");
    throw error; // This will never be reached due to handleApiError throwing
  }
};

export const getMyProfile = async (): Promise<GetMyProfileResponse> => {
  try {
    const response = await apiClient.get<GetMyProfileResponse>("/auth/me");
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal mengambil data profil");
    throw error; // This will never be reached due to handleApiError throwing
  }
};

// ==========================================
// VEHICLE API
// ==========================================

export const getVehicles = async (
  params: VehicleFilterParams = {}
): Promise<GetVehiclesResponse> => {
  try {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "" && value !== null) {
        queryParams.append(key, String(value));
      }
    });

    const response = await apiClient.get<GetVehiclesResponse>(
      `/vehicles?${queryParams.toString()}`
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal mengambil data kendaraan");
    throw error; // This will never be reached due to handleApiError throwing
  }
};

export const getVehicleById = async (id: string): Promise<Vehicle> => {
  try {
    const response = await apiClient.get<GetVehicleResponse>(`/vehicles/${id}`);
    return response.data.data;
  } catch (error) {
    handleApiError(error, "Gagal mengambil detail kendaraan");
    throw error; // This will never be reached due to handleApiError throwing
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
    handleApiError(error, "Gagal membuat listing");
    throw error; // This will never be reached due to handleApiError throwing
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
    handleApiError(error, "Gagal mengupdate listing");
    throw error; // This will never be reached due to handleApiError throwing
  }
};

export const deleteVehicle = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/vehicles/${id}`);
  } catch (error) {
    handleApiError(error, "Gagal menghapus listing");
    throw error; // This will never be reached due to handleApiError throwing
  }
};

export const getMyListings = async (): Promise<GetVehiclesResponse> => {
  try {
    const response = await apiClient.get<GetVehiclesResponse>(
      "/vehicles/my-listings"
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal mengambil listing");
    throw error; // This will never be reached due to handleApiError throwing
  }
};

// ==========================================
// BOOKING API
// ==========================================

export const createBooking = async (
  vehicleId: string,
  startDate: Date,
  endDate: Date
): Promise<CreateBookingResponse> => {
  try {
    const payload = {
      vehicle_id: vehicleId,
      start_date: format(startDate, "yyyy-MM-dd"),
      end_date: format(endDate, "yyyy-MM-dd"),
    };

    const response = await apiClient.post<CreateBookingResponse>(
      "/bookings",
      payload
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal membuat booking");
    throw error; // This will never be reached due to handleApiError throwing
  }
};

export const getMyBookings = async (): Promise<GetMyBookingsResponse> => {
  try {
    const response = await apiClient.get<GetMyBookingsResponse>(
      "/bookings/my-bookings"
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal mengambil riwayat booking");
    throw error; // This will never be reached due to handleApiError throwing
  }
};

export const getVendorBookings = async (): Promise<GetMyBookingsResponse> => {
  try {
    const response = await apiClient.get<GetMyBookingsResponse>(
      "/bookings/vendor"
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal mengambil data booking vendor");
    throw error; // This will never be reached due to handleApiError throwing
  }
};

export const updateBookingStatus = async (
  bookingId: string,
  payload: UpdateBookingStatusPayload
): Promise<void> => {
  try {
    await apiClient.patch(`/bookings/${bookingId}/status`, payload);
  } catch (error) {
    handleApiError(error, "Gagal mengupdate status booking");
    throw error; // This will never be reached due to handleApiError throwing
  }
};

// ==========================================
// SALES/PURCHASE API
// ==========================================

export const initiatePurchase = async (
  vehicleId: string
): Promise<InitiatePurchaseResponse> => {
  try {
    const response = await apiClient.post<InitiatePurchaseResponse>(
      `/vehicles/${vehicleId}/purchase`
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal memulai proses pembelian");
    throw error; // This will never be reached due to handleApiError throwing
  }
};

export const getMyPurchases = async (): Promise<GetMySalesResponse> => {
  try {
    const response = await apiClient.get<GetMySalesResponse>(
      "/sales/purchases"
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal mengambil riwayat pembelian");
    throw error; // This will never be reached due to handleApiError throwing
  }
};

export const getVendorSales = async (): Promise<GetMySalesResponse> => {
  try {
    const response = await apiClient.get<GetMySalesResponse>("/sales/sales");
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal mengambil data penjualan vendor");
    throw error; // This will never be reached due to handleApiError throwing
  }
};

// ==========================================
// CHAT API
// ==========================================

export const startConversation = async (
  vehicleId: string
): Promise<Conversation> => {
  try {
    const response = await apiClient.post(
      `/vehicles/${vehicleId}/conversations`
    );
    return response.data.data;
  } catch (error) {
    handleApiError(error, "Gagal memulai percakapan");
    throw error; // This will never be reached due to handleApiError throwing
  }
};

export const getConversations = async (): Promise<GetConversationsResponse> => {
  try {
    const response = await apiClient.get<GetConversationsResponse>(
      "/conversations"
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal mengambil daftar percakapan");
    throw error; // This will never be reached due to handleApiError throwing
  }
};

export const getMessagesByConversationId = async (
  conversationId: string
): Promise<GetMessagesResponse> => {
  try {
    const response = await apiClient.get<GetMessagesResponse>(
      `/conversations/${conversationId}/messages`
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal mengambil riwayat pesan");
    throw error; // This will never be reached due to handleApiError throwing
  }
};

// ==========================================
// ADMIN API
// ==========================================

export const getAllUsersForAdmin = async (): Promise<any> => {
  try {
    const response = await apiClient.get("/admin/users");
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal mengambil data pengguna");
    throw error; // This will never be reached due to handleApiError throwing
  }
};

export const verifyVendor = async (vendorId: string): Promise<void> => {
  try {
    await apiClient.patch(`/admin/vendors/${vendorId}/verify`);
  } catch (error) {
    handleApiError(error, "Gagal memverifikasi vendor");
    throw error; // This will never be reached due to handleApiError throwing
  }
};

export const deleteUser = async (userId: string): Promise<void> => {
  try {
    await apiClient.delete(`/admin/users/${userId}`);
  } catch (error) {
    handleApiError(error, "Gagal menghapus pengguna");
    throw error; // This will never be reached due to handleApiError throwing
  }
};

export const getAllListingsForAdmin =
  async (): Promise<GetVehiclesResponse> => {
    try {
      const response = await apiClient.get<GetVehiclesResponse>(
        "/admin/vehicles"
      );
      return response.data;
    } catch (error) {
      handleApiError(error, "Gagal mengambil data listing");
      throw error; // This will never be reached due to handleApiError throwing
    }
  };

export const deleteListingByAdmin = async (
  vehicleId: string
): Promise<void> => {
  try {
    await apiClient.delete(`/admin/vehicles/${vehicleId}`);
  } catch (error) {
    handleApiError(error, "Gagal menghapus listing");
    throw error; // This will never be reached due to handleApiError throwing
  }
};

export const uploadVehicleImage = async (
  vehicleId: string,
  imageFile: File
): Promise<any> => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await apiClient.post(
      `/vehicles/${vehicleId}/images`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Gagal mengupload gambar");
    }
    throw new Error("Terjadi kesalahan pada jaringan");
  }
};
