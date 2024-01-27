"use client";
import { useEffect, useState } from "react";
import Login from "./login/Login";
import Navbar from "./(shared)/Navbar";

export default function Home() {
  //1 means admin, 2 means doctor, 3 means patient
  const [type, setType] = useState("");

  {
    /**userEffect only work at client side */
  }
  //We just put contextApi in MainPage for this demo.
  useEffect(() => {
    const loginUserStateString = sessionStorage.getItem("loginUserState");
    const loginUser =
      loginUserStateString === null ? null : JSON.parse(loginUserStateString);
    if (loginUser !== null) {
      window.alert(
        "For this demo, please don't refresh the whole browser using F5 on keyboard or the refresh button in the browser!"
      );
      sessionStorage.removeItem("loginUserState");
    }
  }, []);

  const handleType = (type: string) => {
    setType(type);
    return "";
  };

  return (
    <main className="px-10 leading-7">
      <Navbar />
      {/**three login buttons */}
      {type == "" && (
        <div className="sm:grid grid-cols-3 grid-rows-3 gap-x-2 gap-y-2 my-5">
          <div className="p-8">
            <button
              className="w-40 h-40 rounded-full 
                       bg-blue-500 hover:bg-red-500 text-white"
              onClick={() => setType("1")}
            >
              Admin Login
            </button>
          </div>

          <div className="p-8">
            <button
              className="w-40 h-40 rounded-full 
                       bg-blue-500 hover:bg-red-500 text-white"
              onClick={() => setType("2")}
            >
              Doctor Login
            </button>
          </div>

          <div className="p-8">
            <button
              className="w-40 h-40 rounded-full 
                       bg-blue-500 hover:bg-red-500 text-white"
              onClick={() => setType("3")}
            >
              Patient Login
            </button>
          </div>
        </div>
      )}

      {(type == "1" || type == "2" || type == "3") && (
        <Login type={type} handleType={handleType} />
      )}
    </main>
  );
}
