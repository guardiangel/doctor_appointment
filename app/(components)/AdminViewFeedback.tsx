import React, { useEffect, useRef, useState } from "react";
import { FeedBackEntity } from "../interfaces/utils";
import moment from "moment";

type Props = {};

const AdminViewFeedback = (props: Props) => {
  const [feedbacks, setFeedbacks] = useState<FeedBackEntity[]>();

  const refFeedback = useRef(() => {});

  refFeedback.current = () => {
    getAllFeedback();
  };

  //remove the warning when there is no parameter in the second parameter position of useEffect
  useEffect(() => {
    refFeedback.current();
  }, []);

  async function getAllFeedback() {
    const feedbacks = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/feedback`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    await feedbacks.json().then((result) => {
      setFeedbacks(result);
    });
  }

  return (
    <div>
      <div className="text-center text-blue-500 underline text-lg mb-5">
        View Feedbacks
      </div>

      <div className="sm:grid grid-cols-3 m-auto w-5/6 min-w-[20px] bg-yellow-500 text-center">
        <div className="border-2">UId</div>
        <div className="border-2">Feed</div>
        <div className="border-2">Date</div>
      </div>

      {feedbacks?.map((feedback) => (
        <div
          className="sm:grid grid-cols-3 m-auto w-5/6 min-w-[20px] bg-yellow-200 text-center"
          key={feedback.id}
        >
          <div className="border-1">{feedback.feedBackUserId}</div>
          <div className="border-1">{feedback.content}</div>
          <div className="border-1">
            {moment(feedback.createdAt).format("YYYY-MM-DD")}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminViewFeedback;
