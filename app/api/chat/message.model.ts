/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMessage extends Document {
  conversation: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId;
  text: string;
  seen: boolean;
}

const messageSchema = new Schema<IMessage>(
  {
    conversation: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    text: {
      type: String,
      required: true,
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Message: Model<IMessage> =
  mongoose.models.Message ||
  mongoose.model<IMessage>("Message", messageSchema);

export default Message;
