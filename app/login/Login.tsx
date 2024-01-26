"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { UserLoginStateContext, useUserContext } from "../context/UserContext";
import MainPage from "../(shared)/MainPage";
import { UserEntity } from "../interfaces/utils";

type Props = {
  type: string;
  handleType: (arg: string) => string;
};

const Login = ({ type, handleType }: Props) => {
  const [currentUser, setCurrentUser] = useState<UserEntity | null>(null);

  //handle submit event
  const handleSubmit = async (data: typeof initialValues) => {
    data.type = type;

    const user = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    user.json().then((result) => {
      if (result === null) {
        alert("The user doesn't exist in database.");
      } else {
        setCurrentUser(result);
      }
    });
  };

  const initialValues = {
    userId: "",
    password: "",
    //used to confirm which type of user login
    type: "",
  };

  const loginSchema = yup.object().shape({
    userId: yup.string().required("required"),
    password: yup.string().required("required"),
  });
  return (
    <>
      {/**if user login successfully, forward to main page, otherwise, stay in current page */}
      {/**userContext to save the login state of current user */}
      {currentUser?.id ? (
        <UserLoginStateContext.Provider value={currentUser}>
          <MainPage />
        </UserLoginStateContext.Provider>
      ) : (
        <div>
          <Formik
            onSubmit={(e) => handleSubmit(e)}
            initialValues={initialValues}
            validationSchema={loginSchema}
          >
            <Form>
              <div className="sm:grid grid-cols-1 grid-rows-2 gap-x-2 gap-y-2 my-5 text-center align-baseline">
                {(() => {
                  if (type == "1") {
                    return <div>Admin Login</div>;
                  } else if (type == "2") {
                    return <div>Doctor Login</div>;
                  } else if (type == "3") {
                    return <div>Patient Login</div>;
                  }
                })()}
                {/**userId */}
                <div>
                  <label htmlFor="inputUserId">UserId:</label>
                  <Field
                    id="inputUserId"
                    name="userId"
                    className="text-center align-middle w-1/6 min-w-[20px] px-5 py-2 border-2"
                  />
                  <ErrorMessage name="userId" component="span" />
                </div>
                {/**password */}
                <div>
                  <label htmlFor="inputPassword">Password:</label>
                  <Field
                    id="inputPassword"
                    name="password"
                    className="text-center align-middle w-1/6 min-w-[20px] px-5 py-2 border-2"
                  />
                  <ErrorMessage name="password" component="span" />
                </div>
                {/**button */}
                <div className="sm:grid grid-cols-2 m-auto gap-12 ">
                  <button className="w-20 h-10 bg-blue-500" type="submit">
                    Login
                  </button>
                  <button
                    className="w-20 h-10 bg-blue-500"
                    type="button"
                    onClick={() => handleType("")}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      )}
    </>
  );
};

export default Login;
