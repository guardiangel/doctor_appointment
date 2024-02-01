"use client";
import React, { useEffect, useState } from "react";
import { HandleResult } from "../interfaces/utils";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Navbar from "../(shared)/Navbar";

type Props = {};

const Register = (props: Props) => {
  const router = useRouter();

  const [handleResult, setHandleResult] = useState<HandleResult>({
    status: "",
    message: "",
  });

  function cancelRegister() {
    router.push(`/login?type=3`);
  }

  //handle add user event
  const handleAddUserSubmit = async (data: typeof initialAddUserValues) => {
    console.log("usersubmit=", data);

    const user = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    await user.json().then((result) => {
      setHandleResult(result);
    });
  };

  const addUserInfoSchema = yup.object().shape({
    userId: yup.string().required("required"),
    userName: yup.string().required("required"),
    password: yup.string().required("required"),
    address: yup.string().required("required"),
    phone: yup.string().required("required"),
    email: yup.string().email().required("required"),
    gender: yup.string().required("required"),
    age: yup.number().min(25).required("required"),
  });

  const initialAddUserValues = {
    userId: "",
    password: "",
    type: "3",
    userName: "",
    address: "",
    phone: "",
    email: "",
    gender: "",
    age: "",
    category: "",
  };

  return (
    <div>
      <Navbar />
      <Formik
        onSubmit={(e) => handleAddUserSubmit(e)}
        initialValues={initialAddUserValues}
        validationSchema={addUserInfoSchema}
        //enableReinitialize={true}
        //key={Date.now()} //Must have the attribute. Otherwise, will get a disgusting error.
      >
        <Form>
          <div className="sm:grid grid-cols-1 grid-rows-2 gap-x-2 gap-y-2 my-5 text-center align-baseline ">
            <div className="text-center  text-blue-500 underline text-2xl">
              Patient Register
            </div>
            {/**Doctor Id */}
            <div>
              <label htmlFor="inputUserId" className="text-lg">
                User Id:
              </label>
              <Field
                id="inputUserId"
                name="userId"
                className="text-center align-middle w-1/6 min-w-[20px] px-5 py-2 border-2 ml-3 text-lg"
              />
              <ErrorMessage name="userId" component="span" />
            </div>
            {/**userName */}
            <div>
              <label htmlFor="inputUserName" className="text-lg">
                Name:
              </label>
              <Field
                id="inputUserName"
                name="userName"
                className="text-center align-middle w-1/6 min-w-[20px] px-5 py-2 border-2 ml-5 text-lg"
              />
              <ErrorMessage name="userName" component="span" />
            </div>
            {/**password */}
            <div>
              <label htmlFor="inputPassword" className="text-lg">
                Password:
              </label>
              <Field
                id="inputPassword"
                name="password"
                className="text-center align-middle w-1/6 min-w-[20px] px-5 py-2 border-2 ml-0 text-lg"
              />
              <ErrorMessage name="password" component="span" />
            </div>
            {/**address */}
            <div>
              <label htmlFor="inputAddress" className="text-lg">
                Address:
              </label>
              <Field
                as="textarea"
                id="inputAddress"
                name="address"
                className="text-center align-middle w-1/6 min-w-[20px] px-5 py-2 border-2 ml-2 text-lg"
              />
              <ErrorMessage name="address" component="span" />
            </div>
            {/**phone */}
            <div>
              <label htmlFor="inputPhone" className="text-lg">
                Mobile:
              </label>
              <Field
                id="inputPhone"
                name="phone"
                className="text-center align-middle w-1/6 min-w-[20px] px-5 py-2 border-2 ml-5 text-lg"
              />
              <ErrorMessage name="phone" component="span" />
            </div>
            {/**email */}
            <div>
              <label htmlFor="inputEmail" className="text-lg">
                Email:
              </label>
              <Field
                id="inputEmail"
                name="email"
                className="text-center align-middle w-1/6 min-w-[20px] px-5 py-2 border-2 ml-6 text-lg"
              />
              <ErrorMessage name="email" component="span" />
            </div>
            {/** gender*/}
            <div>
              <label htmlFor="inputGender" className="text-lg">
                Gender:
              </label>
              <Field
                as="select"
                id="inputGender"
                name="gender"
                className="text-center align-middle w-1/6 min-w-[20px] px-5 py-2 border-2 ml-2 text-lg"
              >
                <option value="">Please select gender</option>
                <option value="Male">Male</option>
                <option value="FeMale">FeMale</option>
              </Field>
              <ErrorMessage name="gender" component="span" />
            </div>
            {/** age*/}
            <div>
              <label htmlFor="inputAge" className="text-lg">
                Age:
              </label>
              <Field
                id="inputAge"
                name="age"
                className="text-center align-middle w-1/6 min-w-[20px] px-5 py-2 border-2 ml-6 text-lg"
              />
              <ErrorMessage name="age" component="span" />
            </div>

            {/**button */}
            <div className="sm:grid grid-cols-2 m-auto gap-12 ">
              <button
                className="w-20 h-10 bg-blue-300 rounded-full"
                type="submit"
              >
                Submit
              </button>
              <button
                className="w-20 h-10 bg-blue-300 rounded-full"
                type="button"
                onClick={() => cancelRegister()}
              >
                Return
              </button>
            </div>
            {handleResult?.status !== "" && (
              <div className="text-center text-red-500 underline text-2xl mt-5">
                {handleResult?.message},Click Return button return to login
                page.
              </div>
            )}
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
