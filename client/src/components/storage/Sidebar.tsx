import { Plus, FileUp, Ellipsis } from "lucide-react";
import FolderDialog from "./FolderDialog";
import FileDialog from "./FileDialog";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState, useContext } from "react";
import UserContext from "@/context/userContext";
import axios from "axios";
import { useFolders } from "./FileLoader";

const PORT = import.meta.env.VITE_API_URL;
const action = `${PORT}/upload`;

function Sidebar() {
  const { user } = useContext(UserContext);
  const { folders, getFolders } = useFolders(user?.id);
  const folderAction = `${PORT}/${user?.id}/createFolder`;

  const createFolder: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData: FormData = new FormData(e.currentTarget);
    const data: object = Object.fromEntries(formData.entries());

    try {
      const response = await axios.post(folderAction, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        console.log("Folder created successfully:", response.data);
        getFolders();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error creating folder:", error);
    }
  };
  return (
    <aside className="h-screen w-[20%] bg-gray-200">
      <div className="px-4 py-2">
        <div className="flex items-center justify-between p-2">
          <h2 className="text-lg md:text-xl 2xl:text-2xl">Folders</h2>
          <div className="flex items-center justify-center gap-2">
            <FolderDialog
              openButton={<IconButton icon={<Plus />} />}
              action={folderAction}
              onSubmit={createFolder}
            />
            <FileDialog openButton={<IconButton icon={<FileUp />} />} action={action} />
          </div>
        </div>
        <ul className="flex flex-col text-lg">
          {folders.map((folder) => (
            <ListItem key={folder.id} name={folder.name} />
          ))}
        </ul>
      </div>
    </aside>
  );
}

function ListItem({ name }: { name: string }) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="flex items-center justify-between">
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
            <DropdownMenuItem className="cursor-pointer text-red-600">Delete</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function IconButton({ icon }: { icon: React.ReactNode }) {
  return (
    <div className="cursor-pointer rounded-md bg-white p-1 shadow-md hover:bg-gray-100">{icon}</div>
  );
}

export default Sidebar;
