"use client";

import ChatWindow from "@/components/chat/ChatWindow";
import ConversationList from "@/components/chat/ConversationList";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function ChatPage() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  return (
    <div className="flex gap-3 min-h-screen">
      {/* LEFT SIDEBAR */}
      <ConversationList onSelect={setSelectedConversation} />

      {/* RIGHT SIDE */}
      <div className="flex-1">
        {selectedConversation ? (
          <ChatWindow
            conversation={selectedConversation}
            userId={userId}   
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Select a conversation
          </div>
        )}
      </div>
    </div>
  );
}
