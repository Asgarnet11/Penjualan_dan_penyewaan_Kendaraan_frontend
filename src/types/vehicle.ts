// types/vehicle.ts

export interface Vehicle {
  id: number;
  name: string;
  type: "mobil" | "motor";
  brand: string;
  model: string;
  year: number;
  color: string;
  transmission: "manual" | "automatic" | "matic";
  fuelType: "bensin" | "diesel" | "listrik" | "hybrid";
  price: number;
  priceType: "sewa" | "jual";
  description?: string;
  isAvailable: boolean;
  vendorId: number;
  vendor?: {
    id: number;
    name: string;
    email: string;
    phone?: string;
    isVerified?: boolean;
  };
  images?: VehicleImage[];
  location?: string;
  mileage?: number;
  engineCapacity?: string;
  seatingCapacity?: number;
  features?: string[];

  // Legacy support - jika backend masih menggunakan field lama
  is_for_rent?: boolean;
  is_for_sale?: boolean;
  rental_price_daily?: number;
  sale_price?: number;

  // Rating dan review count
  averageRating?: number;
  reviewCount?: number;

  createdAt: string;
  updatedAt: string;
}

export interface VehicleImage {
  id: number;
  vehicleId: number;
  imageUrl: string;
  isPrimary: boolean;
  createdAt: string;
}

export interface GetVehiclesResponse {
  success: boolean;
  message: string;
  data: Vehicle[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface GetVehicleByIdResponse {
  success: boolean;
  message: string;
  data: Vehicle;
}

export interface CreateVehiclePayload {
  name: string;
  type: "mobil" | "motor";
  brand: string;
  model: string;
  year: number;
  color: string;
  transmission: "manual" | "automatic";
  fuelType: "bensin" | "diesel" | "listrik" | "hybrid";
  price: number;
  priceType: "sewa" | "jual";
  description?: string;
  location?: string;
  mileage?: number;
  engineCapacity?: string;
  seatingCapacity?: number;
  features?: string[];
}

export interface CreateVehicleResponse {
  success: boolean;
  message: string;
  data: Vehicle;
}
