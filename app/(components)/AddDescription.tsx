import React, { useRef, useState, useEffect } from "react";
import {
  AppointmentEntity,
  UserLoginState,
  HandleResult,
} from "../interfaces/utils";
import { useUserContext } from "../context/UserContext";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";

type Props = {};

const AddDescription = (props: Props) => {
  const userLoginState: UserLoginState = useUserContext();
  const [appointments, setAppointments] = useState<AppointmentEntity[]>();

  const [currentAppointment, setCurrentAppointment] =
    useState<AppointmentEntity>();

  const [handleResult, setHandleResult] = useState<HandleResult>({
    status: "",
    message: "",
  });

  const refUserAppointment = useRef(() => {});

  refUserAppointment.current = () => {
    getAllMyAppointment(userLoginState.userId);
  };

  //remove the warning when there is no parameter in the second parameter position of useEffect
  useEffect(() => {
    //getAllMyAppointment(userLoginState.userId);
    refUserAppointment.current();
  }, [handleResult]);

  //only display current day's appointments
  async function getAllMyAppointment(userId: string) {
    const appointments = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/appointment?viewMyAppointmentsCurrentDay=viewMyAppointmentsCurrentDay&doctorId=${userId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    await appointments.json().then((result) => {
      setAppointments(result);
    });
  }

  function expandTreatment(appointment: AppointmentEntity): void {
    setCurrentAppointment(appointment);
  }

  const initialValues = {
    appointmentId: currentAppointment?.appointmentId,
    patientId: currentAppointment?.patientId,
    patientName: currentAppointment?.patient.userName,
    dise: "",
    note: "",
    treatment: "",
  };

  const treatmentSchema = yup.object().shape({
    appointmentId: yup.string().required("required"),
    patientId: yup.string().required("required"),
    dise: yup.string().required("dise required"),
    note: yup.string().required("note required"),
    treatment: yup.string().required("treatment required"),
  });

  //handle submit event
  const handleSubmit = async (data: typeof initialValues) => {
    const treatment = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/treatment`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    await treatment.json().then((result) => {
      setHandleResult(result);
      if (result.status === "8888") {
        setCurrentAppointment(undefined);
      }
    });
  };

  return (
    <div>
      <div className="text-center text-blue-500 underline text-2xl mt-10">
        Add Treatment--(only display appointments in the current date)
      </div>
      {/**all the appointments */}
      <div className="sm:grid grid-cols-5 m-auto w-5/6 min-w-[20px] bg-yellow-500 mt-10 text-center text-xl">
        <div className="border-1">AppointmentId</div>
        <div className="border-1">UId</div>
        <div className="border-1">DName</div>
        <div className="border-1">Appointment Date</div>
        <div className="border-1">Time</div>
      </div>

      {appointments?.map((appointment) => (
        <div
          className="sm:grid grid-cols-5 m-auto w-5/6 min-w-[20px] bg-yellow-200 text-center text-xl"
          key={appointment.id}
          onClick={() => {
            setHandleResult({
              status: "",
              message: "",
            });
            expandTreatment(appointment);
          }}
        >
          <div className="border-1">{appointment.appointmentId}</div>
          <div className="border-1">{appointment.patientId}</div>
          <div className="border-1">{appointment.patient?.userName}</div>
          <div className="border-1">{appointment.appointmentDate}</div>
          <div className="border-1">{appointment.timeSlotValue}</div>
        </div>
      ))}

      {handleResult?.status !== "" && (
        <div className="text-center text-red-500 underline text-2xl mt-5">
          {handleResult?.message}
        </div>
      )}

      {currentAppointment && (
        <div className="mt-10">
          <Formik
            onSubmit={(e) => handleSubmit(e)}
            initialValues={initialValues}
            validationSchema={treatmentSchema}
            enableReinitialize={true}
            key={Date.now()} //Must have the attribute. Otherwise, will get a disgusting error.
          >
            <Form>
              <div className="sm:grid grid-cols-1 grid-rows-2 gap-x-2 gap-y-2 my-5 text-center align-baseline">
                {/**appointment id */}
                <div>
                  <label htmlFor="InputAppointmentId" className="text-xl">
                    AppointmentId:
                  </label>
                  <Field
                    id="InputAppointmentId"
                    name="appointmentId"
                    className="text-center align-middle w-1/6 min-w-[20px] px-5 py-2 border-2 bg-gray-200 text-xl"
                    readOnly
                  />
                  <ErrorMessage name="appointmentId" component="span" />
                </div>
                {/**patientId */}
                <div>
                  <label htmlFor="InputPatientId" className="text-xl">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PatientId:
                  </label>
                  <Field
                    id="InputPatientId"
                    name="patientId"
                    className="text-center align-middle w-1/6 min-w-[20px] px-5 py-2 border-2 bg-gray-200 text-xl ml-4 "
                    readOnly
                  />
                  <ErrorMessage name="patientId" component="span" />
                </div>
                {/**patient name */}
                <div>
                  <label htmlFor="InputPatientName" className="text-xl">
                    Patient Name:
                  </label>
                  <Field
                    id="InputPatientName"
                    name="patientName"
                    className="text-center align-middle w-1/6 min-w-[20px] px-5 py-2 border-2 bg-gray-200 ml-3 text-xl"
                    readOnly
                  />
                  <ErrorMessage name="patientName" component="span" />
                </div>

                {/**dise TreatmentFor */}
                <div>
                  <label htmlFor="InputTreatmentFor" className="text-xl">
                    Treatment&nbsp;For:
                  </label>
                  <Field
                    id="InputTreatmentFor"
                    name="dise"
                    className="text-center align-middle w-1/6 min-w-[20px] px-5 py-2 border-2 ml-2 text-xl"
                  />
                  <div>
                    <ErrorMessage name="dise" component="span" />
                  </div>
                </div>

                {/**treatment */}
                <div>
                  <label htmlFor="InputTreatment" className="text-xl">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Treatment:
                  </label>
                  <Field
                    id="InputTreatment"
                    name="treatment"
                    className="text-center align-middle w-1/6 min-w-[20px] px-5 py-2 border-2 ml-2 text-xl"
                  />
                  <div>
                    <ErrorMessage name="treatment" component="span" />
                  </div>
                </div>

                {/**note */}
                <div>
                  <label htmlFor="InputNote" className="text-xl">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Note:
                  </label>
                  <Field
                    id="InputNote"
                    name="note"
                    className="text-center align-middle w-1/6 min-w-[20px] px-5 py-2 border-2 ml-10 text-xl"
                  />
                  <div>
                    <ErrorMessage name="note" component="span" />
                  </div>
                </div>

                {/**button */}
                <div className="sm:grid m-auto text-center mt-10">
                  <button
                    className="w-20 h-10 bg-blue-300 rounded-full "
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      )}
      {/**treatment */}
    </div>
  );
};

export default AddDescription;
