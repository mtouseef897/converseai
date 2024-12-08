import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Check,
  Cross,
  CrossIcon,
  Delete,
  Edit,
  FolderClosed,
  MessageCircle,
  X,
} from "lucide-react";
import DeleteChatButton from "./DeleteChatButton";
import ShareChatButton from "./ShareChatButton";

interface Chat {
  chat: {
    id: number;
    pdfName: string;
  };

  handleDeleteSuccess: (chatId: number) => void;
  // other chat properties
}

const ChatComponent: React.FC<Chat> = ({
  chat,
  handleDeleteSuccess,
}) => {
  const [newChatName, setNewChatName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleRenameChat = async () => {
    try {
      const response = await axios.put("/api/rename-chat", {
        chat_id: chat.id,
        new_name: newChatName,
      });
      toast.success("Chat Name Updated!");
      setIsEditing(false);
      // Reload the page to reflect the changes
      window.location.reload();
    } catch (error) {
      console.error("Error renaming chat:", error);
      // Handle error (show a message to the user, etc.)
    }
  };

  return (
    <div className="flex-1 ">
      {isEditing ? (
        <div className="flex  items-center justify-center  ">
          <input
            type="text"
            value={newChatName}
            onChange={(e) => setNewChatName(e.target.value)}
            placeholder="Enter new chat name"
            className="text-black flex-1 w-[20px]"
            defaultValue={chat.pdfName}
          />
          <div className="w-[50px]">
            <button onClick={handleRenameChat}>
              {" "}
              <Check className="ml-2 text-xs w-4 " />
            </button>
            <button onClick={() => setIsEditing(false)}>
              <X className="ml-2 text-xs w-4 " />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between   flex-1 gap-1 ">
          <MessageCircle className=" flex-[0.5] !w-2" />
          {/* <h3 className="flex-[2] overflow-hidden">test</h3> */}
          <h3 className="flex-[2] overflow-hidden">{chat.pdfName}</h3>
          <div className="flex items-center flex-[1]">
            <button onClick={() => setIsEditing(true)}>
              {" "}
              <Edit className=" text-xs w-4 " />
            </button>
            <DeleteChatButton
              chatId={chat.id}
              onDeleteSuccess={handleDeleteSuccess}
            />
            <ShareChatButton chatId={chat.id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;
