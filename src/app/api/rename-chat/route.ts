import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Adjust the import path as necessary
import { chats } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function PUT(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { chat_id, new_name } = await req.json();

    if (!chat_id || !new_name) {
      return NextResponse.json({ error: "Chat ID and new name are required" }, { status: 400 });
    }

    // Check if the chat exists and belongs to the user
    const chat = await db
      .select()
      .from(chats)
      .where(eq(chats.id, Number(chat_id)))
      .execute(); // Use execute instead of get

    // Access the first element of the chat array
    const chatRecord = chat[0];

    if (!chatRecord || chatRecord.userId !== userId) {
      return NextResponse.json({ error: "Chat not found or access denied" }, { status: 404 });
    }

    // Update the chat name
    await db
      .update(chats)
      .set({ pdfName: new_name })
      .where(eq(chats.id, Number(chat_id)))
      .execute(); // Ensure that you execute the update

    return NextResponse.json({ message: "Chat name updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating chat name:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
