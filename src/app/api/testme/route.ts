import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Adjust this import based on your setup
import { chats, feedbacks, premiumUsers, sharedChats, userSubscriptions } from "@/lib/db/schema"; // Import your sharedChats schema

export async function GET() {
  try {
    // Query the database to retrieve all entries in the sharedChats table
    // const sharedChatsData = await db.select().from(sharedChats).execute();
    // // Return the data as JSON response
    // return NextResponse.json(sharedChatsData, { status: 200 });
    // Query the database to retrieve all entries in the sharedChats table
    const sharedChatsData = await db.select().from(premiumUsers).execute();
    // Return the data as JSON response
    return NextResponse.json(sharedChatsData, { status: 200 });
  } catch (error) {
    console.error("Error fetching shared chats:", error);
    return NextResponse.json({ error: "Failed to retrieve shared chats" }, { status: 500 });
  }
}

export async function DELETE() {
    try {
      // Delete all entries in sharedChats
      await db.delete(sharedChats).execute();
      return NextResponse.json({ message: "All shared chats deleted successfully" }, { status: 200 });
    } catch (error) {
      console.error("Error deleting shared chats:", error);
      return NextResponse.json({ error: "Failed to delete shared chats" }, { status: 500 });
    }
  }
  
