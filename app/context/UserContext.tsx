import { createContext, useContext } from "react";
import { UserEntity } from "../interfaces/utils";

export const UserLoginStateContext = createContext<UserEntity | undefined>(
  undefined
);

export function useUserContext() {
  const user = useContext(UserLoginStateContext);
  if (user === undefined) {
    throw new Error("useUserContext must be used with a DashboardContext");
  }
  return user;
}
