// Tipe untuk data booking yang diterima dari backend
export interface Booking {
  id: string;
  vehicle_id: string;
  user_id: string;
  start_date: string;
  end_date: string;
  total_price: number;
  status: string;
  payment_url: string;
  created_at: string;
  updated_at: string;
}

// Tipe untuk respons API saat membuat booking
export interface CreateBookingResponse {
  status_code: number;
  message: string;
  data: Booking;
}

export interface GetMyBookingsResponse {
  status_code: number;
  message: string;
  data: Booking[];
}

export type UpdateBookingStatusPayload = {
  status: "rented_out" | "completed" | "cancelled";
};
