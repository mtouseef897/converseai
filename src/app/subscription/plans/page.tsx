"use client";
import { FC } from "react";
import { Button } from "@/components/ui/button"; // assuming a button component is available in your project
import { CheckCircle } from "lucide-react"; // for indicating the current plan icon
import { BuyNow } from "@/lib/actions";
import { formatCurrency } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function UpgradePlansPage() {
  const router = useRouter();

  const handleUpgrade: () => Promise<void> = async () => {
    const result = await BuyNow();

    if (result?.url) {
      // Client-side redirect
      router.push(result.url);
    } else {
      console.error("Failed to create session:");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Upgrade your plan</h1>

      <div className="flex flex-col lg:flex-row gap-8 max-w-4xl w-full">
        {/* Free Plan */}
        <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold">Free</h2>
          <p className="text-4xl font-bold my-4">$0</p>
          <p className="text-sm text-gray-500">USD/month</p>
          <p className="mt-4 text-gray-700">
            Explore how AI can help you with everyday tasks
          </p>

          <div className="mt-6 text-green-600 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            <span>Your current plan</span>
          </div>

          <ul className="mt-4 text-gray-600 space-y-2 text-sm">
            <li>Assistance with writing, problem solving, and more</li>
            <li>Access to GPT-4o mini</li>
            <li>Limited access to GPT‑4o</li>
            <li>
              Limited access to data analysis, file uploads, vision, web
              browsing, and image generation
            </li>
            <li>Use custom GPTs</li>
          </ul>

          <p className="text-blue-500 mt-4 text-sm cursor-pointer">
            Have an existing plan? See billing help
          </p>
        </div>

        {/* Plus Plan */}
        <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold">Plus</h2>
          <p className="text-4xl font-bold my-4">
            {formatCurrency(
              parseInt(process.env.NEXT_PUBLIC_UPGRADE_PLAN_PRICE as string)
            )}
          </p>
          <p className="text-sm text-gray-500">USD/month</p>
          <p className="mt-4 text-gray-700">
            Boost your productivity with expanded access
          </p>
          {/* <form action={BuyNow}> */}
          <button
            onClick={handleUpgrade}
            type="submit"
            className="mt-6 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Upgrade to Plus
          </button>
          {/* </form> */}

          <ul className="mt-4 text-gray-600 space-y-2 text-sm">
            <li>Everything in Free</li>
            <li>Early access to new features</li>
            <li>Access to OpenAI o1-preview, OpenAI o1-mini</li>
            <li>Access to GPT-4o, GPT-4o mini, GPT-4</li>
            <li>Up to 5x more messages for GPT4o</li>
            <li>
              Access to data analysis, file uploads, vision, web browsing, and
              image generation
            </li>
            <li>Access to Advanced Voice Mode</li>
          </ul>

          <p className="text-gray-500 mt-4 text-sm">Limits apply</p>
          <p className="text-blue-500 mt-2 text-sm cursor-pointer">
            Need more capabilities for your business?
          </p>
        </div>
      </div>
    </div>
  );
}
