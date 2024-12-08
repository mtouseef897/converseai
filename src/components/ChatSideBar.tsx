"use client";
import { DrizzleChat } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import {
  CrownIcon,
  HomeIcon,
  MessageCircle,
  PlusCircle,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import ChatComponent from "./ui/RenameChatButton";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Props = {
  chats: DrizzleChat[];
  chatId: number;
  isPro: boolean;
};

// Define the type for a chat object
interface Chat {
  id: number;
  pdfName: string;
}

// Define props type for the ChatList component
interface ChatListProps {
  initialChats: Chat[];
}

const ChatSideBar = ({ chats, chatId, isPro }: Props) => {
  const [chatstoShow, setChatstoShow] = useState<Chat[]>(chats);
  const router = useRouter(); // To handle redirection

  // console.log(chatstoShow)

  const handleDeleteSuccess = (deletedChatId: number) => {
    const updatedChats = chatstoShow.filter(
      (chat) => chat.id !== deletedChatId
    );
    setChatstoShow(updatedChats);

    if (updatedChats.length === 0) {
      router.push("/"); // Redirect if no chats are left
    } else {
      // console.log("Redirecting...");
      // toast.loading("Redirecting...");
      router.push(`/chat/${updatedChats[0].id}`);
    }
  };


  // useEffect(() => {
  //   setChatstoShow(chats);
  // }, [chats]);

  return (
    <div className="relative w-full h-screen p-4 text-gray-200 bg-black overflow-hidden">
      <Link href="/">
        <Button className="w-full border-dashed border-white border bg-black mb-4">
          <PlusCircle className="mr-2 w-4 h-4" />
          New Chat
        </Button>
      </Link>

      {/* Scrollable Chat List */}
      {/* <div className="flex flex-col gap-2 h-[calc(100vh-5rem)] overflow-y-auto">
        {chats.length === 0 ? (
          <p className="text-gray-500">No chats available.</p>
        ) : (
          chatstoShow.map((chat) => (
            <Link key={chat.id} href={`/chat/${chat.id}`} className=" w-full ">
              <div
                className={cn(
                  "rounded-lg p-3 text-slate-300 flex items-center w-full",
                  {
                    "bg-accent text-white": chat.id === chatId,
                    "hover:text-white": chat.id !== chatId,
                  }
                )}
              >
           
                <ChatComponent
                  chat={chat}
                  handleDeleteSuccess={handleDeleteSuccess}
                />
 
              </div>
            </Link>
          ))
        )}
      </div> */}

      <div className="flex flex-col gap-2 h-[calc(100vh-5rem)] overflow-y-auto">
  {chatstoShow.length === 0 ? (
    <p className="text-gray-500">No chats available.</p>
  ) : (
    chatstoShow.map((chat) => (
      <Link key={chat.id} href={`/chat/${chat.id}`} className=" w-full ">
        <div
          className={cn(
            "rounded-lg p-3 text-slate-300 flex items-center w-full",
            {
              "bg-accent text-white": chat.id === chatId,
              "hover:text-white": chat.id !== chatId,
            }
          )}
        >
          <ChatComponent
            chat={chat}
            handleDeleteSuccess={handleDeleteSuccess}
          />
        </div>
      </Link>
    ))
  )}
</div>
      <div className=" absolute bottom-0 left-0 right-0 mx-4">
        <Link href="/" className="">
          <Button className="w-full border-gray-200 border mb-4 hover:bg-gray-50/[0.34] bg-black">
            <HomeIcon className="mr-2 w-4 h-4" />
            Home
          </Button>
        </Link>
        {!isPro && (
          <Link href="/pricing" className="">
            <Button className="w-full border-gray-200 border mb-4 hover:bg-gray-50/[0.34] ">
              <CrownIcon className="mr-2 w-4 h-4" />
              Upgrade Plan
            </Button>
          </Link>
        )}
        {isPro && (
          <div className="flex items-center justify-center gap-2 text-yellow-600 p-2 ">
            <CrownIcon className="mr-2 w-4 h-4" />
            <p>Premium User</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSideBar;
