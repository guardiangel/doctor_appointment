import { createContext, useContext } from "react";
import { UserLoginState } from "../interfaces/utils";

export const UserLoginStateContext = createContext<UserLoginState | undefined>(
  undefined
);

export function useUserContext() {
  const user = useContext(UserLoginStateContext);
  if (user === undefined) {
    throw new Error("useUserContext must be used with a UserLoginStateContext");
  }
  return user;
}
