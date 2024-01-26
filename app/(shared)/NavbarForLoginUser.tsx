import Image from "next/image";
import React from "react";

type Props = {
  type: string;
  handleOperation: (arg: string) => string;
};

const NavbarForLoginUser = ({ type, handleOperation }: Props) => {
  return (
    <header className="mb-1">
      {type == "1" && (
        <div className="sm:grid grid-cols-6 grid-rows-1 gap-x-1 gap-y-1 my-2 bg-blue-300">
          <div className="p-8">Add doctor</div>
          <div className="p-8">View Doctor</div>
          <div className="p-8">View Customers</div>
          <div className="p-8">View Appointments</div>
          <div className="p-8">View Feedback</div>
          <div className="p-8">Logout</div>
        </div>
      )}
      {type == "2" && (
        <div className="sm:grid grid-cols-5 grid-rows-1 gap-x-1 gap-y-1 my-2 bg-blue-300">
          <div className="p-8">My Appointments</div>
          <div className="p-8">View Customer</div>
          <div className="p-8">Add Description</div>
          <div className="p-8">My Details</div>
          <div className="p-8">Search Doctor</div>
          <div className="p-8">Logout</div>
        </div>
      )}
      {type == "3" && (
        <div className="sm:grid grid-cols-7 grid-rows-1 gap-x-1 gap-y-1 my-2 bg-blue-300">
          <div className="p-8" onClick={() => handleOperation("viewDetail")}>
            My Details
          </div>
          <div className="p-8">Book Appointment</div>
          <div className="p-8">View Bookings</div>
          <div className="p-8">Cancel Booking</div>
          <div className="p-8">Search Doctor</div>
          <div className="p-8">Feedback</div>
          <div className="p-8">Logout</div>
        </div>
      )}
      <hr className="border-1 mx-10" />
    </header>
  );
};

export default NavbarForLoginUser;
