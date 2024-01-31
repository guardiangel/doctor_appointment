import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import {
  CategoryEntity,
  UserEntity,
  UserLoginState,
} from "../interfaces/utils";

type Props = {};

const SearchDoctor = (props: Props) => {
  const userLoginState: UserLoginState = useUserContext();

  //1 by name, 2 by categoryId, 3 by address
  const [searchOptionValue, setSearchOptionValue] = useState("1");

  const [categories, setCategories] = useState<CategoryEntity[]>();

  //search condition
  const [doctorName, setDoctorName] = useState("");
  const [doctorAddress, setDoctorAddress] = useState("");
  const [categoryId, setCategoryId] = useState("");

  //display doctors' info based on category
  const [doctors, setDoctors] = useState<UserEntity[]>();

  useEffect(() => {
    getAllCategory();
  }, []);

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

  async function handleSearchDoctor() {
    const user = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/user?searchDoctorByConditions=searchDoctorByConditions&searchOptionValue=${searchOptionValue}&categoryId=${categoryId}&doctorName=${doctorName}&doctorAddress=${doctorAddress}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    await user.json().then((result) => {
      console.log("result==", result);
      setDoctors(result);
    });
  }

  return (
    <div>
      <div className="text-center text-blue-500 underline text-4xl">
        Search Doctor
      </div>

      {/**Search by */}
      <div className="text-center  text-2xl mb-5 mt-5">
        Search By:
        <select
          className="border-2"
          onChange={(e) => setSearchOptionValue(e.target.value)}
        >
          <option value="1">Name</option>
          <option value="2">Category</option>
          <option value="3">Address</option>
        </select>
      </div>
      {/**display different content based on the searchOptionvalue */}

      {searchOptionValue === "1" && (
        <>
          <div className="text-center  text-2xl mb-5">
            Text:
            <input
              id="doctorName"
              name="doctorName"
              placeholder="Please input doctor's name"
              className="border-2 mt-5 mb-5"
              onChange={(e) => setDoctorName(e.target.value)}
            />
          </div>
        </>
      )}

      {searchOptionValue === "2" && (
        <div className="text-center  text-2xl mb-5">
          <select
            className="border-2"
            onChange={(e) => setCategoryId(e.target.value)}
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
          </select>
        </div>
      )}

      {searchOptionValue === "3" && (
        <>
          <div className="text-center  text-2xl mb-5">
            Text:
            <input
              id="doctorAddress"
              name="doctorAddress"
              placeholder="Please input doctor's address"
              className="border-2 mt-5 mb-5"
              onChange={(e) => setDoctorAddress(e.target.value)}
            />
          </div>
        </>
      )}

      <div className="text-center  text-2xl mb-5">
        <button className="w-20 h-10 bg-blue-500" onClick={handleSearchDoctor}>
          Submit
        </button>
      </div>

      <div className="sm:grid grid-cols-5 m-auto w-5/6 min-w-[20px] bg-orange-500 text-center text-2xl ">
        <div className="border-1">DId</div>
        <div className="border-1">Name</div>
        <div className="border-1">Address</div>
        <div className="border-1">Mobile</div>
        <div className="border-1">Category</div>
      </div>

      <div>
        {doctors?.map((doctor, index) => (
          <div
            className="sm:grid grid-cols-5 m-auto w-5/6 min-w-[20px] bg-yellow-400 text-xl text-center"
            key={doctor.id}
          >
            <div className="border-1">{doctor.userId}</div>
            <div className="border-1">{doctor.userName}</div>
            <div className="border-1">{doctor.address}</div>
            <div className="border-1">{doctor.phone}</div>
            <div className="border-1">{doctor.category?.categoryName}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchDoctor;
