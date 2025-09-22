"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerUser } from "@/lib/api";
import { UserPlus } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    phone_number: "",
    role: "customer", // Default role
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, role: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await registerUser({
        ...formData,
        role: formData.role as "customer" | "vendor",
      });
      setSuccess(
        "Registrasi berhasil! Anda akan diarahkan ke halaman login..."
      );

      // Tunggu 2 detik lalu arahkan ke halaman login
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-gray-50 py-12">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Buat Akun Baru</h1>
          <p className="mt-2 text-gray-600">
            Gabung dan temukan kendaraan impian Anda.
          </p>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="p-3 text-sm text-green-700 bg-green-100 rounded-lg">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input Fields */}
          <input
            name="full_name"
            type="text"
            placeholder="Nama Lengkap"
            required
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            name="password"
            type="password"
            placeholder="Password (min. 6 karakter)"
            required
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            name="phone_number"
            type="tel"
            placeholder="Nomor Telepon"
            required
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />

          {/* Role Selection */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Daftar sebagai:
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="customer"
                  checked={formData.role === "customer"}
                  onChange={handleRoleChange}
                  className="form-radio text-teal-600"
                />
                <span className="ml-2">Customer</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="vendor"
                  checked={formData.role === "vendor"}
                  onChange={handleRoleChange}
                  className="form-radio text-teal-600"
                />
                <span className="ml-2">Vendor / Pemilik Rental</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 rounded-md shadow-sm font-medium text-white bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400"
          >
            {isLoading ? (
              "Memproses..."
            ) : (
              <>
                <UserPlus className="w-5 h-5 mr-2" /> Daftar
              </>
            )}
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Sudah punya akun?{" "}
          <Link
            href="/login"
            className="font-medium text-teal-600 hover:text-teal-500"
          >
            Login di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
