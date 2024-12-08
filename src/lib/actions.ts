"use server";

import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe"; // Ensure you have Stripe SDK initialized in lib/stripe.ts
import { auth } from "@clerk/nextjs/server"; // assuming you’re using Clerk for authentication

export async function BuyNow() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User must be authenticated to create a checkout session");
  }

  try {
    // Create a simple checkout session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: parseInt(process.env.NEXT_PUBLIC_UPGRADE_PLAN_PRICE as string), // Amount in cents, update as needed
            product_data: {
              name: "Upgrade to Premium Plan of ConversAi Tool",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId, // add userId from authenticated user
      },
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN}`,
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}`,
    });

    // Redirect to the Stripe session URL
    // return redirect(session.url as string);
       // Return session URL instead of redirecting
       return { url: session.url };
  } catch (error) {
    console.error("Error creating checkout session:", error);
  }
}
