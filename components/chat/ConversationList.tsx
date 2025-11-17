/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import toast from "react-hot-toast";

interface ConversationListProps {
  onSelect: (conversation: any) => void;
}

export default function ConversationList({ onSelect }: ConversationListProps) {
  const { data: session } = useSession();
  const userId = (session as any)?.user?.id;
  const [conversations, setConversations] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!userId) return;

    const load = async () => {
      try {
        const res = await fetch(`/api/chat/list?userId=${userId}`);
        const data = await res.json();
        setConversations(data);
      } catch (err) {
        console.error("Failed to load conversations:", err);
      }
    };

    load();
  }, [userId]);

  const filteredConversations = conversations.filter((c) => {
    const other = c.participants?.find((p: any) => p._id !== userId);
    const name = other?.fullName || other?.email || "";
    const lastMsg = c.lastMessage || "";
    const term = search.toLowerCase();
    return (
      name.toLowerCase().includes(term) || lastMsg.toLowerCase().includes(term)
    );
  });

  return (
    <div className="h-screen w-80 bg-white border-r rounded-3xl border-gray-100 shadow-lg flex flex-col">
      {/* Top header */}
      <div className="px-4 pt-5 pb-3">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Messages</h1>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="w-full px-3 py-2.5 rounded-2xl text-sm bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-1">
        {filteredConversations.map((conversation) => {
          const otherUser = conversation.participants?.find(
            (p: any) => p._id !== userId
          );

          const avatarSrc = otherUser.img;

          return (
            <button
              key={conversation._id}
              onClick={() => {
                const role = session?.user?.role;
                const plan = session?.user?.plan;

                // EMPLOYERS can chat always
                if (role === "EMPLOYER") {
                  onSelect(conversation);
                  return;
                }

                // JOB SEEKER must have valid plan (bronze or pro)
                if (!["bronze", "pro"].includes(plan)) {
                  toast.error(
                    "Upgrade to Bronze or Pro to chat with employers."
                  );
                  return;
                }

                onSelect(conversation);
              }}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-2xl hover:bg-gray-50 transition text-left"
            >
              <div className="relative w-11 h-11 flex-shrink-0">
                <Image
                  src={avatarSrc}
                  alt="avatar"
                  fill
                  className="rounded-full object-cover border border-white shadow-sm"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border border-white" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold text-gray-900 truncate">
                  {otherUser?.fullName || otherUser?.email || "User"}
                </p>
                <p className="text-[12px] text-gray-500 truncate">
                  {conversation.lastMessage || "No messages yet"}
                </p>
              </div>

              <div className="ml-2">
                {/* You can add time or unread dot here */}
              </div>
            </button>
          );
        })}

        {filteredConversations.length === 0 && (
          <p className="text-xs text-gray-400 px-3 mt-4">
            No conversations yet. Apply for a job to start chatting.
          </p>
        )}
      </div>
    </div>
  );
}
