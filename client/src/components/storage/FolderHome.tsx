/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import UserContext from "@/context/userContext";

function FolderHome() {
  const { user } = useContext(UserContext);
  const [files, setFiles] = useState<any[]>([]);
  const PORT = import.meta.env.VITE_API_URL;

  const fetchHomeFiles = useCallback(async () => {
    try {
      const response = await axios.get(`${PORT}/storage`, {
        params: {
          userId: user.id,
        },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(response);
      setFiles(response.data.homeFiles);
    } catch (error: any) {
      console.error("Error fetching home files:", error);
      throw new Error("Failed to fetch home files");
    }
  }, [PORT, user?.id]);

  useEffect(() => {
    fetchHomeFiles();
  }, [fetchHomeFiles]);

  return (
    <>
      {files.map((file) => {
        return (
          <div
            key={file.id}
            className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 md:px-5 xl:px-7"
          >
            <h3 className="flex-[2]">{file.name}</h3>
            <p className="flex-1">{file.metadata.mimetype}</p>
            <p className="flex-1">{file.metadata.size} bytes</p>
            <p className="flex-1">{new Date(file.metadata.lastModified).toLocaleDateString()}</p>
          </div>
        );
      })}
    </>
  );
}

export default FolderHome;
