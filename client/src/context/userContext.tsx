/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, type Dispatch, type SetStateAction } from "react";

type UserContextType = {
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
  logoutUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  logoutUser: async () => {},
});

export default UserContext;
