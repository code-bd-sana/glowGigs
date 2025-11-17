/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { socket } from "@/lib/socket";
import Image from "next/image";
import { FiMoreVertical, FiPhone, FiSend } from "react-icons/fi";

interface ChatWindowProps {
  conversation: any;
  userId: string;
}

export default function ChatWindow({ conversation, userId }: ChatWindowProps) {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Helper: load messages from API
  const loadMessages = useCallback(async () => {
    if (!conversation?._id) return;

    const res = await fetch(
      `/api/chat/message?conversationId=${conversation._id}`
    );
    const data = await res.json();
    setMessages(data);
  }, [conversation?._id]);

  // Initial load when conversation changes
  useEffect(() => {
    if (!conversation?._id) return;
    loadMessages();
  }, [conversation?._id, loadMessages]);

  // Socket: join room and listen for incoming messages
  useEffect(() => {
    if (!conversation?._id) return;

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("joinRoom", conversation._id);

    const handleIncoming = (msg: any) => {
      if (msg.conversationId === conversation._id) {
        loadMessages();
      }
    };

    socket.on("receiveMessage", handleIncoming);

    return () => {
      socket.off("receiveMessage", handleIncoming);
    };
  }, [conversation?._id, loadMessages]);

  // Send message
  async function sendMessage() {
    if (!text.trim()) return;

    const payload = {
      conversationId: conversation._id,
      senderId: userId,
      text,
    };

    const res = await fetch("/api/chat/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const savedMessage = await res.json();

    // Notify via socket – only conversationId is enough
    socket.emit("sendMessage", {
      conversationId: conversation._id,
    });

    // Optimistically update
    setMessages((prev) => [...prev, savedMessage]);
    setText("");
  }

  // Enter key handling
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!conversation?._id) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-[#e9f0ff] via-[#f5f7fb] to-[#e5f4ec]">
        <p className="text-gray-500 text-sm">
          Select a conversation from the left to start chatting.
        </p>
      </div>
    );
  }

  const otherUser =
    conversation.participants?.find((p: any) => p._id !== userId) || {};

  const avatarSrc =
    otherUser?.img 


  return (
    <div className="flex flex-col h-screen w-full bg-gradient-to-br from-[#e7f3ec] via-[#f7fafc] to-[#e9f0ff] rounded-3xl overflow-hidden">

      {/* HEADER */}
      <div className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11">
            <Image
              src={avatarSrc}
              alt="avatar"
              fill
              className="rounded-full object-cover border border-white shadow-sm"
            />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-[15px]">
              {otherUser?.fullName || otherUser?.email || "User"}
            </p>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
              Online
            </p>
          </div>
        </div>

        {/* <div className="flex items-center gap-3 text-gray-500">
          <button className="p-2 rounded-full hover:bg-gray-100 transition">
            <FiPhone className="text-lg" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 transition">
            <FiMoreVertical className="text-lg" />
          </button>
        </div> */}
      </div>

      {/* MESSAGES AREA */}
      <div className="flex-1 px-6 py-5 overflow-y-auto space-y-3">
        {messages.map((msg: any) => {
          const isMine =
            msg.sender === userId || msg.sender?._id === userId;

          return (
            <div
              key={msg._id}
              className={`flex ${
                isMine ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-md px-4 py-3 rounded-3xl text-[14px] leading-relaxed shadow-sm ${
                  isMine
                    ? "bg-gradient-to-r from-[#2563eb] to-[#38bdf8] text-white rounded-br-sm"
                    : "bg-white text-gray-900 border border-gray-100 rounded-bl-sm"
                }`}
              >
                <p>{msg.text}</p>
                <p
                  className={`mt-1 text-[10px] ${
                    isMine ? "text-blue-100" : "text-gray-400"
                  } text-right`}
                >
                  {msg.createdAt
                    ? new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* INPUT BAR */}
      <div className="px-6 py-4 bg-white/90 border-t border-gray-100 flex items-center gap-3">
        <div className="flex-1 bg-gray-100 rounded-2xl px-4 flex items-center">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write a message..."
            className="w-full bg-transparent py-3 text-[14px] focus:outline-none"
          />
        </div>
        <button
          onClick={sendMessage}
          className="rounded-2xl bg-black text-white px-4 py-3 flex items-center gap-1 text-sm hover:bg-gray-800 active:scale-[0.97] transition"
        >
          <span>Send</span>
          <FiSend className="text-[16px]" />
        </button>
      </div>
    </div>
  );
}
