import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";

import mongoose from "mongoose";
import Message from "../message.model";

// POST /api/chat/message
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { conversationId, senderId, text } = body;

    if (!conversationId || !senderId || !text) {
      return NextResponse.json(
        { error: "conversationId, senderId and text required" },
        { status: 400 }
      );
    }

    const message = await Message.create({
      conversation: new mongoose.Types.ObjectId(conversationId),
      sender: new mongoose.Types.ObjectId(senderId),
      text,
    });

    return NextResponse.json(message, { status: 200 });
  } catch (error) {
    console.error("POST message error:", error);
    return NextResponse.json(
      { error: "Server error creating message" },
      { status: 500 }
    );
  }
}

// GET /api/chat/message?conversationId=xxx
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const conversationId = searchParams.get("conversationId");

    if (!conversationId) {
      return NextResponse.json(
        { error: "conversationId is required" },
        { status: 400 }
      );
    }

    const messages = await Message.find({
      conversation: new mongoose.Types.ObjectId(conversationId),
    })
      .populate("sender", "name email")
      .sort({ createdAt: 1 });

    return NextResponse.json(messages);
  } catch (error) {
    console.error("GET messages error:", error);
    return NextResponse.json(
      { error: "Server error fetching messages" },
      { status: 500 }
    );
  }
}
