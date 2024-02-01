import React, { useEffect, useRef, useState } from "react";
import { useUserContext } from "../context/UserContext";
import {
  AppointmentEntity,
  HandleResult,
  UserLoginState,
} from "../interfaces/utils";

type Props = {};

const AdminViewAppointment = (props: Props) => {
  const [appointments, setAppointments] = useState<AppointmentEntity[]>();

  const [result, setResult] = useState<HandleResult>({
    status: "",
    message: "",
  });

  const refUserAppointment = useRef(() => {});

  refUserAppointment.current = () => {
    getAllAppointments();
  };

  //remove the warning when there is no parameter in the second parameter position of useEffect
  useEffect(() => {
    refUserAppointment.current();
  }, []);

  async function getAllAppointments() {
    const appointments = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/appointment?adminViewAppointments=adminViewAppointments`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    await appointments.json().then((result) => {
      setAppointments(result);
    });
  }

  function isNumeric(value: any) {
    return /^\d+$/.test(value);
  }

  const handleDelete = async (appointmentId: number) => {
    // if (!isNumeric(appointmentId)) {
    //   window.alert("Appointment Id is number!");
    //   return;
    // }

    if (window.confirm(`Confirm to delete appointmentId ${appointmentId}`)) {
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
  };

  return (
    <div>
      <div className="text-center text-blue-500 underline text-lg mb-10">
        Appointments
      </div>

      <div className="sm:grid grid-cols-6 m-auto w-5/6 min-w-[20px] bg-yellow-500 text-center">
        <div className="border-1">UId</div>
        <div className="border-1">AppointmentId</div>
        <div className="border-1">DName</div>
        <div className="border-1">Date</div>
        <div className="border-1">Time</div>
        <div className="border-1">Delete</div>
      </div>

      {appointments?.map((appointment) => (
        <div
          className="sm:grid grid-cols-6 m-auto w-5/6 min-w-[20px] bg-yellow-200 text-center"
          key={appointment.id}
        >
          <div className="border-1">{appointment.patientId}</div>
          <div className="border-1">{appointment.appointmentId}</div>
          <div className="border-1">{appointment.patient?.userName}</div>
          <div className="border-1">{appointment.appointmentDate}</div>
          <div className="border-1">{appointment.timeSlotValue}</div>
          <div>
            <a
              className="underline text-blue-700"
              onClick={() => handleDelete(appointment.appointmentId)}
            >
              Delete
            </a>
          </div>
        </div>
      ))}
      {result?.status !== "" && (
        <div className="text-center text-red-500 underline text-lg">
          {result?.message}
        </div>
      )}
    </div>
  );
};

export default AdminViewAppointment;
