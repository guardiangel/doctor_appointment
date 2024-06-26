import Image from "next/image";
import React from "react";
import hospital from "public/assets/hospital.jpg";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  return (
    <header className="mb-5">
      <nav className="flex justify-between items-center w-full bg-wh-900 text-wh-10 px-10"></nav>
      <div className="flex justify-between gap-8 mt-5 mb-4 mx-10">
        <div className="basis-2/3 md:mt-3">
          <h3 className="font-bold text-3xl md:text-3xl">
            Doctor Appointment System
          </h3>
        </div>
        <div className="basis-full relative w-auto h-32 bg-wh-50">
          <Image
            fill
            style={{ objectFit: "cover" }}
            alt="adv"
            placeholder="blur"
            sizes="(max-width:480px) 100vw,
          (max-width:768px) 72vw,
          (max-width:1060px) 50vw
          "
            src={hospital}
          />
        </div>
      </div>

      <hr className="border-1 mx-10" />
    </header>
  );
};

export default Navbar;
