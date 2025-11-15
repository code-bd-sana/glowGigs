/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { dbConnect } from "@/lib/dbConnect";
import User from "@/app/api/users/user.model";

// ⭐ NEW: Import PaymentHistory
import PaymentHistory from "@/app/api/payments/paymentHistory.model";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  console.log("🔥 Webhook HIT!");

  try {
    const rawBody = await req.text();
    const sig = req.headers.get("stripe-signature");

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(rawBody, sig!, endpointSecret);
    } catch (err: any) {
      console.error("❌ Invalid signature:", err.message);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    console.log("📌 Stripe Event Type:", event.type);

    switch (event.type) {
      /* ===========================================================
         🟢 SUCCESSFUL PAYMENT
      =========================================================== */
     case "checkout.session.completed": {
  const session = event.data.object as Stripe.Checkout.Session;

  console.log("🧾 FULL SESSION OBJECT:", session);

  const userId = session.metadata?.userId;
  const plan = session.metadata?.plan;
  const subscriptionId = session.subscription as string;
  const customerId = session.customer as string;

  await dbConnect();

  await User.findByIdAndUpdate(userId, {
    stripeCustomerId: customerId,
    stripeSubscriptionId: subscriptionId,
    plan,
    planStatus: "active",
    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });

  // ⭐⭐ THIS IS THE IMPORTANT PART ⭐⭐
  console.log("🟢 PaymentHistory INSERT DATA:", {
    userId,
    email: session.customer_details?.email,
    amount: session.amount_total ? session.amount_total / 100 : null,
    currency: session.currency,
    plan,
    status: "success",
    stripeCustomerId: customerId,
    stripeSubscriptionId: subscriptionId,
    stripeInvoiceId: session.invoice,
  });

  try {
    const saved = await PaymentHistory.create({
      userId,
      email: session.customer_details?.email || "",
      amount: session.amount_total! / 100,
      currency: session.currency || "usd",
      plan,
      status: "success",
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscriptionId,
      stripeInvoiceId: session.invoice as string,
    });

    console.log("🎉 PaymentHistory Inserted Successfully:", saved);
  } catch (err: any) {
    console.log("❌ PaymentHistory INSERT ERROR:", err.message);
  }

  break;
}


      /* ===========================================================
         🟡 FAILED PAYMENT
      =========================================================== */
      case "invoice.payment_failed": {
        const invoice: any = event.data.object;

        console.log("🧾 FULL INVOICE OBJECT:", invoice);

        const customerId = invoice.customer;
        await dbConnect();

        const user = await User.findOneAndUpdate(
          { stripeCustomerId: customerId },
          { planStatus: "past_due" },
          { new: true }
        );

        console.log("⚠️ Payment failed — user:", user);

        console.log("🚀 Preparing to insert PaymentHistory (FAILED):", {
          userId: user?._id,
          email: user?.email,
          amount: invoice.amount_due / 100,
          plan: user?.plan,
        });

        try {
          const saved = await PaymentHistory.create({
            userId: user?._id,
            email: user?.email || "",
            amount: invoice.amount_due / 100,
            currency: invoice.currency || "usd",
            plan: user?.plan || "unknown",
            status: "failed",
            stripeCustomerId: customerId,
            stripeSubscriptionId: invoice.subscription,
            stripeInvoiceId: invoice.id,
          });

          console.log("💾 PaymentHistory Inserted (FAILED):", saved);
        } catch (historyErr) {
          console.error("❌ PaymentHistory Insert FAILED:", historyErr);
        }

        break;
      }

      /* ===========================================================
         🔴 SUBSCRIPTION CANCELLED
      =========================================================== */
      case "customer.subscription.deleted": {
        const subscription: any = event.data.object;

        console.log("🧾 FULL SUBSCRIPTION OBJECT:", subscription);

        const customerId = subscription.customer;

        await dbConnect();

        const user = await User.findOneAndUpdate(
          { stripeCustomerId: customerId },
          {
            plan: "free",
            planStatus: "canceled",
            stripeSubscriptionId: null,
          },
          { new: true }
        );

        console.log("❌ Subscription cancelled — user:", user);

        console.log("🚀 Preparing to insert PaymentHistory (CANCELED):", {
          userId: user?._id,
          email: user?.email,
        });

        try {
          const saved = await PaymentHistory.create({
            userId: user?._id,
            email: user?.email || "",
            amount: 0,
            currency: "usd",
            plan: user?.plan || "unknown",
            status: "canceled",
            stripeCustomerId: customerId,
            stripeSubscriptionId: subscription.id,
            stripeInvoiceId: null,
          });

          console.log("💾 PaymentHistory Inserted (CANCELED):", saved);
        } catch (historyErr) {
          console.error("❌ PaymentHistory Insert FAILED:", historyErr);
        }

        break;
      }

      default:
        console.log("ℹ️ Unhandled event:", event.type);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("🔥 Fatal Webhook Error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

// ⭐ Required config for Stripe Webhooks
export const config = {
  api: {
    bodyParser: false,
  },
};
