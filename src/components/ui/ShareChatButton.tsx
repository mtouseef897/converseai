import axios from "axios";
import { FC, useState } from "react";
import { Copy, Share2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";

interface ShareChatButtonProps {
  chatId: number;
}

const ShareChatButton: FC<ShareChatButtonProps> = ({ chatId }) => {
  const [loading, setLoading] = useState<boolean>(false);

  // Handle link generation and copy to clipboard
  const handleShare = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/share-chat", { chatId });
      if (response.status === 200 || response.status === 201) {
        const linkID = response.data.sharedLink;
        const newSharedLink = `http://localhost:3000/shared-chat/${linkID}`;
        navigator.clipboard.writeText(newSharedLink);
        toast.success("Shareable link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error generating shared link:", error);
      toast.error("Failed to generate shareable link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleShare} disabled={loading} className="share-button">
      {loading ? (
        <Oval
          visible={true}
          height="16"
          width="16"
          color="#fff"
          ariaLabel="oval-loading"
        />
      ) : (
        <span className="flex items-center">
          <Share2Icon className="ml-2 text-xs w-4" />
        </span>
      )}
    </button>
  );
};

export default ShareChatButton;
