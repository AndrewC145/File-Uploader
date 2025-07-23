/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, type Dispatch, type SetStateAction } from "react";

type UserContextType = {
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
  loading: boolean;
  logoutUser: () => Promise<void>;
  files: any[];
  setFiles: Dispatch<SetStateAction<any[]>>;
  fetchFiles: (userId: string, folderId: number, folderName: string) => Promise<void>;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  loading: false,
  logoutUser: async () => {},
  files: [],
  setFiles: () => {},
  fetchFiles: async () => {},
});

export default UserContext;
