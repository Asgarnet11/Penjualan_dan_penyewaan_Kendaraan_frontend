import {
  Building,
  MapPin,
  Phone,
  Mail,
  Clock,
  Target,
  Users,
  Award,
  CheckCircle,
  Car,
  Shield,
  Zap,
} from "lucide-react";

export default function AboutPage() {
  const features = [
    {
      icon: Car,
      title: "Beragam Pilihan Kendaraan",
      description:
        "Dari mobil keluarga hingga kendaraan komersial, tersedia untuk sewa dan beli.",
    },
    {
      icon: Shield,
      title: "Transaksi Aman",
      description:
        "Sistem keamanan berlapis untuk melindungi setiap transaksi Anda.",
    },
    {
      icon: Zap,
      title: "Proses Cepat",
      description:
        "Platform digital yang memungkinkan pencarian dan booking dalam hitungan menit.",
    },
  ];

  const stats = [
    { number: "1000+", label: "Kendaraan Terdaftar" },
    { number: "500+", label: "Vendor Terpercaya" },
    { number: "5000+", label: "Pelanggan Puas" },
    { number: "50+", label: "Kota di Sultra" },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-teal-50 via-white to-blue-50 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
              Tentang{" "}
              <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                Sultra Otomotif
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Menghubungkan kebutuhan mobilitas Anda dengan solusi terbaik di
              Sulawesi Tenggara melalui platform digital yang inovatif dan
              terpercaya.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 sm:py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-teal-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800 mb-4">
                  <Target className="w-4 h-4 mr-2" />
                  Misi Kami
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  Membangun Ekosistem Otomotif Digital Terdepan
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Misi kami adalah menjadi platform digital terintegrasi dan
                    terlengkap yang berfungsi sebagai episentrum untuk seluruh
                    aktivitas dan kebutuhan otomotif di provinsi Sulawesi
                    Tenggara.
                  </p>
                  <p>
                    Kami melampaui konsep "iklan baris" konvensional dengan
                    membangun sebuah marketplace otomotif multifungsi yang
                    canggih, menggabungkan teknologi modern dengan pemahaman
                    mendalam tentang kebutuhan lokal.
                  </p>
                </div>
              </div>

              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
                  <Award className="w-4 h-4 mr-2" />
                  Komitmen Kami
                </div>
                <div className="space-y-3">
                  {[
                    "Pengalaman pengguna yang mulus dan intuitif",
                    "Keamanan transaksi dengan standar tertinggi",
                    "Efisiensi proses dari pencarian hingga transaksi",
                    "Dukungan pelanggan yang responsif 24/7",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-teal-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
                <div className="absolute top-4 right-4 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Visi Kami</h3>
                <p className="text-teal-50 leading-relaxed mb-6">
                  Menjadi platform otomotif digital nomor satu di Indonesia
                  Timur yang menghubungkan komunitas, vendor, dan konsumen dalam
                  satu ekosistem yang berkelanjutan.
                </p>
                <div className="flex items-center text-teal-100">
                  <Clock className="w-5 h-5 mr-2" />
                  <span className="text-sm">Melayani sejak 2023</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Mengapa Memilih Sultra Otomotif?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Kami menghadirkan solusi komprehensif untuk semua kebutuhan
              otomotif Anda dengan teknologi terdepan dan layanan terpercaya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group hover:border-teal-200"
              >
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-teal-200 transition-colors">
                  <feature.icon className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Hubungi Kami
              </h2>
              <p className="text-lg text-gray-600">
                Tim kami siap membantu Anda dengan pertanyaan atau kebutuhan
                apapun.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Informasi Kontak
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start group">
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-teal-200 transition-colors">
                      <Building className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">
                        Sultra Otomotif HQ
                      </p>
                      <p className="text-gray-600">
                        Jalan Otomotif No. 123, Kendari
                        <br />
                        Sulawesi Tenggara, Indonesia
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-teal-200 transition-colors">
                      <Phone className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">
                        Telepon
                      </p>
                      <p className="text-gray-600">(0401) 123-456</p>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-teal-200 transition-colors">
                      <Mail className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Email</p>
                      <p className="text-gray-600">info@sultraotomotif.com</p>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-teal-200 transition-colors">
                      <Clock className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">
                        Jam Operasional
                      </p>
                      <p className="text-gray-600">
                        Senin - Jumat: 08:00 - 17:00
                        <br />
                        Sabtu: 08:00 - 15:00
                        <br />
                        Minggu: Tutup
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map or Additional Info */}
              <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MapPin className="w-12 h-12 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Kunjungi Kantor Kami
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Tim ahli kami siap memberikan konsultasi langsung untuk
                    kebutuhan otomotif Anda di kantor pusat kami di Kendari.
                  </p>
                  <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    Lihat di Google Maps
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
