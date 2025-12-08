"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { socket } from "@/lib/socket";
import { FiSend } from "react-icons/fi";

interface Message {
  _id: string;
  conversationId: string;
  sender: string | { _id: string };
  text: string;
  createdAt: string;
}

interface SpecificChatWindowProps {
  conversationId: string;
  userId: string;
  applicantId: string;
  applicantEmail: string;
  applicantName?: string;
}

export default function SpecificChatWindow({
  conversationId,
  userId,
  applicantName,
}: SpecificChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load messages from the API
  const loadMessages = useCallback(async () => {
    if (!conversationId) return;

    const res = await fetch(
      `/api/chat/message?conversationId=${conversationId}`
    );
    const data = await res.json();
    setMessages(data);
  }, [conversationId]);

  // Send message
  const sendMessage = async () => {
    if (!text.trim() || !conversationId) return;

    const payload = {
      conversationId: conversationId,
      senderId: userId,
      text,
    };

    const res = await fetch("/api/chat/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const savedMessage = await res.json();

    // Socket emit
    socket.emit("sendMessage", {
      conversationId: conversationId,
    });

    setMessages((prev) => [...prev, savedMessage]);
    setText("");
  };

//   console.log(messages, "jbnsydgvbyx");
  useEffect(() => {
    if (!conversationId) return;
    loadMessages();
  }, [conversationId, loadMessages]);

  // Socket: join room and listen for incoming messages
  useEffect(() => {
    if (!conversationId) return;

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("joinRoom", conversationId);

    const handleIncoming = (msg: Message) => {
      if (msg.conversationId === conversationId) {
        loadMessages();
      }
    };

    socket.on("receiveMessage", handleIncoming);

    return () => {
      socket.off("receiveMessage", handleIncoming);
    };
  }, [conversationId, loadMessages]);

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!conversationId) {
    return <div>Select a conversation to start chatting.</div>;
  }

  return (
    <div className="flex flex-col h-[600px] xl:h-[700px] w-max-6xl bg-gradient-to-br from-[#e7f3ec] via-[#f7fafc] to-[#e9f0ff] rounded-3xl overflow-hidden">
      {/* HEADER */}
      <div className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11">
            {/* <Image
              src="/default-avatar.png"
              alt="avatar"
              fill
              className="rounded-full object-cover border border-white shadow-sm"
            /> */}
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-[15px]">
              {applicantName}
            </p>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
              Online
            </p>
          </div>
        </div>
      </div>

      {/* MESSAGES AREA */}
      <div className="flex-1 px-6 py-5 overflow-y-auto space-y-3">
        {messages.map((msg: Message) => {
          const isMine =
            typeof msg.sender === "string"
              ? msg.sender === userId
              : msg.sender?._id === userId;

          return (
            <div
              key={msg._id}
              className={`flex ${isMine ? "justify-end" : "justify-start"}`}
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
