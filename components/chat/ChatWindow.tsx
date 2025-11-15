/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";

export default function ChatWindow({ conversation, userId }: any) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // 📌 Load existing messages when conversation changes
  useEffect(() => {
    if (!conversation?._id) return;

    async function loadMessages() {
      const res = await fetch(
        `/api/chat/message?conversationId=${conversation._id}`
      );
      const data = await res.json();
      setMessages(data);
    }

    loadMessages();
  }, [conversation]);

  // 📌 Connect to Socket + Listen for Real-Time Messages
  // 📌 Connect to Socket + Join Conversation Room + Listen for Messages
  useEffect(() => {
    if (!conversation?._id) return;

    if (!socket.connected) {
      socket.connect();
    }

    // 🟢 Join this conversation room
    socket.emit("joinRoom", conversation._id);

    // 🟢 Handle incoming messages only for this room
    const handleIncoming = (msg: any) => {
      if (msg.conversationId === conversation._id) {
        setMessages((prev: any) => [...prev, msg]);
      }
    };

    socket.on("receiveMessage", handleIncoming);

    return () => {
      socket.off("receiveMessage", handleIncoming);
    };
  }, [conversation?._id]);

  // 📌 Send New Message
  async function sendMessage() {
    if (!text.trim()) return;

    const payload = {
      conversationId: conversation._id,
      senderId: userId,
      text,
    };

    // 1️⃣ Save message to database
    const res = await fetch("/api/chat/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const savedMessage = await res.json();

    // 2️⃣ Emit the message through socket for real-time delivery
    socket.emit("sendMessage", {
      conversationId: conversation._id,
      sender: savedMessage.sender,
      text: savedMessage.text,
      _id: savedMessage._id,
      createdAt: savedMessage.createdAt,
    });

    // 3️⃣ Add to my own UI immediately
    setMessages((prev: any) => [...prev, savedMessage]);

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
