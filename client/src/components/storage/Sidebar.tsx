/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plus, FileUp } from "lucide-react";
import FolderDialog from "./FolderDialog";
import FileDialog from "./FileDialog";
import { useContext } from "react";
import UserContext from "@/context/userContext";
import axios from "axios";
import { useFolders } from "./FileLoader";
import ListItem from "./ListItem";

const PORT = import.meta.env.VITE_API_URL;
const action = `${PORT}/upload`;

function Sidebar() {
  const { user } = useContext(UserContext);
  const userId = user?.id;
  const { folders, getFolders } = useFolders(userId);
  const folderAction = `${PORT}/${userId}/createFolder`;

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
            <ListItem key={folder.id} name={folder.name} folderId={folder.id} userId={userId} />
          ))}
        </ul>
      </div>
    </aside>
  );
}

function IconButton({ icon }: { icon: React.ReactNode }) {
  return (
    <div className="cursor-pointer rounded-md bg-white p-1 shadow-md hover:bg-gray-100">{icon}</div>
  );
}

export default Sidebar;
