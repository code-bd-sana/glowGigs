/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useCallback } from "react";
import { socket } from "@/lib/socket";

export default function ChatWindow({ conversation, userId }: any) {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");

  // 🔁 Helper: load messages from API
  const loadMessages = useCallback(async () => {
    if (!conversation?._id) return;

    const res = await fetch(
      `/api/chat/message?conversationId=${conversation._id}`
    );
    const data = await res.json();
    setMessages(data);
  }, [conversation?._id]);

  // 1️⃣ Initial load when conversation changes
  useEffect(() => {
    if (!conversation?._id) return;
    loadMessages();
  }, [conversation?._id, loadMessages]);

  // 2️⃣ Socket: connect, join room, listen for "receiveMessage"
  useEffect(() => {
    if (!conversation?._id) return;

    if (!socket.connected) {
      socket.connect();
      console.log("⚡ socket connected", socket.id);
    }

    // Join this conversation room
    socket.emit("joinRoom", conversation._id);

    const handleIncoming = (msg: any) => {
      console.log("🔥 incoming socket msg:", msg);
      if (msg.conversationId === conversation._id) {
        // Instead of pushing manually, reload from DB
        loadMessages();
      }
    };

    socket.on("receiveMessage", handleIncoming);

    return () => {
      socket.off("receiveMessage", handleIncoming);
    };
  }, [conversation?._id, loadMessages]);

  // 3️⃣ Send message
  async function sendMessage() {
    if (!text.trim()) return;

    const payload = {
      conversationId: conversation._id,
      senderId: userId,
      text,
    };

    // Save message to DB
    const res = await fetch("/api/chat/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const savedMessage = await res.json();

    // Notify others (and myself) via socket
    socket.emit("sendMessage", {
      conversationId: conversation._id,
    });

    // 🔁 Optionally reload immediately for sender as well
    // (in case socket comes a bit later)
    await loadMessages();

    setText("");
  }

  return (
    <div className="flex flex-col h-full w-full p-4">
      {/* Messages List */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-4">
        {messages.map((msg: any) => {
          const isMine = msg.sender === userId || msg.sender?._id === userId;

          return (
            <div
              key={msg._id}
              className={`p-3 rounded-xl max-w-xs ${
                isMine
                  ? "bg-blue-500 text-white ml-auto"
                  : "bg-gray-200 text-black mr-auto"
              }`}
            >
              {msg.text}
            </div>
          );
        })}
      </div>

      {/* Input Box */}
      <div className="flex mt-4 gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border p-2 rounded-lg"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
