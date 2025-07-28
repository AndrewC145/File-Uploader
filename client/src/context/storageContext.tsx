/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, type Dispatch, type SetStateAction } from "react";

type StorageContextType = {
  files: any[];
  setFiles: Dispatch<SetStateAction<any[]>>;
  fetchFiles: (userId: number, folderId: number | null, folderName: string) => Promise<void>;
  homeId: number | null;
  setHomeId: Dispatch<SetStateAction<number | null>>;
  homeFiles: any[];
  setHomeFiles: Dispatch<SetStateAction<any[]>>;
};

const StorageContext = createContext<StorageContextType>({
  files: [],
  setFiles: () => {},
  fetchFiles: async () => {},
  homeId: null,
  setHomeId: () => {},
  homeFiles: [],
  setHomeFiles: () => {},
});

export default StorageContext;
