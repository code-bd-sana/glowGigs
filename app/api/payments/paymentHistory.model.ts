import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPaymentHistory extends Document {
  userId: mongoose.Types.ObjectId;
  email: string;
  amount: number;
  currency: string;
  plan: string;
  status: "success" | "failed" | "canceled";
  stripeCustomerId: string;
  stripeSubscriptionId: string | null;
  stripeInvoiceId: string | null;
  createdAt: Date;
}

const paymentHistorySchema = new Schema<IPaymentHistory>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    email: { type: String, required: true },

    amount: { type: Number, required: true },
    currency: { type: String, default: "usd" },

    plan: { type: String, required: true },
    status: {
      type: String,
      enum: ["success", "failed", "canceled"],
      required: true,
    },

    stripeCustomerId: { type: String },
    stripeSubscriptionId: { type: String },
    stripeInvoiceId: { type: String },
  },
  { timestamps: true }
);

const PaymentHistory: Model<IPaymentHistory> =
  mongoose.models.PaymentHistory ||
  mongoose.model<IPaymentHistory>("PaymentHistory", paymentHistorySchema);

export default PaymentHistory;
