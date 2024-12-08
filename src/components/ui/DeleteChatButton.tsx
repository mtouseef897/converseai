import axios from "axios";
import { AlertCircle, Trash } from "lucide-react";
import { useState, FC } from "react";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";

// Define props type for the DeleteChatButton component
interface DeleteChatButtonProps {
  chatId: number;
  onDeleteSuccess: (chatId: number) => void;
}

const DeleteChatButton: FC<DeleteChatButtonProps> = ({
  chatId,
  onDeleteSuccess,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleDelete = async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await axios.delete(`/api/delete-chat?chat_id=${chatId}`);

      if (response.status === 200) {
        onDeleteSuccess(chatId); // Notify parent about successful deletion
        toast.success("Chat Deleted!");
        // window.location.reload();
      }
    } catch (err) {
      console.error("Error deleting chat:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-[1] flex items-center justify-center">
      <button onClick={handleDelete} disabled={loading}>
        {loading ? (
          <Oval
            visible={true}
            height="16"
            width="16"
            color="#fff"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        ) : (
          <span className="flex items-center justify-center">
            <Trash className=" text-xs w-4" />
            {error && (
              <p style={{ color: "red" }}>
                <AlertCircle className=" text-xs w-4" />
              </p>
            )}
          </span>
        )}
      </button>
    </div>
  );
};

export default DeleteChatButton;
