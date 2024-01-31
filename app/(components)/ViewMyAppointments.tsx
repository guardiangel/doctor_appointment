import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { AppointmentEntity, UserLoginState } from "../interfaces/utils";

type Props = {};

const ViewMyAppointments = (props: Props) => {
  const userLoginState: UserLoginState = useUserContext();
  const [appointments, setAppointments] = useState<AppointmentEntity[]>();

  useEffect(() => {
    getAllMyAppointment(userLoginState.userId);
  }, []);

  async function getAllMyAppointment(userId: string) {
    const appointments = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/appointment?viewMyAppointmentsFlag=viewMyAppointmentsFlag&doctorId=${userLoginState.userId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    await appointments.json().then((result) => {
      setAppointments(result);
    });
  }

  return (
    <div>
      <div className="text-center text-blue-500 underline text-lg">
        Customer Details
      </div>

      <div className="sm:grid grid-cols-4 m-auto w-5/6 min-w-[20px] bg-yellow-500">
        <div className="border-2">UId</div>
        <div className="border-2">DName</div>
        <div className="border-2">Date</div>
        <div className="border-2">Time</div>
      </div>

      {appointments?.map((appointment) => (
        <div
          className="sm:grid grid-cols-4 m-auto w-5/6 min-w-[20px] bg-yellow-200"
          key={appointment.id}
        >
          <div className="border-1">{appointment.patientId}</div>
          <div className="border-1">{appointment.patient?.userName}</div>
          <div className="border-1">{appointment.appointmentDate}</div>
          <div className="border-1">{appointment.timeSlotValue}</div>
        </div>
      ))}
    </div>
  );
};

export default ViewMyAppointments;
