import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

type Props = {};

const SearchDoctor = (props: Props) => {
  console.log("aaaaaaaaaaa.....");
  const [categories, setCategories] = useState();
  const [maxAppointment, setMaxAppointment] = useState();

  useEffect(() => {
    //get the category
    //getAllCategory();
    getMaxAppointmentId();
  }, []);

  //get the max appointment id
  async function getMaxAppointmentId() {
    console.log("searchdoctor.....");
    const appointment = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/appointment?getMaxFlag=getMaxFlag`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    await appointment.json().then((result) => {
      setMaxAppointment(
        result[0].appointmentId === null ? 0 : result[0].appointmentId
      );
    });
  }

  async function getAllCategory() {
    const categories = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/category`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    await categories.json().then((result) => {
      console.log("categories==", categories);
      setCategories(result);
    });
  }

  const initialSearchDoctorValues = {
    appointmentId: "",
    category: "",
    doctor: "",
    date: "",
  };

  const updatePersonalInfoSchema = yup.object().shape({
    appointmentId: yup.string().required("required"),
    category: yup.string().required("required"),
    doctor: yup.string().required("required"),
    date: yup.string().required("required"),
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
              <label htmlFor="inputUserId">User Id:</label>
              <Field
                id="inputUserId"
                name="userId"
                className="text-center align-middle w-1/6 min-w-[20px] px-5 py-2 border-2 bg-red-500"
                readOnly
              />
              <ErrorMessage name="userId" component="span" />
            </div>
            {/**userName */}
            <div>
              <label htmlFor="inputUserName">Name:</label>
              <Field
                id="inputUserName"
                name="userName"
                className="text-center align-middle w-1/6 min-w-[20px] px-5 py-2 border-2"
              />
              <ErrorMessage name="userName" component="span" />
            </div>
            {/**address */}
            <div>
              <label htmlFor="inputAddress">Address:</label>
              <Field
                id="inputAddress"
                name="address"
                className="text-center align-middle w-1/6 min-w-[20px] px-5 py-2 border-2"
              />
              <ErrorMessage name="address" component="span" />
            </div>
            {/**phone */}
            <div>
              <label htmlFor="inputPhone">Mobile No:</label>
              <Field
                id="inputPhone"
                name="phone"
                className="text-center align-middle w-1/6 min-w-[20px] px-5 py-2 border-2"
              />
              <ErrorMessage name="phone" component="span" />
            </div>
            {/**email */}
            <div>
              <label htmlFor="inputEmail">Email:</label>
              <Field
                id="inputEmail"
                name="email"
                className="text-center align-middle w-1/6 min-w-[20px] px-5 py-2 border-2"
              />
              <ErrorMessage name="phone" component="span" />
            </div>
            {/**button */}
            <div className="sm:grid grid-cols-2 m-auto gap-12 ">
              <button className="w-20 h-10 bg-blue-500" type="submit">
                Update
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SearchDoctor;
