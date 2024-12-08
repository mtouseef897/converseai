import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Adjust the import path as necessary
import { feedbacks } from "@/lib/db/schema"; // Adjust the import path as necessary
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node"; 
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const { userId } = await auth(); // Get userId from Clerk

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { content } = await req.json();

    if (!content) {
      return NextResponse.json({ error: "Feedback content is required" }, { status: 400 });
    }

    // Fetch user details from Clerk using the userId
    const user = await clerkClient.users.getUser(userId);
    console.log("The user is this ",user)

    const username = user.firstName as string; // Adjust if your Clerk setup uses a different field name
    const profileImg = user.imageUrl as string; // Adjust if your Clerk setup uses a different field name

    // Insert feedback into the database
    await db.insert(feedbacks).values({
      userId,
      username,
      profileImg,
      content,
    });

    revalidatePath("/");

    return NextResponse.json({ message: "Feedback submitted successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
