"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { UserLoginStateContext, useUserContext } from "../context/UserContext";
import MainPage from "../main/MainPage";
import { UserLoginState } from "../interfaces/utils";
import Navbar from "../(shared)/Navbar";
import { useSearchParams, useRouter } from "next/navigation";

const Login = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") == null ? "" : searchParams.get("type");

  const router = useRouter();

  //click cancel button
  function cancelLogin() {
    router.push("/");
  }

  const [currentUser, setCurrentLoginUser] = useState<UserLoginState | null>(
    null
  );

  //handle submit event
  const handleSubmit = async (data: typeof initialValues) => {
    data.type = type;
    const user = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/user?userId=${data.userId}&password=${data.password}&type=${data.type}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        //body: JSON.stringify(data),
      }
    );
    await user.json().then((result) => {
      if (result === null) {
        alert("The user doesn't exist in database.");
      } else {
        setCurrentLoginUser(result);
      }
    });
  };

  const initialValues = {
    userId: "",
    password: "",
    //used to confirm which type of user login
    type: type,
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
          <Navbar />
          <Formik
            onSubmit={(e) => handleSubmit(e)}
            initialValues={initialValues}
            validationSchema={loginSchema}
          >
            <Form>
              <div className="sm:grid grid-cols-1 grid-rows-2 gap-x-2 gap-y-2 my-5 text-center align-baseline">
                {(() => {
                  if (type == "1") {
                    return <div>Admin Login 1001/123456</div>;
                  } else if (type == "2") {
                    return <div>Doctor Login 2001/123456</div>;
                  } else if (type == "3") {
                    return <div>Patient Login 3001/123456</div>;
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
                    onClick={() => cancelLogin()}
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
