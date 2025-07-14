/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Ellipsis } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import axios from "axios";
import { useFolders } from "./FileLoader";
import { useNavigate } from "react-router";

function ListItem({ name, folderId, userId }: { name: string; folderId: number; userId: string }) {
  const [open, setOpen] = useState<boolean>(false);
  const { getFolders } = useFolders(userId);
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
      console.log(response);
      if (response.status === 200) {
        console.log("Folder deleted successfully:", response.data);
        getFolders();
      }
    } catch (error: any) {
      console.error("Error deleting folder:", error);
    }
  };
  return (
    <div onClick={handleClick} className="flex items-center justify-between">
      <li className="flex w-full cursor-pointer items-center justify-between rounded-lg p-2 hover:bg-gray-100">
        {name}
      </li>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="cursor-pointer" size="icon">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[80px]">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={handleDelete} className="cursor-pointer text-red-600">
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ListItem;
