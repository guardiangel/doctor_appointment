import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import {
  CategoryEntity,
  HandleResult,
  UserLoginState,
} from "../interfaces/utils";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

type Props = {};

const AdminAddDoctor = (props: Props) => {
  const userLoginState: UserLoginState = useUserContext();

  const [categories, setCategories] = useState<CategoryEntity[]>();

  const [handleResult, setHandleResult] = useState<HandleResult>({
    status: "",
    message: "",
  });

  useEffect(() => {
    getAllCategory();
  }, [handleResult]);

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

  //handle add doctor event
  const handleAddDoctorSubmit = async (data: typeof initialAddDoctorValues) => {
    const user = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    await user.json().then((result) => {
      setHandleResult(result);
    });
  };

  const addDoctorInfoSchema = yup.object().shape({
    userId: yup.string().required("required"),
    userName: yup.string().required("required"),
    address: yup.string().required("required"),
    phone: yup.string().required("required"),
    email: yup.string().email().required("required"),
    gender: yup.string().required("required"),
    age: yup.number().min(25).required("required"),
    category: yup.string().required("required"),
  });

  const initialAddDoctorValues = {
    userId: "",
    password: "123456",
    type: "2",
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
      <Formik
        onSubmit={(e) => handleAddDoctorSubmit(e)}
        initialValues={initialAddDoctorValues}
        validationSchema={addDoctorInfoSchema}
        //enableReinitialize={true}
        //key={Date.now()} //Must have the attribute. Otherwise, will get a disgusting error.
      >
        <Form>
          <div className="sm:grid grid-cols-1 grid-rows-2 gap-x-2 gap-y-2 my-5 text-center align-baseline ">
            <div className="text-center  text-blue-500 underline text-lg">
              Add doctor
            </div>
            {/**Doctor Id */}
            <div>
              <label htmlFor="inputUserId">Doc Id:</label>
              <Field
                id="inputUserId"
                name="userId"
                className="text-center align-middle w-1/6 min-w-[20px] px-5 py-2 border-2"
              />
              <ErrorMessage name="userId" component="span" />
            </div>
            {/**userName */}
            <div>
              <label htmlFor="inputUserName">Name:</label>
              <Field
                id="inputUserName"
                name="userName"
                className="text-center align-middle w-1/6 min-w-[20px] px-5 py-2 border-2 ml-5"
              />
              <ErrorMessage name="userName" component="span" />
            </div>
            {/**address */}
            <div>
              <label htmlFor="inputAddress">Address:</label>
              <Field
                as="textarea"
                id="inputAddress"
                name="address"
                className="text-center align-middle w-1/6 min-w-[20px] px-5 py-2 border-2 ml-2"
              />
              <ErrorMessage name="address" component="span" />
            </div>
            {/**phone */}
            <div>
              <label htmlFor="inputPhone">Mobile:</label>
              <Field
                id="inputPhone"
                name="phone"
                className="text-center align-middle w-1/6 min-w-[20px] px-5 py-2 border-2 ml-5"
              />
              <ErrorMessage name="phone" component="span" />
            </div>
            {/**email */}
            <div>
              <label htmlFor="inputEmail">Email:</label>
              <Field
                id="inputEmail"
                name="email"
                className="text-center align-middle w-1/6 min-w-[20px] px-5 py-2 border-2 ml-6"
              />
              <ErrorMessage name="email" component="span" />
            </div>
            {/** gender*/}
            <div>
              <label htmlFor="inputGender">Gender:</label>
              <Field
                as="select"
                id="inputGender"
                name="gender"
                className="text-center align-middle w-1/6 min-w-[20px] px-5 py-2 border-2 ml-6"
              >
                <option value="">Please select gender</option>
                <option value="Male">Male</option>
                <option value="FeMale">FeMale</option>
              </Field>
              <ErrorMessage name="gender" component="span" />
            </div>
            {/** age*/}
            <div>
              <label htmlFor="inputAge">Age:</label>
              <Field
                id="inputAge"
                name="age"
                className="text-center align-middle w-1/6 min-w-[20px] px-5 py-2 border-2 ml-6"
              />
              <ErrorMessage name="age" component="span" />
            </div>
            {/**category */}
            <div>
              <label htmlFor="category">Category:</label>
              <Field
                as="select"
                id="category"
                name="category"
                className="text-center align-middle w-1/6 min-w-[20px] px-5 py-2 border-2 ml-1"
              >
                <option value="">Please select a category</option>
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
            {/**button */}
            <div className="sm:grid m-auto gap-12 mt-5 text-center">
              <button
                className="w-20 h-10 bg-blue-300 rounded-full"
                type="submit"
              >
                Submit
              </button>
            </div>
            {handleResult?.status !== "" && (
              <div className="text-center text-red-500 underline text-2xl mt-5">
                {handleResult?.message}
              </div>
            )}
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default AdminAddDoctor;
