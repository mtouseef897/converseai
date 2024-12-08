"use client";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

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
      className="w-full border flex-col items-end justify-start gap-8 flex mt-8 max-w-md mx-auto bg-white rounded-xl p-8 overflow-hidden "
    >
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your feedback here..."
        required
        className="w-full border border-gray-200 p-2"
      />
      <button type="submit" className="bg-black text-white  p-4 py-2 ">
        Submit Feedback
      </button>
    </form>
  );
};

export default FeedbackForm;
