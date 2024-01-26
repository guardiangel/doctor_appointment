import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { TreatmentEntity, UserEntity } from "../interfaces/utils";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { Treatment } from "@prisma/client";
import moment from "moment";

type Props = {};

const ViewDetail = (props: Props) => {
  const user: UserEntity = useUserContext();
  const [treatmentHistorys, setTreatmentHistorys] =
    useState<TreatmentEntity[]>();

  useEffect(() => {
    getTreatMentHistoryByUserId(user.userId);
  }, [user.userId]);

  const getTreatMentHistoryByUserId = async (userId: String) => {
    const treatments = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/treatment?userId=${userId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    treatments.json().then((treatmentArray) => {
      setTreatmentHistorys(treatmentArray);
    });
  };

  //handle submit event
  const handlePersonalSubmit = async (data: typeof initialUserValues) => {
    //data.id = user.id; //compose Id for update
    console.log("view detail data=", data);
    const user = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    user.json().then((result) => {
      if (result === null) {
        alert("The user doesn't exist in database.");
      } else {
      }
    });
  };

  const initialUserValues = {
    id: user.id,
    userId: user.userId,
    userName: user.userName,
    address: user.address,
    phone: user.phone,
    email: user.email,
  };

  const updatePersonalInfoSchema = yup.object().shape({
    userId: yup.string().required("required"),
    userName: yup.string().required("required"),
    address: yup.string().required("required"),
    phone: yup.string().required("required"),
    email: yup.string().required("required"),
  });

  return (
    <div>
      <Formik
        onSubmit={(e) => handlePersonalSubmit(e)}
        initialValues={initialUserValues}
        validationSchema={updatePersonalInfoSchema}
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

      <div className="sm:grid grid-cols-5 m-auto w-2/6 min-w-[20px] border-2">
        {treatmentHistorys?.map((treatmentHistory) => (
          <>
            <div className="border-2">{treatmentHistory.userId}</div>
            <div className="border-2">{treatmentHistory.dise}</div>
            <div className="border-2">{treatmentHistory.treatment}</div>
            <div className="border-2">{treatmentHistory.note}</div>
            <div className="border-2">
              {moment(treatmentHistory.createdAt).format("DD-MM-YYYY")}
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default ViewDetail;
