import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { UserLoginState } from "../interfaces/utils";

type Props = {};

const ViewBooking = (props: Props) => {
  const userLoginState: UserLoginState = useUserContext();
  const [appointmentId, setAppointmentId] = useState("");
  const [flag, setFlag] = useState(0);

  function isNumeric(value: any) {
    return /^\d+$/.test(value);
  }

  async function handleDelete() {
    if (!isNumeric(appointmentId)) {
      window.alert("Appointment Id is number!");
      return;
    }

    if (window.confirm("Want to cancel appointment, click ok button")) {
      const data = { appointmentId: appointmentId };
      const appointment = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/appointment`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      await appointment.json().then((result) => {
        if (result !== null && result.appointmentId) {
          setFlag(1);
        } else {
          setFlag(2);
        }
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
        {flag === 1 && (
          <div className="text-center text-red-500 underline text-lg">
            Delete {appointmentId} successfully.
          </div>
        )}
        {flag === 2 && (
          <div className="text-center text-red-500  text-lg">
            Delete {appointmentId} failed, please check the appointmentId is
            correct.
          </div>
        )}
      </div>
    </>
  );
};

export default ViewBooking;
