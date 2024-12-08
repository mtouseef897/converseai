import React from "react";
import FeedbackList from "../FeedbackList";

const UserFeedbacks = () => {
  return (
    <div className="bg-black">
      <div className="content-container py-16 md:py-24">
        <div className="text-white  max-w-[800px] mx-auto mt-8 text-5xl md:text-7xl font-bold text-center">
          Positive feedback from our users
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
          <FeedbackList/>
        </ul>

      </div>
    </div>
  );
};

export default UserFeedbacks;
