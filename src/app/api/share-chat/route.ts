import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Adjust the import path as necessary
import { sharedChats } from "@/lib/db/schema"; // Import your schema
import { nanoid } from "nanoid"; // For generating unique links
import { eq } from "drizzle-orm"; // Import `eq` function for equality checks

// GET route: Fetch existing shared link
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const chatId = searchParams.get("chat_id");

  if (!chatId) {
    return NextResponse.json({ error: "chat_id is required" }, { status: 400 });
  }

  try {
    // Correct syntax to query using Drizzle ORM and `eq`
    const result = await db
      .select()
      .from(sharedChats)
      .where(eq(sharedChats.chatId, Number(chatId))) // Using `eq()` for equality check
      .limit(1)
      .execute(); // Use `execute()` instead of `get()`

    if (result.length === 0) {
      return NextResponse.json({ error: "No shared link found for this chat" }, { status: 404 });
    }

    const sharedLink = result[0].sharedLink;

    return NextResponse.json({ sharedLink });
  } catch (error) {
    console.error("Error fetching shared link:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST route: Generate new shared link
export async function POST(req: Request) {
  const { chatId } = await req.json();

  if (!chatId) {
    return NextResponse.json({ error: "chatId is required" }, { status: 400 });
  }

  try {
    // Check if the link already exists using `eq()`
    const existingLinkResult = await db
      .select()
      .from(sharedChats)
      .where(eq(sharedChats.chatId, Number(chatId))) // Using `eq()` for equality check
      .limit(1)
      .execute(); // Use `execute()` instead of `get()`

    if (existingLinkResult.length > 0) {
      return NextResponse.json({ sharedLink: existingLinkResult[0].sharedLink }, { status: 200 });
    }

    // Generate a new unique link (you can use nanoid or any custom method)
    // const newSharedLink = `http://localhost:3000/shared-chat/${nanoid(10)}`;
    const newSharedLink = `${nanoid(10)}`;

    // Insert the new shared link into the database
    await db.insert(sharedChats).values({
      chatId: Number(chatId),
      sharedLink: newSharedLink,
    }).execute(); // Ensure the query is executed

    return NextResponse.json({ sharedLink: newSharedLink }, { status: 201 });
  } catch (error) {
    console.error("Error generating shared link:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
