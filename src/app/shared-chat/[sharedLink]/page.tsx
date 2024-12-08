import { db } from "@/lib/db";
import { sharedChats, chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import ChatComponent from "@/components/ChatComponent";
import ChatSideBar from "@/components/ChatSideBar";
import PDFViewer from "@/components/PDFViewer";

type Props = {
  params: {
    sharedLink: string;
  };
};

const SharedChatPage = async ({ params: { sharedLink } }: Props) => {
  // Query the sharedChats table to get the chatId for the provided sharedLink
  const sharedChat = await db
    .select()
    .from(sharedChats)
    .where(eq(sharedChats.sharedLink, sharedLink))
    .execute();

  if (sharedChat.length === 0) {
    // If no shared chat is found, redirect to homepage
    // return redirect("/");
    console.log("No shared chat found");
  }
  console.log("sharedChat", sharedChat);
  // Get the chatId from the shared chat data
  const chatId = sharedChat?.[0]?.chatId;

  // Query the chats table to get the actual chat data using chatId
  const chat = await db
    .select()
    .from(chats)
    .where(eq(chats.id, chatId))
    .execute();

  if (chat.length === 0) {
    // If no chat is found, redirect to homepage
    // return redirect("/");
    console.log("No caht data found ");
  }

  const currentChat = chat[0]; // Extract the chat data

  return (
    <div className="flex h-screen">
      {/* Chat Sidebar */}
      {/* <div className="flex-none w-100 max-h-screen overflow-y-auto">
        <ChatSideBar
          chats={[currentChat]}
          chatId={currentChat?.id}
          isPro={false}
        />
      </div> */}

      {/* PDF Viewer */}
      <div className="flex-1 max-h-screen overflow-y-auto p-4">
        <PDFViewer pdf_url={currentChat?.pdfUrl || ""} />
      </div>

      {/* Chat Component */}
      <div className="flex-1 border-l border-l-slate-200 max-h-screen overflow-y-auto">
        <ChatComponent chatId={currentChat?.id} shareStatus={true} />
      </div>
    </div>
  );
};

export default SharedChatPage;
