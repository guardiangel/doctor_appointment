"use client";
import { useEffect, useState } from "react";
import Navbar from "./(shared)/Navbar";
import DefaultIconPage from "./index/page";

export default function Home() {
  //1 means admin, 2 means doctor, 3 means patient
  const [type, setType] = useState("");

  return (
    <div className="px-10 leading-7">
      <Navbar />
      {/**three login buttons */}
      <DefaultIconPage />
    </div>
  );
}
