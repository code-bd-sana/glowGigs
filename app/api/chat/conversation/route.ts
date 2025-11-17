/* app/api/chat/conversation/route.ts */

import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Conversation from "../conversation.model";
import User from "../../users/user.model";
import mongoose from "mongoose";   
import { PLAN_RULES } from "@/config/plans"; 

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

    // Fetch both users
    const user1 = await User.findById(user1Id);
    const user2 = await User.findById(user2Id);

    if (!user1 || !user2) {
      return NextResponse.json(
        { error: "One or both users not found" },
        { status: 404 }
      );
    }

    // ---------------------------------------------
    // 🔥 Identify the JOB SEEKER (chat limit applies only to them)
    // ---------------------------------------------
    const seeker = user1.role === "JOB_SEEKER" ? user1 : user2;

    const planName = seeker.plan;            // bronze / pro / basic
    const planStatus = seeker.planStatus;    // active / inactive
    const planEnd = seeker.currentPeriodEnd; // date

    // ---------------------------------------------
    // ❌ If plan not found → block
    // ---------------------------------------------
    if (!PLAN_RULES[planName]) {
      return NextResponse.json(
        { error: "You do not have an active subscription. Please upgrade." },
        { status: 403 }
      );
    }

    // ❌ If plan inactive
    if (planStatus !== "active") {
      return NextResponse.json(
        { error: "Your subscription is not active. Upgrade to chat." },
        { status: 403 }
      );
    }

    // ❌ If plan expired
    if (new Date(planEnd) < new Date()) {
      return NextResponse.json(
        { error: "Your subscription has expired. Renew to chat." },
        { status: 403 }
      );
    }

    // ❌ If this plan does NOT allow chatting
    if (!PLAN_RULES[planName].canChatWithEmployers) {
      return NextResponse.json(
        {
          error:
            "Chatting with employers is not included in your current plan. Please upgrade.",
        },
        { status: 403 }
      );
    }

    // ---------------------------------------------
    // ✔ If allowed → continue conversation logic
    // ---------------------------------------------

    let conversation = await Conversation.findOne({
      participants: {
        $all: [
          new mongoose.Types.ObjectId(user1Id),
          new mongoose.Types.ObjectId(user2Id),
        ],
      },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [
          new mongoose.Types.ObjectId(user1Id),
          new mongoose.Types.ObjectId(user2Id),
        ],
        lastMessage: "",
        lastMessageAt: new Date(),
      });
    }

    // 🧩 Populate participant details (for UI)
    const populated = await Conversation.findById(conversation._id).populate(
      "participants",
      "fullName email img role"
    );

    return NextResponse.json(populated, { status: 200 });
  } catch (error) {
    console.error("Error in conversation API:", error);
    return NextResponse.json(
      { error: "Server error in conversation API" },
      { status: 500 }
    );
  }
}
