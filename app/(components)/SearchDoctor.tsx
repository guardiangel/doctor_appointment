import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { UserLoginState } from "../interfaces/utils";

type Props = {};

const SearchDoctor = (props: Props) => {
  const userLoginState: UserLoginState = useUserContext();

  const [optionValue, setOptionValue] = useState("");
  const [categories, setCategories] = useState<CategoryEntity[]>();

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

  async function handleDelete() {
    // if (window.confirm("Want to cancel appointment, Click ok button")) {
    //   const data = { appointmentId: appointmentId };
    //   const cancelResult = await fetch(
    //     `${process.env.NEXT_PUBLIC_URL}/api/appointment`,
    //     {
    //       method: "DELETE",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify(data),
    //     }
    //   );
    //   await cancelResult.json().then((result) => {
    //     console.log("result-------", result);
    //     setResult(result);
    //   });
    // }
  }

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    console.log("eee", e.target.value);
  }

  return (
    <>
      <div className="text-center text-blue-500 underline text-4xl">
        Search Doctor
      </div>

      <div className="text-center  text-2xl mb-5">
        Search By:
        <select
          className="border-2"
          onChange={(e) => setOptionValue(e.target.value)}
        >
          <option value="1">Name</option>
          <option value="2">Category</option>
          <option value="3">Address</option>
        </select>
      </div>
      <div className="text-center  text-2xl">
        <button className="w-20 h-10 bg-blue-500" onClick={handleDelete}>
          Submit
        </button>
      </div>
    </>
  );
};

export default SearchDoctor;
