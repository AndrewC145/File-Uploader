/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useContext, useCallback } from "react";
import FileHeader from "./FileHeader";
import axios from "axios";
import UserContext from "@/context/userContext";
import { useLocation, type Location } from "react-router";

function Folder() {
  const { user } = useContext(UserContext);
  const [files, setFiles] = useState<any[]>([]);
  const location: Location = useLocation();
  const folderId: number = location.state?.folderId;
  const folderName: string = location.state?.folderName;
  const PORT = import.meta.env.VITE_API_URL;

  const fetchFiles = useCallback(async () => {
    try {
      const response = await axios.get(
        `${PORT}/${user?.id}/${folderId}/${folderName}/displayFiles`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      console.log(response);
    } catch (error: any) {
      console.error("Error fetching files:", error);
      throw new Error("Failed to fetch files");
    }
  }, [PORT, folderId, folderName, user?.id]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const fetchInitialFiles = useCallback(async () => {
    try {
      const response = await axios.get(`${PORT}/${user?.id}/${folderId}/Home/displayFiles`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(response);
    } catch (error: any) {
      console.error("Error fetching initial files:", error);
    }
  }, [PORT, folderId, user?.id]);

  useEffect(() => {});
  return <FileHeader />;
}

export default Folder;
