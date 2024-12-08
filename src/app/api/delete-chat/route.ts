import { db } from "@/lib/db";
import { chats, message } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm"; // Ensure you import the correct operators.
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function DELETE(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url); // Parse the query parameters
    const chat_id = searchParams.get("chat_id");

    if (!chat_id) {
      return NextResponse.json({ error: "Chat ID is required" }, { status: 400 });
    }

    // Ensure the chat belongs to the current user
    const chat = await db
      .select()
      .from(chats)
      .where(and(eq(chats.id, Number(chat_id)), eq(chats.userId, userId)))
      .limit(1); // Limit 1 ensures we only get one result.

    if (chat.length === 0) {
      return NextResponse.json({ error: "Chat not found or access denied" }, { status: 404 });
    }

      // Delete related messages first
      await db.delete(message).where(eq(message.chatId, Number(chat_id)));
    // Delete the chat
    await db.delete(chats).where(eq(chats.id, Number(chat_id)));

    // revalidatePath("/","layout")
    return NextResponse.json({ message: "Chat deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
