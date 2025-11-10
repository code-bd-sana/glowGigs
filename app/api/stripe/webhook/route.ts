/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { dbConnect } from "@/lib/dbConnect";
import User from "@/app/api/users/user.model";

// ✅ Always use the same secret key from your .env
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// ✅ Stripe webhook secret (found in your Stripe dashboard → Developers → Webhooks)
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
    console.log('tumi amr personal webhook')
  try {
    const rawBody = await req.text();
    const sig = req.headers.get("stripe-signature");

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(rawBody, sig!, endpointSecret);
    } catch (err: any) {
      console.error("⚠️  Webhook signature verification failed:", err.message);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // ✅ Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        // Get metadata from checkout
        const userId = session.metadata?.userId;
        const plan = session.metadata?.plan;
        const subscriptionId = session.subscription as string;
        const customerId = session.customer as string;

        if (!userId) {
          console.warn("No userId found in metadata");
          break;
        }

        await dbConnect();

        // ✅ Update user with subscription info
        await User.findByIdAndUpdate(userId, {
          stripeCustomerId: customerId,
          stripeSubscriptionId: subscriptionId,
          plan,
          planStatus: "active",
          currentPeriodEnd: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000 
          ),
        });

        console.log(`✅ Subscription activated for user ${userId} (${plan})`);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        await dbConnect();
        await User.findOneAndUpdate(
          { stripeCustomerId: customerId },
          { planStatus: "past_due" }
        );

        console.log("⚠️ Payment failed. Plan set to past_due.");
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        await dbConnect();
        await User.findOneAndUpdate(
          { stripeCustomerId: customerId },
          {
            plan: "free",
            planStatus: "canceled",
            stripeSubscriptionId: null,
          }
        );

        console.log("❌ Subscription canceled.");
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false, 
  },
};
