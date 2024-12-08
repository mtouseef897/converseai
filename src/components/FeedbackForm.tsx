"use client";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ArrowRight } from "lucide-react";

const FeedbackForm = () => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/api/create-feedback",
        {
          content,
        },
        {
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );
      toast.success(response.data.message);
      setContent(""); // Clear the input field
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full  flex-col items-end justify-start gap-4 flex mt-4   rounded-xl  overflow-hidden "
    >
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your feedback here..."
        required
        className="w-full border border-gray-200 p-2 rounded-xl "
      />
      <button
        type="submit"
        className="px-4 py-2 bg-black text-white text-base font-bold rounded-full flex items-center justify-center gap-2"
      >
        <span>Submit</span> <ArrowRight />
      </button>
    </form>
  );
};

export default FeedbackForm;
