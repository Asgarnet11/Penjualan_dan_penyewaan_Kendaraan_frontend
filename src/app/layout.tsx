import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Import komponen layout kita
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sultra Otomotif - Sewa & Beli Kendaraan",
  description: "Platform marketplace otomotif terlengkap di Sulawesi Tenggara.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-gray-50`}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
