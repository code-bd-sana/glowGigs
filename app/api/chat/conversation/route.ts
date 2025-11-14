/* app/api/chat/conversation/route.ts */

import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Conversation from "../conversation.model";
import User from "../../users/user.model";
import mongoose from "mongoose";   // <-- ADD THIS

// POST /api/chat/conversation
// body: { user1Id: string, user2Id: string }
export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const { user1Id, user2Id } = body;

    if (!user1Id || !user2Id) {
      return NextResponse.json(
        { error: "user1Id and user2Id are required" },
        { status: 400 }
      );
    }

    // check users exist
    const user1 = await User.findById(user1Id);
    const user2 = await User.findById(user2Id);

    if (!user1 || !user2) {
      return NextResponse.json(
        { error: "One or both users not found" },
        { status: 404 }
      );
    }

    // check existing conversation
    let conversation = await Conversation.findOne({
      participants: {
        $all: [
          new mongoose.Types.ObjectId(user1Id),
          new mongoose.Types.ObjectId(user2Id)
        ]
      }
    });

    // create conversation if not exists
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [
          new mongoose.Types.ObjectId(user1Id),  
          new mongoose.Types.ObjectId(user2Id)   
        ],
        lastMessage: "",
        lastMessageAt: new Date(),
      });
    }

    return NextResponse.json(conversation, { status: 200 });
  } catch (error) {
    console.error("Error in conversation API:", error);
    return NextResponse.json(
      { error: "Server error in conversation API" },
      { status: 500 }
    );
  }
}
