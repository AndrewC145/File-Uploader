/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useContext } from "react";
import DropDown from "./Dropdown";
import { EllipsisVertical } from "lucide-react";
import axios from "axios";
import { fetchHomeFiles } from "./fetchHome";
import StorageContext from "@/context/storageContext";
import { useLocation } from "react-router";
import type { Location } from "react-router";

const File = memo(function File({
  userId,
  files,
  folderId,
}: {
  userId: number;
  files: any[];
  folderId: number | null;
}) {
  const location: Location = useLocation();
  const { fetchFiles, setHomeFiles, setHomeId } = useContext(StorageContext);

  if (!files || files.length === 0) {
    return <p className="py-4 text-center text-gray-500">No files found.</p>;
  }

  const path: string = window.location.pathname;
  const folderName: string = location.state?.folderName;
  const PORT = import.meta.env.VITE_API_URL;

  const handleDelete = async (fileId: string) => {
    try {
      const response = await axios.delete(`${PORT}/deleteFile`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          fileId,
          folderId,
          userId,
        },
      });
      if (response.status === 200 && path === "/storage") {
        fetchHomeFiles(PORT, userId, setHomeFiles, setHomeId);
      } else {
        fetchFiles(userId, folderId, folderName);
      }
    } catch (error: any) {
      console.error("Error deleting file:", error);
    }
  };

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
            <DropDown onFunctionClick={() => handleDelete(file.id)} icon={<EllipsisVertical />} />
          </div>
        );
      })}
    </>
  );
});

export default File;
