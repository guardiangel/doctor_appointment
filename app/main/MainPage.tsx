"user client";
import React, { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { UserLoginState } from "../interfaces/utils";
import ViewDetail from "../(components)/ViewDetail";
import Menu from "../(shared)/Menu";
import Navbar from "../(shared)/Navbar";
import ViewCustomer from "../(components)/DoctorViewCustomer";
import ViewBooking from "../(components)/ViewBooking";
import CancelBooking from "../(components)/CancelBooking";
import BookingAppointment from "../(components)/BookingAppointment";
import SearchDoctor from "../(components)/SearchDoctor";
import ProvideFeedBack from "../(components)/ProvideFeedBack";
import ViewMyAppointments from "../(components)/ViewMyAppointments";
import AddDescription from "../(components)/AddDescription";
import ViewDoctorDetail from "../(components)/ViewDoctorDetail";
import DoctorViewCustomer from "../(components)/DoctorViewCustomer";
import AdminViewCustomer from "../(components)/AdminViewCustomer";
import AdminAddDoctor from "../(components)/AdminAddDoctor";
import AdminViewDoctor from "../(components)/AdminViewDoctor";

type Props = {};

const MainPage = (props: Props) => {
  const user: UserLoginState = useUserContext();

  //Click the items on the nav bar, forward to different pages
  const defaultOpetation = "";

  const getDefaultOperation = () => {
    switch (user?.type) {
      case "1":
        return "adminViewCustomer";
      case "2":
        return "doctorViewCustomer";
      case "3":
        return "searchDoctor";
    }
    return "";
  };

  const [operation, setOperation] = useState(getDefaultOperation());

  const handleOperation = (operationAction: string) => {
    setOperation(operationAction);
    return operationAction;
  };

  return (
    <main>
      <Navbar />
      <Menu type={user.type} handleOperation={handleOperation} />
      {user?.type === "3" && operation === "bookingAppointment" && (
        <BookingAppointment />
      )}
      {user?.type === "3" && operation === "searchDoctor" && <SearchDoctor />}
      {user?.type === "3" && operation === "viewDetail" && <ViewDetail />}
      {user?.type === "3" && operation === "viewBooking" && <ViewBooking />}
      {user?.type === "3" && operation === "cancelBooking" && <CancelBooking />}
      {user?.type === "3" && operation === "provideFeedBack" && (
        <ProvideFeedBack />
      )}
      {user?.type === "2" && operation === "doctorViewCustomer" && (
        <DoctorViewCustomer />
      )}
      {user?.type === "2" && operation === "viewMyAppointments" && (
        <ViewMyAppointments />
      )}
      {user?.type === "2" && operation === "addDescription" && (
        <AddDescription />
      )}
      {user?.type === "2" && operation === "viewDoctorDetail" && (
        <ViewDoctorDetail />
      )}
      {user?.type === "1" && operation === "adminViewCustomer" && (
        <AdminViewCustomer />
      )}
      {user?.type === "1" && operation === "adminAddDoctor" && (
        <AdminAddDoctor />
      )}{" "}
      {user?.type === "1" && operation === "adminViewDoctor" && (
        <AdminViewDoctor />
      )}
    </main>
  );
};

export default MainPage;
