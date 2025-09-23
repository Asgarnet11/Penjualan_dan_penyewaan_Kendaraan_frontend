"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getConversations } from "@/lib/api";
import { Conversation } from "@/types/chat";
import { MessageSquareText } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function ConversationsPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await getConversations();
        setConversations(res.data || []);
      } catch (error) {
        console.error("Gagal mengambil percakapan", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchConversations();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Memuat percakapan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-teal-100 rounded-lg">
              <MessageSquareText className="w-6 h-6 text-teal-700" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Pesan Saya
            </h1>
          </div>
          <p className="text-gray-600 text-sm sm:text-base">
            Kelola dan lihat semua percakapan Anda dengan vendor
          </p>
        </div>

        {/* Content Section */}
        {conversations.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 sm:p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquareText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
                Tidak Ada Percakapan
              </h3>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                Mulai percakapan dengan vendor dari halaman detail kendaraan
                untuk memulai negosiasi dan mendapatkan informasi lebih lanjut.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="divide-y divide-gray-100">
              {conversations.map((convo) => (
                <div
                  key={convo.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <Link href={`/chat/${convo.id}`} className="block p-4 sm:p-6">
                    <div className="flex items-start space-x-4">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-teal-100 to-teal-200 rounded-xl flex items-center justify-center">
                          <span className="text-teal-700 font-bold text-lg sm:text-xl">
                            V
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                              Percakapan tentang Kendaraan
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              ID: #{convo.vehicle_id.substring(0, 8)}
                            </p>
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                              <p className="text-xs sm:text-sm text-gray-500">
                                Update terakhir:{" "}
                                <span className="font-medium">
                                  {format(
                                    new Date(convo.updated_at),
                                    "dd MMM yyyy, HH:mm",
                                    { locale: id }
                                  )}
                                </span>
                              </p>
                            </div>
                          </div>

                          {/* Arrow indicator */}
                          <div className="flex-shrink-0 ml-4">
                            <svg
                              className="w-5 h-5 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
