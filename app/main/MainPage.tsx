"user client";
import React, { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { UserLoginState } from "../interfaces/utils";
import ViewDetail from "../(components)/ViewDetail";
import Menu from "../(shared)/Menu";
import Navbar from "../(shared)/Navbar";
import SearchDoctor from "../(components)/SearchDoctor";

type Props = {};

const MainPage = (props: Props) => {
  const user: UserLoginState = useUserContext();

  //Click the items on the nav bar, forward to different pages
  const defaultOpetation = "";

  const getDefaultOperation = () => {
    switch (user?.type) {
      case "1":
        return "";
      case "2":
        return "";
      case "3":
        return "searchDoctor";
    }
    return "";
  };

  const [operation, setOperation] = useState("");

  const handleOperation = (operationAction: string) => {
    setOperation(operationAction);
    return operationAction;
  };

  return (
    <main>
      <Navbar />
      <Menu type={user.type} handleOperation={handleOperation} />
      {user?.type === "3" && operation === "searchDoctor" && <SearchDoctor />}
      {user?.type === "3" && operation === "viewDetail" && <ViewDetail />}
    </main>
  );
};

export default MainPage;
