"user client";
import React, { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { UserLoginState } from "../interfaces/utils";
import NavbarForLoginUser from "../(shared)/NavbarForLoginUser";
import ViewDetail from "../(components)/ViewDetail";

type Props = {};

const MainPage = (props: Props) => {
  const user: UserLoginState = useUserContext();

  //Click the items on the nav bar, forward to different pages
  const [operation, setOperation] = useState("");

  const handleOperation = (operationAction: string) => {
    setOperation(operationAction);
    return operationAction;
  };

  return (
    <main>
      <NavbarForLoginUser type={user?.type} handleOperation={handleOperation} />
      {user?.type === "3" && operation === "viewDetail" && <ViewDetail />}
    </main>
  );
};

export default MainPage;
