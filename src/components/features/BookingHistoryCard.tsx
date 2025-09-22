import { Booking } from "@/types/booking";
import { Calendar, Tag, Hash, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface BookingHistoryCardProps {
  booking: Booking;
}

export default function BookingHistoryCard({
  booking,
}: BookingHistoryCardProps) {
  const formatRupiah = (number: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);

  const statusChip = (status: string) => {
    let color = "bg-gray-200 text-gray-800";
    if (status === "completed") color = "bg-green-100 text-green-800";
    if (status === "confirmed") color = "bg-blue-100 text-blue-800";
    if (status === "rented_out") color = "bg-yellow-100 text-yellow-800";
    if (status === "cancelled") color = "bg-red-100 text-red-800";

    return (
      <span className={`px-3 py-1 text-sm font-medium rounded-full ${color}`}>
        {status.replace("_", " ").toUpperCase()}
      </span>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-xs text-gray-500">Booking ID</p>
          <p className="font-mono text-sm text-gray-700">
            {booking.id.substring(0, 8)}
          </p>
        </div>
        {statusChip(booking.status)}
      </div>

      {/* Nanti di sini kita bisa tampilkan nama mobilnya dengan mengambil data dari vehicle_id */}
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Detail Kendaraan Placeholder
      </h3>

      <div className="space-y-3 text-gray-600">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-3 text-gray-400" />
          <span>
            {format(new Date(booking.start_date), "dd MMM yyyy", {
              locale: id,
            })}{" "}
            -{" "}
            {format(new Date(booking.end_date), "dd MMM yyyy", { locale: id })}
          </span>
        </div>
        <div className="flex items-center">
          <Tag className="w-4 h-4 mr-3 text-gray-400" />
          <span>
            Total Harga: <strong>{formatRupiah(booking.total_price)}</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
