import React, { useEffect, useLayoutEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import {
  TreatmentEntity,
  UserEntity,
  UserLoginState,
} from "../interfaces/utils";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import moment from "moment";

type Props = {};

const ViewDetail = (props: Props) => {
  const userLoginState: UserLoginState = useUserContext();

  const [currentUser, setCurrentUser] = useState<UserEntity>();

  useEffect(() => {
    getUserInfoByUserId(userLoginState.id);
  }, [userLoginState.id]);

  async function getUserInfoByUserId(id: String) {
    const user = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/user?viewPersonalFlag=viewPersonalFlag&id=${id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    await user.json().then((result) => {
      console.log("result==", result);
      setCurrentUser(result);
    });
  }

  //handle submit event
  const handlePersonalSubmit = async (data: typeof initialUserValues) => {
    //data.id = user.id; //compose Id for update
    console.log("view detail data=", data);
    const user = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    await user.json().then((result) => {
      if (result === null) {
        alert("The user doesn't exist in database.");
      } else {
        setCurrentUser(result);
      }
    });
  };

  const updatePersonalInfoSchema = yup.object().shape({
    userId: yup.string().required("required"),
    userName: yup.string().required("required"),
    address: yup.string().required("required"),
    phone: yup.string().required("required"),
    email: yup.string().required("required"),
  });

  const initialUserValues = {
    id: currentUser?.id,
    userId: currentUser?.userId,
    userName: currentUser?.userName,
    address: currentUser?.address,
    phone: currentUser?.phone,
    email: currentUser?.email,
    treatments: currentUser?.treatments,
  };

  return (
    <div>
      <Formik
        onSubmit={(e) => handlePersonalSubmit(e)}
        initialValues={initialUserValues}
        validationSchema={updatePersonalInfoSchema}
        enableReinitialize={true}
        key={Date.now()} //Must have the attribute. Otherwise, will get a disgusting error.
      >
        <Form>
          <div className="sm:grid grid-cols-1 grid-rows-2 gap-x-2 gap-y-2 my-5 text-center align-baseline">
            <div className="text-center">Details</div>
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
      {/**treatment history */}
      <div className="text-center ">Treatment History</div>
      <div className="sm:grid grid-cols-5 m-auto bg-blue-300 w-2/6 min-w-[20px]">
        <div>UId</div>
        <div>Dise</div>
        <div>Treatment</div>
        <div>Dnote</div>
        <div>DateTime</div>
      </div>
      {currentUser?.treatments?.map((treatmentHistory: TreatmentEntity) => (
        <div
          className="sm:grid grid-cols-5 m-auto w-2/6 min-w-[20px] border-2"
          key={treatmentHistory.id}
        >
          <div className="border-2">{treatmentHistory.patientId}</div>
          <div className="border-2">{treatmentHistory.dise}</div>
          <div className="border-2">{treatmentHistory.treatment}</div>
          <div className="border-2">{treatmentHistory.note}</div>
          <div className="border-2">
            {moment(treatmentHistory.createdAt).format("DD-MM-YYYY")}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewDetail;
