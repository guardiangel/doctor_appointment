import React, { useState } from "react";
import { HandleResult, UserLoginState } from "../interfaces/utils";
import { useUserContext } from "../context/UserContext";

type Props = {};

const ProvideFeedBack = (props: Props) => {
  const currentUser: UserLoginState = useUserContext();

  const [feedBack, setFeedBack] = useState("");

  const [handleResult, setHandleResult] = useState<HandleResult>({
    status: "",
    message: "",
  });

  async function handleSubmit() {
    const data = { feedBackUserId: currentUser.userId, content: feedBack };
    const feedBackResult = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/feedback`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    await feedBackResult.json().then((result) => {
      if (result.status === "8888") {
        setFeedBack("");
      }
      setHandleResult(result);
    });
  }

  return (
    <div>
      <div className="text-center text-blue-500 underline text-4xl">
        FeedBack
      </div>
      <div className="text-center text-xl">
        FeedbaK:
        <textarea
          className="border-2 mt-10 w-2/6 min-w-[50px] h-40"
          value={feedBack}
          onChange={(e) => setFeedBack(e.target.value)}
        />
      </div>
      <div className="text-center justify-center  text-2xl mt-2 ">
        <button
          className="w-32 h-16 bg-gray-200 rounded-full shadow-lg"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      {handleResult?.status !== "" && (
        <div className="text-center text-red-500 underline text-2xl mt-5">
          {handleResult?.message}
        </div>
      )}
    </div>
  );
};

export default ProvideFeedBack;
