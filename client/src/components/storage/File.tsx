/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useContext, useCallback } from "react";
import UserContext from "@/context/userContext";
import { useParams } from "react-router";
import DropDown from "./Dropdown";
import { EllipsisVertical } from "lucide-react";
import axios from "axios";

function File({ files }: { files: any[] }) {
  const { user } = useContext(UserContext);
  const PORT = import.meta.env.VITE_API_URL;
  const params = useParams();
  const userId = params.userId;
  const folderId = params.folderId;
  const folderName = params.folderName;

  const fetchFileDetails = useCallback(async () => {
    try {
      const response = axios.get(`${PORT}/${userId}/${folderId}/${folderName}/displayFiles`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(response);
    } catch (error: any) {
      console.error("Error fetching file details:", error);
      throw new Error("Failed to fetch file details");
    }
  }, [PORT, userId, folderId, folderName]);

  if (userId !== user?.id) {
    return <p className="text-center text-red-500">Unauthorized access to files.</p>;
  }

  if (!files || files.length === 0) {
    return <p className="text-center text-gray-500">No files found.</p>;
  }

  return (
    <>
      {files.map((file) => {
        return (
          <div
            key={file.id}
            className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 md:px-5 xl:px-7"
          >
            <p className="flex-[1.5]">{file.name}</p>
            <p className="flex-1">{file.metadata.mimetype}</p>
            <p className="flex-1">{file.metadata.size} bytes</p>
            <p className="flex-1">{new Date(file.metadata.lastModified).toLocaleDateString()}</p>
            <DropDown icon={<EllipsisVertical />} />
          </div>
        );
      })}
    </>
  );
}

export default File;
