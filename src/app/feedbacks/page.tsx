// FeedbackPage.tsx

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { FC } from "react";

interface Feedback {
  id: number;
  username: string;
  profileImg: string;
  content: string;
}

// Fetch feedbacks in this file as well
async function getFeedbacks(): Promise<Feedback[]> {
  const response = await fetch("http://localhost:3000/api/get-feedback", {
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Failed to fetch feedback data");

  return response.json();
}

// Server Component: Fetch feedback data directly in the component
const FeedbackPage = async () => {
  const feedbacks = await getFeedbacks(); // Fetch feedbacks on the server side

  return (
    <div className=" bg-gradient-to-tr from-rose-100 to-teal-100 p-16">
      <a href="/">
        <Button className="bg-transparent text-black border border-black hover:bg-black hover:text-white">
          <ArrowLeft className="mr-2" />
          Back to Home
        </Button>
      </a>
      <h2 className="font-bold text-2xl  text-center mb-8">All Feedbacks</h2>
      <ul className="grid grid-cols-4 gap-8">
        {feedbacks?.map((feedback) => (
          <li
            key={feedback.id}
            className="bg-white p-8 flex flex-col items-start justify-start gap-4 max-w-sm rounded-xl shadow-md flex-wrap"
          >
            <span className="flex items-center justify-start gap-4">
              {feedback.profileImg && (
                <img
                  src={feedback.profileImg}
                  alt={`${feedback.username}'s profile`}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                  }}
                />
              )}
              <strong>{feedback.username}</strong>
            </span>
            <p className="text-gray-500">{feedback.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackPage;
