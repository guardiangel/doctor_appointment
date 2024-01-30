import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import {
  AppointmentEntity,
  UserEntity,
  UserLoginState,
} from "../interfaces/utils";
import moment from "moment";

type Props = {};

const ViewBooking = (props: Props) => {
  const userLoginState: UserLoginState = useUserContext();
  const [appointments, setAppointments] = useState<AppointmentEntity[]>();

  useEffect(() => {
    getCurrentUserAppointment();
  }, []);

  async function getCurrentUserAppointment() {
    const appointments = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/appointment?viewBookingFlag=viewBookingFlag&userId=${userLoginState.userId}`,
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
    <>
      <div className="text-center text-blue-500 underline text-lg">
        Booking History
      </div>

      <div className="sm:grid grid-cols-6 m-auto w-5/6 min-w-[20px] bg-orange-400">
        <div className="border-2">AppointmentId</div>
        <div className="border-2">PatientId</div>
        <div className="border-2">Doctor Id</div>
        <div className="border-2">Doctor Name</div>
        <div className="border-2">Appointment Date</div>
        <div className="border-2">Time</div>
      </div>

      {appointments?.map((appointment, index) => (
        <>
          <div
            className="sm:grid grid-cols-5 m-auto w-5/6 min-w-[20px] bg-yellow-200"
            key={appointment.id}
          >
            <div className="border-2">{appointment.appointmentId}</div>
            <div className="border-2">{appointment.patientId}</div>
            <div className="border-2">{appointment.doctorId}</div>
            <div className="border-2">{appointment.doctor.userName}</div>
            <div className="border-2">{appointment.appointmentDate}</div>
            <div className="border-2">{appointment.timeSlotValue}</div>
          </div>
        </>
      ))}
    </>
  );
};

export default ViewBooking;
