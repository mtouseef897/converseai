// FeedbackList.tsx

import { Star } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface Feedback {
  id: number;
  username: string;
  profileImg: string;
  content: string;
}

// Fetch feedbacks in this file as well
async function getFeedbacks(): Promise<Feedback[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/get-feedback`, {
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Failed to fetch feedback data");

  return response.json();
}

// Server Component: Fetch feedback data directly in the component
const FeedbackList = async () => {
  const feedbacks = await getFeedbacks(); // Fetch feedbacks on the server side

  return (
    <>
      {feedbacks?.slice(0, 5).map((feedback) => (
        <li
          key={feedback.id}
          className="p-8 border border-[#191919]  flex flex-col items-start justify-start gap-4 max-w-sm rounded-xl shadow-md"
        >
          <div className="flex items-center justify-start gap-2 text-accent">
            <Star/>
            <Star/>
            <Star/>
            <Star/>
            <Star/>
          </div>
          <p className="text-gray-500">{feedback.content}</p>
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
            <span>
            <strong className="text-white">{feedback.username}</strong>
            <span className="block text-sm text-gray-500">Web Developer</span>
            </span>
          </span>
        
        </li>
      ))}
    </>
  );
};

// Fetching feedback data at the server side using async/await
// export async function getServerSideProps() {
//   try {
//     const response = await fetch("http://localhost:3000/api/get-feedback", {
//       cache: "no-store",
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch feedback data");
//     }

//     const feedbacks: Feedback[] = await response.json();

//     return { props: { feedbacks } };
//   } catch (error) {
//     console.error("Error fetching feedback:", error);
//     return { props: { feedbacks: [] } }; // Handle the case where data fetch fails
//   }
// }

export default FeedbackList;
