/**
 * Tipe ini merepresentasikan satu objek kendaraan secara lengkap,
 * sesuai dengan data yang ada di database dan dikirim oleh API.
 */
export interface Vehicle {
  id: string;
  owner_id: string;
  brand: string;
  model: string;
  year: number;
  plate_number: string;
  color: string;
  vehicle_type: "mobil" | "motor";
  transmission: "matic" | "manual";
  fuel: "bensin" | "diesel" | "listrik";
  status: "available" | "rented" | "sold" | "maintenance";
  description: string;
  is_for_sale: boolean;
  sale_price: number;
  is_for_rent: boolean;
  rental_price_daily: number;
  created_at: string; // ISO 8601 string format
  updated_at: string; // ISO 8601 string format
}

/**
 * Tipe untuk data yang dikirim ke backend saat membuat kendaraan baru.
 * Kita menggunakan Omit untuk membuang field yang di-generate oleh server.
 */
export type CreateVehiclePayload = Omit<
  Vehicle,
  "id" | "owner_id" | "status" | "created_at" | "updated_at"
>;

/**
 * Tipe untuk struktur respons umum dari API kita,
 * di mana 'data' adalah sebuah array dari Vehicle.
 * Digunakan oleh endpoint:
 * - GET /vehicles
 * - GET /vehicles/my-listings
 */
export interface GetVehiclesResponse {
  status_code: number;
  message: string;
  data: Vehicle[];
}

/**
 * Tipe untuk struktur respons umum dari API kita,
 * di mana 'data' adalah satu objek Vehicle.
 * Digunakan oleh endpoint:
 * - GET /vehicles/:id
 * - POST /vehicles
 */
export interface GetVehicleResponse {
  status_code: number;
  message: string;
  data: Vehicle;
}

export type UpdateVehiclePayload = CreateVehiclePayload;

export interface VehicleFilterParams {
  type?: "mobil" | "motor";
  transmission?: "matic" | "manual";
  search?: string;
  is_for_sale?: boolean;
  is_for_rent?: boolean;
  // Tambahkan filter lain di sini nanti (harga, tahun, dll)
}
