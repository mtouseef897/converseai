import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sharedChats, chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const sharedLink = url.searchParams.get("sharedLink");

  if (!sharedLink) {
    return NextResponse.json({ error: "Missing sharedLink parameter" }, { status: 400 });
  }

  try {
    const sharedChat = await db
      .select({
        id: sharedChats.id,
        chatId: sharedChats.chatId,
        sharedLink: sharedChats.sharedLink,
      })
      .from(sharedChats)
      .where(eq(sharedChats.sharedLink, sharedLink))
      .execute();

    if (!sharedChat || sharedChat.length === 0) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }

    const chatId = sharedChat[0].chatId;

    const chatDetails = await db
      .select({
        id: chats.id,
        pdfName: chats.pdfName,
        pdfUrl: chats.pdfUrl,
        createdAt: chats.createdAt,
        userId: chats.userId,
        fileKey: chats.fileKey,
      })
      .from(chats)
      .where(eq(chats.id, chatId))
      .execute();

    if (!chatDetails || chatDetails.length === 0) {
      return NextResponse.json({ error: "Chat details not found" }, { status: 404 });
    }

    return NextResponse.json(chatDetails[0], { status: 200 });
  } catch (error) {
    console.error("Error retrieving shared chat:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
