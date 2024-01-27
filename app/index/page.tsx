import React from "react";
import { useRouter } from "next/navigation";
type Props = {};

const DefaultIconPage = (props: Props) => {
  const router = useRouter();
  function forwardToLogin(type: string) {
    router.push(`/login?type=${type}`);
  }

  return (
    <div className="sm:grid grid-cols-3 grid-rows-3 gap-x-2 gap-y-2 my-5">
      <div className="p-8">
        <button
          className="w-40 h-40 rounded-full 
               bg-blue-500 hover:bg-red-500 text-white"
          onClick={() => forwardToLogin("1")}
        >
          Admin Login
        </button>
      </div>

      <div className="p-8">
        <button
          className="w-40 h-40 rounded-full 
               bg-blue-500 hover:bg-red-500 text-white"
          onClick={() => forwardToLogin("2")}
        >
          Doctor Login
        </button>
      </div>

      <div className="p-8">
        <button
          className="w-40 h-40 rounded-full 
               bg-blue-500 hover:bg-red-500 text-white"
          onClick={() => forwardToLogin("3")}
        >
          Patient Login
        </button>
      </div>
    </div>
  );
};

export default DefaultIconPage;
