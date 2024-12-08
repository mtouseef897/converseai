import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Adjust the import path as necessary
import { feedbacks } from "@/lib/db/schema"; // Adjust the import path as necessary
import { asc, desc } from "drizzle-orm";

export async function GET() {
  try {
    const feedbackList = await db
      .select()
      .from(feedbacks)
      .orderBy(desc(feedbacks.createdAt))
    //   .limit(5)
      .execute();

    return NextResponse.json(feedbackList, { status: 200 });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
