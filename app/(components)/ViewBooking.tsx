import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { UserEntity, UserLoginState } from "../interfaces/utils";
import moment from "moment";

type Props = {};

const ViewBooking = (props: Props) => {
  const userLoginState: UserLoginState = useUserContext();
  const [userArray, setUserArray] = useState<UserEntity[]>();

  useEffect(() => {
    getUserInfo();
  }, []);

  async function getUserInfo() {
    const user = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/user?viewCustomer=viewCustomer`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    await user.json().then((result) => {
      console.log("result==", result);
      setUserArray(result);
    });
  }

  return (
    <>
      <div className="text-center text-blue-500 underline text-lg">
        Booking History
      </div>

      <div className="sm:grid grid-cols-5 m-auto w-5/6 min-w-[20px] bg-orange-400">
        <div className="border-2">patientId</div>
        <div className="border-2">Doctor Id</div>
        <div className="border-2">Doctor Name</div>
        <div className="border-2">Appointment Date</div>
        <div className="border-2">Time</div>
        <div className="border-2">Age</div>
      </div>

      {userArray?.map((user, index) => (
        <>
          <div
            className="sm:grid grid-cols-7 m-auto w-5/6 min-w-[20px] bg-yellow-200"
            key={user.id}
          >
            <div className="border-2">{user.userId}</div>
            <div className="border-2">{user.userName}</div>
            <div className="border-2">{user.address}</div>
            <div className="border-2">{user.phone}</div>
            <div className="border-2">{user.email}</div>
            <div className="border-2">{user.gender}</div>
            <div className="border-2">{user.age}</div>
          </div>
        </>
      ))}

      <>
        {userArray?.length == 1 && (
          <>
            <div className="text-center text-blue-500 underline text-lg">
              Patient&apos;s Treatment HIstory
            </div>
            {userArray?.map((user, index) => (
              <>
                {user?.treatments.map((treatment, treatment_index) => (
                  <div
                    className="sm:grid grid-cols-5 m-auto w-5/6 min-w-[20px] bg-yellow-200"
                    key={treatment.id}
                  >
                    <div className="border-2">{treatment.patientId}</div>
                    <div className="border-2">{treatment.dise}</div>
                    <div className="border-2">{treatment.treatment}</div>
                    <div className="border-2">{treatment.note}</div>
                    <div className="border-2">
                      {moment(treatment.createdAt, "YYYY-MM-DD").toString()}
                    </div>
                  </div>
                ))}
              </>
            ))}
          </>
        )}
      </>
    </>
  );
};

export default ViewBooking;
