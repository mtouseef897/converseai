import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

import { db } from "@/lib/db"; // Adjust import for the database connection
import { premiumUsers, userSubscriptions } from "@/lib/db/schema";

export async function POST(req) {
  // Get the raw body content from the request
  const body = await req.text();

  // Get the Stripe signature header
  const signature = headers().get("Stripe-Signature");

  let event;

  try {
    // Construct the event from the raw body and the Stripe signature
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    // Return a 400 error if the signature verification fails
    return new Response("Webhook error; Signature does not match", {
      status: 400,
    });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      // Get the session object from the event
      const session = event.data.object;

      // Extract the necessary metadata from the session
      const { userId } = session.metadata;
      const payment = session.amount_total.toString() || "Null";

      if (!userId) {
        console.log("No user id Found");
        break;
      }

      try {
        // Insert the subscription data into the user_subscriptions table
        await db.insert(premiumUsers).values({
          userId,
          payment,
        });

        console.log("Subscription added to the database successfully.");
      } catch (error) {
        console.error("Error inserting subscription data:", error);
        return new Response("Internal Server Error", { status: 500 });
      }

      break;
    }
    default: {
      // Handle other Stripe events if needed
      console.log("Unhandled event type:", event.type);
    }
  }

  // Return a 200 response to Stripe to acknowledge the receipt of the event
  return new Response(null, { status: 200 });
}
