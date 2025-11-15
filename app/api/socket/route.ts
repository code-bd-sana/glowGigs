// app/api/socket/route.ts

import { NextRequest } from "next/server";
import { Server as IOServer } from "socket.io";

declare global {
  var io: IOServer | undefined;
}

export function GET(req: NextRequest) {
  if (!global.io) {
    global.io = new IOServer({
      cors: {
        origin: "*",
      },
    });

    global.io.on("connection", (socket) => {
      console.log("🔥 User connected:", socket.id);

      // 🟢 When the client joins a conversation room
      socket.on("joinRoom", (conversationId: string) => {
        socket.join(conversationId);
        console.log(`📌 User ${socket.id} joined room: ${conversationId}`);
      });

      // 🟢 When a message is sent
      socket.on("sendMessage", (msg) => {
        const room = msg.conversationId;
        global.io?.to(room).emit("receiveMessage", msg);
        console.log("📤 Message sent to room:", room);
      });
    });

    console.log("🔥 Socket.io initialized");
  }

  return new Response("Socket running", { status: 200 });
}

export const POST = GET;
