/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import UserContext from "@/context/userContext";
import File from "./File";

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
      setFiles(response.data.homeFiles);
    } catch (error: any) {
      console.error("Error fetching home files:", error);
      throw new Error("Failed to fetch home files");
    }
  }, [PORT, user?.id]);

  useEffect(() => {
    fetchHomeFiles();
  }, [fetchHomeFiles]);

  return <File files={files} />;
}

export default FolderHome;
