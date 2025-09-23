import { User } from "./user";

export interface Conversation {
  id: string;
  customer_id: string;
  vendor_id: string;
  vehicle_id: string;
  created_at: string;
  updated_at: string;
  // Untuk UI, kita bisa tambahkan detail lawan bicara
  lawanBicara?: User;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  recipient_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

export interface GetConversationsResponse {
  data: Conversation[];
}

export interface GetMessagesResponse {
  data: Message[];
}
