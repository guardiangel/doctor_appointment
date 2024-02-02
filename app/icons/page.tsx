"use client";
import React from "react";
import { useRouter } from "next/navigation";
type Props = {};

const DefaultIconPage = (props: Props) => {
  const router = useRouter();
  function forwardToLogin(type: string) {
    router.push(`/login?type=${type}`);
  }

  return (
    <>
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
      <div className="text-center text-red-400 text-3xl ">
        After logging in, please do not use F5 or the &quot;Reload this
        page&quot; button next to the address bar to refresh the entire page.
        This project uses contextAPI, which is only valid after the user logs
        in. Once you refresh the page, you will return to the login page.
      </div>
    </>
  );
};

export default DefaultIconPage;
