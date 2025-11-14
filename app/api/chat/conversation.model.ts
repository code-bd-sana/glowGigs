/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IConversation extends Document {
  participants: mongoose.Types.ObjectId[]; // [user1, user2]
  lastMessage?: string;
  lastMessageAt?: Date;
}

const conversationSchema = new Schema<IConversation>(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    lastMessage: {
      type: String,
    },
    lastMessageAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// 👇 This line prevents "OverwriteModelError" in Next.js dev mode
const Conversation: Model<IConversation> =
  mongoose.models.Conversation ||
  mongoose.model<IConversation>("Conversation", conversationSchema);

export default Conversation;
