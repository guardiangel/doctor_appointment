"use client";
import { useEffect, useState } from "react";
import Navbar from "./(shared)/Navbar";
import DefaultIconPage from "./index/page";

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
    <div className="px-10 leading-7">
      <Navbar />
      {/**three login buttons */}
      <DefaultIconPage />
    </div>
  );
}
