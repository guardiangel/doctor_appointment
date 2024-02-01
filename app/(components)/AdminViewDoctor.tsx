import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { UserEntity, UserLoginState } from "../interfaces/utils";
import moment from "moment";

type Props = {};

const AdminViewDoctor = (props: Props) => {
  const userLoginState: UserLoginState = useUserContext();

  const [userArray, setUserArray] = useState<UserEntity[]>();

  useEffect(() => {
    getAllTheDoctorInfo();
  }, []);

  async function getAllTheDoctorInfo() {
    const user = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/user?adminViewDoctor=adminViewDoctor`,
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
        Doctor Details
      </div>

      <div className="sm:grid grid-cols-7 m-auto w-5/6 min-w-[20px] bg-yellow-500 mt-10">
        <div className="border-1">DId</div>
        <div className="border-1">Name</div>
        <div className="border-1">Address</div>
        <div className="border-1">Mobile</div>
        <div className="border-1">Email</div>
        <div className="border-1">Gender</div>
        <div className="border-1">Category</div>
      </div>

      {userArray?.map((user, index) => (
        <>
          <div
            className="sm:grid grid-cols-7 m-auto w-5/6 min-w-[20px] bg-yellow-200"
            key={user.id}
          >
            <div className="border-1">{user.userId}</div>
            <div className="border-1">{user.userName}</div>
            <div className="border-1">{user.address}</div>
            <div className="border-1">{user.phone}</div>
            <div className="border-1">{user.email}</div>
            <div className="border-1">{user.gender}</div>
            <div className="border-1">{user?.category?.categoryName}</div>
          </div>
        </>
      ))}
    </>
  );
};

export default AdminViewDoctor;
