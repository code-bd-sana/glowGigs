/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function ConversationList({ onSelect }: any) {
  const { data: session } = useSession();
  const [conversations, setConversations] = useState([]);

  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) return;

    async function loadData() {
      try {
        const res = await fetch(`/api/chat/list?userId=${userId}`);
        const data = await res.json();
        setConversations(data);
      } catch (err) {
        console.error("Failed to load conversations:", err);
      }
    }

    loadData();
  }, [userId]);

  return (
    <div className="p-4 border-r h-screen bg-gray-100 w-64">
      <h2 className="text-xl font-semibold mb-4">Conversations</h2>

      {!userId && (
        <p className="text-sm text-gray-500">Loading user session...</p>
      )}

      {userId && conversations.length === 0 && (
        <p className="text-sm text-gray-500">No conversations found.</p>
      )}

      <div className="space-y-3">
        {conversations.map((conversation: any) => {
          const otherUser = conversation.participants.find(
            (p: any) => p._id !== userId
          );

          return (
            <div
              key={conversation._id}
              onClick={() => onSelect && onSelect(conversation)}
              className="p-3 bg-white rounded shadow cursor-pointer hover:bg-gray-50"
            >
              {/* FIXED: SHOW REAL NAME */}
              <div className="font-medium">
                {otherUser?.fullName ||
                  otherUser?.email ||
                  "Unknown User"}
              </div>

              <div className="text-sm text-gray-500 truncate">
                {conversation.lastMessage || "No messages yet"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
