import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  AppointmentEntity,
  CategoryEntity,
  HandleResult,
  TimeslotEntity,
  UserEntity,
  UserLoginState,
} from "../interfaces/utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimeSlot from "./TimeSlot";
import moment, { months } from "moment";
import { useUserContext } from "../context/UserContext";
type Props = {};

const BookingAppointment = (props: Props) => {
  const currentUser: UserLoginState = useUserContext();

  const [categories, setCategories] = useState<CategoryEntity[]>();
  const [doctors, setDoctors] = useState<UserEntity[]>();
  const [maxAppointmentId, setMaxAppointmentId] = useState();

  //get the confirmed appointment regarding one doctor and date
  const [preConfirmedAppointments, setPreConfiredAppointments] = useState<
    AppointmentEntity[]
  >([]);

  //all time slots
  const [allTimeSlots, setAlTimeSlots] = useState<TimeslotEntity[]>([]);

  //data waited to be submitted
  const [appointmentDate, setAppointmentDate] = useState<string>(
    moment(new Date()).format("YYYY-MM-DD").toString()
  );
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");

  const [checkTimeSlotFlag, setCheckTimeSlotFlag] = useState(false);

  const [handleResult, setHandleResult] = useState<HandleResult>({
    status: "",
    message: "",
  });

  //if refresh the current page
  const [refreshFlag, setRefreshFlag] = useState(false);

  useEffect(() => {
    getAllTimeslots();
    getAllCategory();
    getMaxAppointmentId();
  }, [refreshFlag, handleResult]);

  //Change category, select relative doctors
  const handleSelectedCategory = async (e: any) => {
    setSelectedCategory(e.target.value);
    //don't use selectedCategory in the below query since it will work in the next render.
    searchAllDoctorByCategoryValue(e.target.value);
  };

  //choose an appointment data
  const handleSelectedDate = async () => {
    setHandleResult({
      status: "",
      message: "",
    }); //hide the previous prompt info

    const formateDate = moment(appointmentDate).format("YYYY-MM-DD");

    if (
      appointmentDate !== "" &&
      selectedDoctorId !== "" &&
      selectedCategory !== ""
    ) {
      //get all the appointments of the current doctor in the current date
      const appointments = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/appointment?getConfirmedAppointment=getConfirmedAppointment&userId=${selectedDoctorId}&appointmentDate=${formateDate}`,
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
      window.alert("Please choose category,doctor, and date");
    }
  };

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
        result[0].appointmentId === null ? 1 : result[0].appointmentId + 1
      );
    });
  }

  //get all doctors based on the category
  async function searchAllDoctorByCategoryValue(categoryValue: string) {
    if (categoryValue === "") {
      setDoctors([]);
    }

    const appointment = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/user?searchAllDoctorByCategoryId=searchAllDoctorByCategoryIds&categoryValue=${categoryValue}`,
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
    category: selectedCategory,
    doctor: selectedDoctorId,
    appointmentDate: appointmentDate, //format to string type when submitting
    timeslot: "",
    patientId: currentUser.userId,
  };

  //handle submit event
  const handleAppointmentSubmit = async (
    data: typeof initialSearchDoctorValues
  ) => {
    const formateDate = moment(appointmentDate).format("YYYY-MM-DD");
    data.appointmentDate = formateDate;
    data.timeslot = selectedTimeSlot;

    if (data.timeslot === "") {
      window.alert(
        "Haven't chosen right time slot. Please re-select time slot."
      );
      return;
    }

    const appointment = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/appointment`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    await appointment.json().then((result) => {
      setHandleResult(result);
      if (result.status === "9999") {
      } else {
        setRefreshFlag(true);
        setSelectedCategory("");
        setSelectedDoctorId("");
        setSelectedTimeSlot("");
        setAppointmentDate(moment(new Date()).format("YYYY-MM-DD").toString());
        setCheckTimeSlotFlag(false);
      }
    });
  };

  return (
    <div>
      <Formik
        onSubmit={(e) => handleAppointmentSubmit(e)}
        initialValues={initialSearchDoctorValues}
        enableReinitialize={true}
        key={Date.now()} //Must have the attribute. Otherwise, will get a disgusting error.
      >
        <Form>
          <div className="sm:grid grid-cols-1 grid-rows-2 gap-x-2 gap-y-2 my-5 text-center align-baseline">
            <div className="text-center underline text-blue-500 text-4xl mb-5">
              New Booking
            </div>
            {/**userId */}
            <div>
              <label htmlFor="inputAppointmentId" className="text-xl">
                AppointmentId:
              </label>
              <Field
                id="inputAppointmentId"
                name="appointmentId"
                className="text-center align-middle w-1/6 min-w-[20px] px-5 py-2 border-2 bg-gray-300 text-lg"
                readOnly
              />
              <ErrorMessage name="appointmentId" component="span" />
            </div>
            {/**category */}
            <div>
              <label htmlFor="category" className="text-xl">
                Category:
              </label>
              <Field
                component="select"
                id="category"
                name="category"
                onChange={(e: any) => {
                  setCheckTimeSlotFlag(false);
                  handleSelectedCategory(e);
                }}
                // multiple={true}
                className="text-center align-middle w-1/6 min-w-[20px] px-5 py-2 border-2 text-lg"
              >
                <option value="">Please choose a category</option>
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
              <label htmlFor="doctor" className="text-xl">
                Doctor:
              </label>
              <Field
                component="select"
                id="doctor"
                name="doctor"
                onChange={(e: any) => {
                  setCheckTimeSlotFlag(false);
                  setSelectedDoctorId(e.target.value);
                }}
                // multiple={true}
                className="text-center align-middle w-1/6 min-w-[20px] px-5 py-2 border-2 text-lg"
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
              <label htmlFor="date" className="text-xl">
                Date:
              </label>
              <DatePicker
                id="selectedDate"
                name="selectedDate"
                minDate={new Date()}
                selected={moment(appointmentDate, "YYYY-MM-DD").toDate()}
                onChange={(date: any) => {
                  setCheckTimeSlotFlag(false);
                  setAppointmentDate(date);
                }}
                dateFormat="yyyy-MM-dd" // Customize the date format as needed
                className="text-center align-middle w-full min-w-[50px] px-5 py-2 border-2 text-lg"
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

            {handleResult?.status !== "" && (
              <div className="text-center text-red-500 underline text-2xl mt-5">
                {handleResult?.message}
              </div>
            )}

            {/**time slots */}
            {checkTimeSlotFlag && (
              <TimeSlot
                allTimeSlots={allTimeSlots}
                preConfirmedAppointments={preConfirmedAppointments}
                handleChooseTimeSlot={handleChooseTimeSlot}
              />
            )}
            {/**book button */}
            {checkTimeSlotFlag && (
              <div className="sm:grid grid-cols-2 m-auto gap-12 ">
                <button className="w-20 h-10 bg-blue-500" type="submit">
                  Book
                </button>
              </div>
            )}
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default BookingAppointment;
