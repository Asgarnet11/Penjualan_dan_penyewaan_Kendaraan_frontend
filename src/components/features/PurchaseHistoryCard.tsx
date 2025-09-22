import { SalesTransaction } from "@/types/sales";
import { ShoppingBag, Tag, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface PurchaseHistoryCardProps {
  purchase: SalesTransaction;
}

export default function PurchaseHistoryCard({
  purchase,
}: PurchaseHistoryCardProps) {
  const formatRupiah = (number: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);

  const statusChip = (status: string) => {
    let color = "bg-gray-200 text-gray-800";
    if (status === "completed") color = "bg-green-100 text-green-800";
    if (status === "cancelled") color = "bg-red-100 text-red-800";
    if (status === "payment_pending") color = "bg-yellow-100 text-yellow-800";

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
          <p className="text-xs text-gray-500">Transaksi ID</p>
          <p className="font-mono text-sm text-gray-700">
            {purchase.id.substring(0, 8)}
          </p>
        </div>
        {statusChip(purchase.status)}
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Pembelian Kendaraan
      </h3>

      <div className="space-y-3 text-gray-600">
        <div className="flex items-center">
          <ShoppingBag className="w-4 h-4 mr-3 text-gray-400" />
          <span>
            Tanggal:{" "}
            {format(new Date(purchase.created_at), "dd MMM yyyy", {
              locale: id,
            })}
          </span>
        </div>
        <div className="flex items-center">
          <Tag className="w-4 h-4 mr-3 text-gray-400" />
          <span>
            Harga Disepakati:{" "}
            <strong>{formatRupiah(purchase.agreed_price)}</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
