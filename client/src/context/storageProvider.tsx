/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";
import axios from "axios";
import StorageContext from "./storageContext";

function StorageProvider({ children }: { children: React.ReactNode }) {
  const [files, setFiles] = useState<any[]>([]);
  const [homeId, setHomeId] = useState<number | null>(null);
  const [homeFiles, setHomeFiles] = useState<any[]>([]);

  const PORT = import.meta.env.VITE_API_URL;

  const fetchFiles = useCallback(
    async (userId: number, folderId: number | null, folderName: string) => {
      try {
        const response = await axios.get(
          `${PORT}/${userId}/${folderId}/${folderName}/displayFiles`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          },
        );
        setFiles(response.data.storageFiles);
      } catch (error: any) {
        console.error("Error fetching files:", error);
        throw new Error("Failed to fetch files");
      }
    },
    [PORT, setFiles],
  );

  return (
    <StorageContext.Provider
      value={{
        files,
        setFiles,
        fetchFiles,
        homeId,
        setHomeId,
        homeFiles,
        setHomeFiles,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
}

export default StorageProvider;
