/* eslint-disable @typescript-eslint/no-explicit-any */
import { Ellipsis } from "lucide-react";
import DropDown from "./Dropdown";
import axios from "axios";
import { useNavigate } from "react-router";

function ListItem({
  name,
  folderId,
  userId,
  getFolders,
}: {
  name: string;
  folderId: number;
  userId: string;
  getFolders: () => void;
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/storage/${userId}/${folderId}/${name}`, {
      state: {
        folderId: folderId,
        folderName: name,
      },
    });
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/deleteFolder`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          userId: userId,
          folderName: name,
          folderId: folderId,
        },
      });
      if (response.status === 200) {
        getFolders();
        navigate("/storage", {
          state: {
            folderId: null,
            folderName: null,
          },
        });
      }
    } catch (error: any) {
      console.error("Error deleting folder:", error);
    }
  };
  return (
    <div onClick={handleClick} className="flex items-center justify-between">
      <li className="flex w-full cursor-pointer items-center justify-between rounded-lg p-2 text-sm hover:bg-gray-100 sm:text-base">
        {name}
      </li>
      <DropDown icon={<Ellipsis />} onFunctionClick={handleDelete} />
    </div>
  );
}

export default ListItem;
