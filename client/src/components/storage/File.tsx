/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useContext } from "react";
import DropDown from "./Dropdown";
import { EllipsisVertical } from "lucide-react";
import axios from "axios";
import { fetchHomeFiles } from "./fetchHome";
import StorageContext from "@/context/storageContext";
import { useLocation } from "react-router";
import type { Location } from "react-router";
import { DropdownMenuItem } from "../ui/dropdown-menu";

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

  const handleDownload = async (fileId: string) => {
    try {
      const response = await axios.get(`${PORT}/download`, {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          fileId,
          userId,
          folderId,
        },
        responseType: "blob",
      });
      if (response.status === 200) {
        downloadFile(response);
      }
    } catch (error: any) {
      console.error("Error downloading file:", error);
    }
  };

  const downloadElement = (onClick: React.MouseEventHandler) => (
    <DropdownMenuItem onClick={onClick} className="cursor-pointer text-green-600">
      Download
    </DropdownMenuItem>
  );

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
            <DropDown
              onFunctionClick={() => handleDelete(file.id)}
              icon={<EllipsisVertical />}
              optionalElement={downloadElement(() => handleDownload(file.id))}
            />
          </div>
        );
      })}
    </>
  );
});

function downloadFile(response: any) {
  const blob: Blob = new Blob([response.data], {
    type: response.data.type,
  });

  let fileName: string = response.headers["content-disposition"];

  if (fileName) {
    fileName = fileName.split("filename=")[1].replace(/"/g, "");
  }

  const url: string = window.URL.createObjectURL(blob);

  const downloadLink: HTMLAnchorElement = document.createElement("a");
  downloadLink.download = fileName;
  downloadLink.href = url;

  downloadLink.onclick = () => {
    setTimeout(() => {
      window.URL.revokeObjectURL(downloadLink.href);
    }, 1500);
  };

  downloadLink.click();
  downloadLink.remove();
}

export default File;
