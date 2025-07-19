/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useContext, useCallback } from "react";
import axios from "axios";
import UserContext from "@/context/userContext";
import { useLocation, type Location } from "react-router";
import File from "./File";

function Folder() {
  const { user, files, setFiles } = useContext(UserContext);
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
      setFiles(response.data.storageFiles);
    } catch (error: any) {
      console.error("Error fetching files:", error);
      throw new Error("Failed to fetch files");
    }
  }, [PORT, folderId, folderName, user?.id, setFiles]);

  useEffect(() => {
    fetchFiles();

    return () => {
      setFiles([]);
    };
  }, [fetchFiles, setFiles]);

  return <File files={files} />;
}

export default Folder;
