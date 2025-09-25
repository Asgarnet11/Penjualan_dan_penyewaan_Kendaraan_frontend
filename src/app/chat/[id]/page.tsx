"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { getMessagesByConversationId } from "@/lib/api";
import { Message } from "@/types/chat";
import { Send, ArrowLeft, MoreVertical } from "lucide-react";

export default function ChatRoomPage() {
  const params = useParams();
  const conversationId = params.id as string;
  const { user, token } = useAuthStore();

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [recipientId, setRecipientId] = useState<string>(""); // Kita perlu tahu siapa lawan bicara
  const [isConnected, setIsConnected] = useState(false);

  const ws = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll ke pesan terakhir
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!conversationId || !token) return;

    // Ambil riwayat pesan
    getMessagesByConversationId(conversationId).then((res) => {
      setMessages(res.data || []);
      // Tentukan siapa penerima pesan berdasarkan pesan terakhir atau detail percakapan
    });

    // Buka koneksi WebSocket
    const wsUrl = `ws://localhost:8080/api/v1/ws?token=${token}`;
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log("WebSocket Terhubung");
      setIsConnected(true);
    };

    ws.current.onclose = () => {
      setIsConnected(false);
    };

    // Dengarkan pesan baru
    ws.current.onmessage = (event) => {
      try {
        const receivedMessage = JSON.parse(event.data) as Message;
        // Hanya tambahkan jika pesan ini bagian dari percakapan yang sedang dibuka
        if (receivedMessage.conversation_id === conversationId) {
          setMessages((prev) => [...prev, receivedMessage]);
        }
      } catch (error) {
        console.error("Gagal memproses pesan masuk:", error);
      }
    };

    // Tutup koneksi saat keluar halaman
    return () => {
      ws.current?.close();
      setIsConnected(false);
    };
  }, [conversationId, token]);

  const handleSendMessage = () => {
    if (
      newMessage.trim() &&
      ws.current &&
      ws.current.readyState === WebSocket.OPEN
    ) {
      // TODO: Dapatkan recipient_id dari data percakapan
      const messagePayload = {
        content: newMessage,
        recipient_id: "e44186c5-116e-462f-87d3-0d36b856ad77", // Placeholder
        conversation_id: conversationId,
      };
      ws.current.send(JSON.stringify(messagePayload));
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Chat Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors sm:hidden">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center">
                <span className="text-teal-700 font-semibold text-sm">V</span>
              </div>
              <div>
                <h1 className="font-semibold text-gray-900 text-sm sm:text-base">
                  Vendor Support
                </h1>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isConnected ? "bg-green-400" : "bg-red-400"
                    }`}
                  ></div>
                  <span className="text-xs text-gray-500">
                    {isConnected ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Send className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Mulai Percakapan
            </h3>
            <p className="text-gray-500 text-sm max-w-sm">
              Kirim pesan pertama Anda untuk memulai percakapan dengan vendor
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, index) => {
              const isCurrentUser = msg.sender_id === user?.id;
              const showAvatar =
                index === 0 || messages[index - 1]?.sender_id !== msg.sender_id;

              return (
                <div
                  key={msg.id}
                  className={`flex items-end space-x-2 ${
                    isCurrentUser
                      ? "flex-row-reverse space-x-reverse"
                      : "flex-row"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-full flex-shrink-0 ${
                      showAvatar ? "visible" : "invisible"
                    }`}
                  >
                    {!isCurrentUser ? (
                      <div className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 font-medium text-xs">
                          V
                        </span>
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center">
                        <span className="text-teal-700 font-medium text-xs">
                          {user?.full_name?.charAt(0) || "U"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div className={`relative max-w-xs sm:max-w-md lg:max-w-lg`}>
                    <div
                      className={`rounded-2xl px-4 py-2 shadow-sm ${
                        isCurrentUser
                          ? "bg-teal-600 text-white rounded-br-md"
                          : "bg-white text-gray-900 border border-gray-200 rounded-bl-md"
                      }`}
                    >
                      <p className="text-sm leading-relaxed break-words">
                        {msg.content}
                      </p>
                    </div>

                    {/* Message timestamp - you can add this if you have timestamp in Message type */}
                    {/* <p className={`text-xs text-gray-500 mt-1 ${isCurrentUser ? 'text-right' : 'text-left'}`}>
                      {format(new Date(msg.created_at), 'HH:mm')}
                    </p> */}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 px-4 py-3 sm:px-6">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" ? handleSendMessage() : null
              }
              placeholder="Ketik pesan Anda..."
              disabled={!isConnected}
              className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            />
          </div>

          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || !isConnected}
            className="flex-shrink-0 w-10 h-10 bg-teal-600 text-white rounded-full hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        {!isConnected && (
          <p className="text-xs text-red-500 mt-2 text-center">
            Koneksi terputus. Mencoba menyambung kembali...
          </p>
        )}
      </div>
    </div>
  );
}
