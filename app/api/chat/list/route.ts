import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Conversation from "../conversation.model";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const objectId = new mongoose.Types.ObjectId(userId);

    const conversations = await Conversation.find({
      participants: objectId,
    })
    .populate("participants", "fullName email role img")
      .sort({ updatedAt: -1 });

    return NextResponse.json(conversations, { status: 200 });
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return NextResponse.json(
      { error: "Server error fetching conversations" },
      { status: 500 }
    );
  }
}
