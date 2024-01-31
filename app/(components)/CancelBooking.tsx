import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { HandleResult, UserLoginState } from "../interfaces/utils";

type Props = {};

const ViewBooking = (props: Props) => {
  const userLoginState: UserLoginState = useUserContext();
  const [appointmentId, setAppointmentId] = useState("");
  const [result, setResult] = useState<HandleResult>({
    status: "",
    message: "",
  });

  function isNumeric(value: any) {
    return /^\d+$/.test(value);
  }

  async function handleDelete() {
    if (!isNumeric(appointmentId)) {
      window.alert("Appointment Id is number!");
      return;
    }

    if (window.confirm("Want to cancel appointment, Click ok button")) {
      const data = { appointmentId: appointmentId };
      const cancelResult = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/appointment`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      await cancelResult.json().then((result) => {
        setResult(result);
      });
    }
  }

  return (
    <>
      <div className="text-center text-blue-500 underline text-lg">
        Cancel Booking
      </div>

      <div className="text-center underline text-lg">
        Booking Id:
        <input
          id="appointmentId"
          name="appointmentId"
          placeholder="Please input appointment id"
          className="border-2 mt-5 mb-5"
          onChange={(e) => setAppointmentId(e.target.value)}
        />
        <button className="w-20 h-10 bg-blue-500" onClick={handleDelete}>
          Delete
        </button>
        {result?.status !== "" && (
          <div className="text-center text-red-500 underline text-lg">
            {result?.message}
          </div>
        )}
      </div>
    </>
  );
};

export default ViewBooking;
