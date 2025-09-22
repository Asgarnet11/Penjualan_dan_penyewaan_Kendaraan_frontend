import { Vehicle } from "./vehicle";

// Tipe untuk data transaksi penjualan yang diterima dari backend
export interface SalesTransaction {
  id: string;
  vehicle_id: string;
  seller_id: string;
  buyer_id: string;
  agreed_price: number;
  status: string;
  payment_url: string;
  created_at: string;
  updated_at: string;
}

// Tipe untuk respons API saat memulai pembelian
export interface InitiatePurchaseResponse {
  status_code: number;
  message: string;
  data: SalesTransaction;
}

// Tipe untuk respons API saat mengambil riwayat penjualan
export interface GetMySalesResponse {
  status_code: number;
  message: string;
  data: SalesTransaction[];
}
