import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { UserEntity, UserLoginState } from "../interfaces/utils";
import moment from "moment";

type Props = {};

const ViewCustomer = (props: Props) => {
  const userLoginState: UserLoginState = useUserContext();

  const [userArray, setUserArray] = useState<UserEntity[]>();

  const [custId, setCustId] = useState("");

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

  const handleSearch = async () => {
    console.log("handlesearch");
    const user = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/user?viewSingleCustomer=viewSingleCustomer&userId=${custId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    await user.json().then((result) => {
      setUserArray(result);
    });
  };

  return (
    <>
      <div className="text-center text-blue-500 underline text-lg">
        Customer Details
      </div>

      <div className="text-center underline text-lg">
        CustID:
        <input
          id="custId"
          name="custId"
          placeholder="Please input user id"
          className="border-2 mt-5 mb-5"
          onChange={(e) => setCustId(e.target.value)}
        />
        <button className="w-20 h-10 bg-blue-500" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="sm:grid grid-cols-7 m-auto w-5/6 min-w-[20px] bg-orange-400">
        <div className="border-2">UId</div>
        <div className="border-2">Name</div>
        <div className="border-2">Address</div>
        <div className="border-2">Mobile</div>
        <div className="border-2">Email</div>
        <div className="border-2">Sex</div>
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

export default ViewCustomer;
