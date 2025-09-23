import { Search, CalendarCheck, KeyRound } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "1. Temukan Kendaraan",
      description:
        "Gunakan pencarian canggih kami untuk menemukan mobil atau motor yang sesuai dengan kebutuhan dan anggaran Anda.",
    },
    {
      icon: CalendarCheck,
      title: "2. Booking & Bayar Aman",
      description:
        "Pilih tanggal, lakukan booking, dan selesaikan pembayaran dengan mudah melalui sistem kami yang aman.",
    },
    {
      icon: KeyRound,
      title: "3. Ambil & Nikmati",
      description:
        "Ambil kunci kendaraan Anda di lokasi yang telah disepakati dan mulailah petualangan Anda di Sultra.",
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">
            Sewa & Beli dalam 3 Langkah Mudah
          </h2>
          <p className="text-gray-500 mt-2">
            Proses cepat, mudah, dan transparan dari awal hingga akhir.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="flex items-center justify-center w-20 h-20 bg-teal-100 text-teal-600 rounded-full mb-6">
                <step.icon className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
