export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto px-6 py-8 text-center text-gray-600">
        <p>
          &copy; {new Date().getFullYear()} Sultra Otomotif. Semua Hak Cipta
          Dilindungi.
        </p>
        <div className="mt-4 flex justify-center space-x-6">
          <a href="#" className="hover:text-teal-600">
            Tentang Kami
          </a>
          <a href="#" className="hover:text-teal-600">
            Kontak
          </a>
          <a href="#" className="hover:text-teal-600">
            Kebijakan Privasi
          </a>
        </div>
      </div>
    </footer>
  );
}
