import {
  Building,
  MapPin,
  Phone,
  Target,
  Users,
  Shield,
  Award,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold tracking-tight mb-6">
              Tentang Sultra Otomotif
            </h1>
            <p className="text-xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
              Menghubungkan kebutuhan mobilitas Anda dengan solusi terbaik di
              Sulawesi Tenggara. Platform digital terintegrasi untuk semua
              kebutuhan otomotif Anda.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-teal-600 mr-4" />
                <h2 className="text-3xl font-bold text-gray-900">Misi Kami</h2>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Misi kami adalah menjadi platform digital terintegrasi dan
                  terlengkap yang berfungsi sebagai episentrum untuk seluruh
                  aktivitas dan kebutuhan otomotif di provinsi Sulawesi
                  Tenggara. Kami melampaui konsep &ldquo;iklan baris&rdquo;
                  konvensional dengan membangun sebuah marketplace otomotif
                  multifungsi yang canggih.
                </p>
                <p>
                  Kami berkomitmen untuk memberikan pengalaman pengguna yang
                  mulus, aman, dan efisien, baik bagi Anda yang mencari
                  kendaraan untuk disewa maupun untuk dibeli.
                </p>
                <p>
                  Dengan teknologi terdepan dan layanan pelanggan yang
                  responsif, kami memastikan setiap transaksi berlangsung dengan
                  kepercayaan penuh dan kepuasan maksimal.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="order-1 lg:order-2">
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <Building className="w-8 h-8 text-teal-600 mr-4" />
                <h3 className="text-2xl font-bold text-gray-900">
                  Hubungi Kami
                </h3>
              </div>
              <div className="space-y-6">
                <div className="flex items-start group hover:bg-white hover:shadow-md rounded-lg p-4 transition-all duration-200">
                  <Building className="w-6 h-6 mr-4 text-teal-600 flex-shrink-0 mt-1 group-hover:text-teal-700" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">
                      Sultra Otomotif HQ
                    </p>
                    <p className="text-gray-600">
                      Jalan Otomotif No. 123, Kendari
                    </p>
                  </div>
                </div>
                <div className="flex items-start group hover:bg-white hover:shadow-md rounded-lg p-4 transition-all duration-200">
                  <MapPin className="w-6 h-6 mr-4 text-teal-600 flex-shrink-0 mt-1 group-hover:text-teal-700" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Lokasi</p>
                    <p className="text-gray-600">
                      Sulawesi Tenggara, Indonesia
                    </p>
                  </div>
                </div>
                <div className="flex items-start group hover:bg-white hover:shadow-md rounded-lg p-4 transition-all duration-200">
                  <Phone className="w-6 h-6 mr-4 text-teal-600 flex-shrink-0 mt-1 group-hover:text-teal-700" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Telepon</p>
                    <p className="text-gray-600">(0401) 123-456</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Mengapa Memilih Sultra Otomotif?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Kami menyediakan solusi komprehensif untuk semua kebutuhan
              otomotif Anda dengan standar layanan terbaik.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-6 mx-auto">
                <Shield className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-4">
                Keamanan Terjamin
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Sistem keamanan berlapis dan verifikasi ketat untuk memastikan
                transaksi yang aman dan terpercaya.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-6 mx-auto">
                <Users className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-4">
                Komunitas Aktif
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Bergabung dengan ribuan pengguna yang telah mempercayakan
                kebutuhan otomotif mereka kepada kami.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-6 mx-auto">
                <Award className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-4">
                Layanan Terbaik
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Dukungan pelanggan 24/7 dan pengalaman pengguna yang telah
                dioptimalkan untuk kemudahan Anda.
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl text-white p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Pencapaian Kami</h2>
            <p className="text-teal-100 text-lg">
              Angka-angka yang menunjukkan kepercayaan dan kepuasan pelanggan
              kami.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-teal-100">Kendaraan Terdaftar</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-teal-100">Pengguna Aktif</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-teal-100">Tingkat Kepuasan</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-teal-100">Dukungan Pelanggan</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
