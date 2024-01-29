import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import {
  AppointmentEntity,
  CategoryEntity,
  TimeslotEntity,
  UserEntity,
} from "../interfaces/utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimeSlot from "./TimeSlot";
import moment from "moment";
type Props = {};

const SearchDoctor = (props: Props) => {
  const [categories, setCategories] = useState<CategoryEntity[]>();
  const [doctors, setDoctors] = useState<UserEntity[]>();
  const [maxAppointmentId, setMaxAppointmentId] = useState();

  //get the confirmed appointment regarding one doctor and date
  const [preConfirmedAppointments, setPreConfiredAppointments] =
    useState<AppointmentEntity[]>();

  //all time slots
  const [allTimeSlots, setAlTimeSlots] = useState<TimeslotEntity[]>([]);

  //data waited to be submitted
  const [appointmentDate, setAppointmentDate] = useState<string>(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedDoctorId, setSelectedDoctorId] = useState();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>();

  const [checkTimeSlotFlag, setCheckTimeSlotFlag] = useState(false);

  useEffect(() => {
    getAllTimeslots();
    searchAllDoctor();
    getAllCategory();
    getMaxAppointmentId();
  }, []);

  //choose an appointment data
  const handleSelectedDate = async () => {
    console.log("appoinment", appointmentDate, selectedDoctorId);
    if (appointmentDate && selectedDoctorId) {
      //get all the appointments of the current doctor in the current date
      const appointments = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/appointment?getConfirmedAppointment=getConfirmedAppointment&userId=${selectedDoctorId}&appointmentDate=${appointmentDate}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      await appointments.json().then((result) => {
        setPreConfiredAppointments(result);
      });

      //set up the check flag
      setCheckTimeSlotFlag(true);
    } else {
      window.alert("Please choose one doctor and choose one date");
    }
  };

  //get all the appointments of the chosen doctor
  async function getConfirmedAppointment() {
    const appointments = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/appointment?getConfirmedAppointment=getConfirmedAppointment&userId=${selectedDoctorId}&appointmentDate=${appointmentDate}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    await appointments.json().then((result) => {
      setMaxAppointmentId(
        result[0].appointmentId === null ? 1 : result[0].appointmentId
      );
    });
  }

  function handleChooseTimeSlot(timeSlot: string) {
    setSelectedTimeSlot(timeSlot);
    return "";
  }

  //get the max appointment id
  async function getMaxAppointmentId() {
    const appointment = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/appointment?getMaxFlag=getMaxFlag`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    await appointment.json().then((result) => {
      setMaxAppointmentId(
        result[0].appointmentId === null ? 1 : result[0].appointmentId
      );
    });
  }

  //get all doctors
  async function searchAllDoctor() {
    const appointment = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/user?searchAllDoctor=searchAllDoctor`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    await appointment.json().then((result) => {
      setDoctors(result);
    });
  }

  //get all timeslots
  async function getAllTimeslots() {
    const timeslots = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/timeslot`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    await timeslots.json().then((result) => {
      console.log("timeslots...", result);
      setAlTimeSlots(result);
    });
  }

  //get all categories
  async function getAllCategory() {
    const categories = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/category`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    await categories.json().then((result) => {
      setCategories(result);
    });
  }

  const initialSearchDoctorValues = {
    appointmentId: maxAppointmentId,
    category: "",
    doctor: selectedDoctorId,
    date: "",
  };

  const updatePersonalInfoSchema = yup.object().shape({
    appointmentId: yup.string().required("required"),
    // category: yup.string().required("required"),
    // doctor: yup.string().required("required"),
    // date: yup.string().required("required"),
  });

  //handle submit event
  const handlePersonalSubmit = async (
    data: typeof initialSearchDoctorValues
  ) => {
    // //data.id = user.id; //compose Id for update
    // console.log("view detail data=", data);
    // const user = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
    //   method: "PATCH",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // });
    // await user.json().then((result) => {
    //   if (result === null) {
    //     alert("The user doesn't exist in database.");
    //   } else {
    //     setCurrentUser(result);
    //   }
    // });
  };

  return (
    <div>
      <Formik
        onSubmit={(e) => handlePersonalSubmit(e)}
        initialValues={initialSearchDoctorValues}
        validationSchema={updatePersonalInfoSchema}
        enableReinitialize={true}
        key={Date.now()} //Must have the attribute. Otherwise, will get a disgusting error.
      >
        <Form>
          <div className="sm:grid grid-cols-1 grid-rows-2 gap-x-2 gap-y-2 my-5 text-center align-baseline">
            <div className="text-center">Search Doctor</div>
            {/**userId */}
            <div>
              <label htmlFor="inputAppointmentId">Appointment Id:</label>
              <Field
                id="inputAppointmentId"
                name="appointmentId"
                className="text-center align-middle w-1/6 min-w-[20px] px-5 py-2 border-2 bg-red-500"
                readOnly
              />
              <ErrorMessage name="appointmentId" component="span" />
            </div>
            {/**category */}
            <div>
              <label htmlFor="category">Category:</label>
              <Field
                component="select"
                id="category"
                name="category"
                onChange={(e: any) => setSelectedCategory(e.target.value)}
                // multiple={true}
                className="text-center align-middle w-1/6 min-w-[20px] px-5 py-2 border-2"
              >
                {categories?.map((category) => (
                  <option
                    key={category.categoryValue}
                    value={category.categoryValue}
                  >
                    {category.categoryName}
                  </option>
                ))}
              </Field>

              <ErrorMessage name="category" component="span" />
            </div>
            {/**doctor */}
            <div>
              <label htmlFor="doctor">Doctor:</label>
              <Field
                component="select"
                id="doctor"
                name="doctor"
                onChange={(e: any) => setSelectedDoctorId(e.target.value)}
                // multiple={true}
                className="text-center align-middle w-1/6 min-w-[20px] px-5 py-2 border-2"
              >
                <option value="">Please choose a doctor</option>
                {doctors?.map((doctor) => (
                  <option key={doctor.userId} value={doctor.userId}>
                    {doctor.userName}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="doctor" component="span" />
            </div>

            {/**date */}
            <div>
              <label htmlFor="date">Date:</label>
              <DatePicker
                id="selectedDate"
                name="selectedDate"
                selected={moment(appointmentDate, "YYYY-MM-DD").toDate()}
                onChange={(date: any) => setAppointmentDate(date)}
                dateFormat="YYYY-MM-DD" // Customize the date format as needed
                className="text-center align-middle w-full min-w-[50px] px-5 py-2 border-2"
              />
              <ErrorMessage name="date" component="span" />
            </div>
            {/**button */}
            <div className="sm:grid grid-cols-2 m-auto gap-12 ">
              <button
                className="w-20 h-10 bg-blue-500"
                type="button"
                onClick={() => handleSelectedDate()}
              >
                Check
              </button>
            </div>

            {/**time slots */}
            {checkTimeSlotFlag && (
              <TimeSlot
                allTimeSlots={allTimeSlots}
                preConfirmedAppointments={preConfirmedAppointments}
              />
            )}
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SearchDoctor;
