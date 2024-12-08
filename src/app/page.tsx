import FeedbackForm from "@/components/FeedbackForm";
import FeedbackList from "@/components/FeedbackList";
import Faqs from "@/components/frontend/Faqs";
import Features from "@/components/frontend/Features";
import Footer from "@/components/frontend/Footer";
import Header from "@/components/frontend/Header";
import Hero from "@/components/frontend/Hero";
import Introduction from "@/components/frontend/Introduction";
import Scope from "@/components/frontend/Scope";
import UserFeedbacks from "@/components/frontend/UserFeedbacks";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/ui/fileUpload";
import { db } from "@/lib/db";
import { chats, premiumUsers } from "@/lib/db/schema";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { ArrowRight, CrownIcon, LogIn } from "lucide-react";
import Link from "next/link";
export default async function Home() {
  const { userId } = await auth();
  let isPremiumUser = false;
  const isAuth = !!userId;
  let firstChat;

  if (userId) {
    isPremiumUser = await db
      .select()
      .from(premiumUsers)
      .where(eq(premiumUsers.userId, userId))
      .limit(1)
      .execute()
      .then((user) => user.length > 0); // Returns true if user exists, false if not

    firstChat = await db.select().from(chats).where(eq(chats.userId, userId));
    if (firstChat) {
      firstChat = firstChat[0];
    }
  }
  return (
    <div className="">
      <Header isPremiumUser={isPremiumUser} />
      <Hero
        isPremiumUser={isPremiumUser}
        isAuth={isAuth}
        firstChat={firstChat}
      />
      <Features />
      <Scope />
      <Introduction />
      <Faqs />
      <UserFeedbacks />
      <Footer />
    </div>
  );
}
