import ChatComponent from "@/components/ChatComponent";
import ChatSideBar from "@/components/ChatSideBar";
import PDFViewer from "@/components/PDFViewer";
import { db } from "@/lib/db";
import { chats, premiumUsers } from "@/lib/db/schema";
// import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type Props = {
  params: {
    chatId: string;
  };
};

const ChatPage = async ({ params: { chatId } }: Props) => {
  cookies()
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const isPremiumUser = await db
    .select()
    .from(premiumUsers)
    .where(eq(premiumUsers.userId, userId))
    .limit(1)
    .execute()
    .then((user) => user.length > 0); // Returns true if user exists, false if not

  const _chats = await db.select().from(chats).where(eq(chats.userId, userId));
  if (!_chats || !_chats.length) {
    return redirect("/");
  }

  if (!_chats.find((chat) => chat.id === parseInt(chatId))) {
    return redirect("/");
  }

  const currentChat = _chats.find((chat) => chat.id === parseInt(chatId));

  return (
    <div className="flex h-screen">
      {/* Chat Sidebar */}
      <div className="flex-[1] max-h-screen overflow-y-auto">
        <ChatSideBar
          chats={_chats}
          chatId={parseInt(chatId)}
          isPro={isPremiumUser}
        />
      </div>

      {/* PDF Viewer */}
      <div className="flex-[2] max-h-screen overflow-y-auto p-4">
        <PDFViewer pdf_url={currentChat?.pdfUrl || ""} />
      </div>

      {/* Chat Component */}
      <div className="flex-[2] border-l border-l-slate-200 h-screen overflow-y-auto ">
        <ChatComponent chatId={parseInt(chatId)} shareStatus={false} />
      </div>
    </div>
  );
};

export default ChatPage;
