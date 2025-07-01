import { Plus, FileUp } from "lucide-react";
import FolderDialog from "./FolderDialog";
import FileDialog from "./FileDialog";
import { useContext } from "react";
import UserContext from "@/context/userContext";
import axios from "axios";

const PORT = import.meta.env.VITE_API_URL;
const action = `${PORT}/upload`;

function Sidebar() {
  const { user } = useContext(UserContext);
  const folderAction = `${PORT}/${user?.id}/folders`;

  const createFolder: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await axios.post(folderAction, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(response);
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      console.error("Error creating folder:", error);
    }
  };
  return (
    <aside className="h-screen w-[20%] bg-gray-200">
      <div className="px-4 py-2">
        <div className="flex items-center justify-between p-2">
          <h2 className="text-lg md:text-xl 2xl:text-2xl">Folders</h2>
          <div className="flex gap-3">
            <FolderDialog
              openButton={<IconButton icon={<Plus />} />}
              action={folderAction}
              onSubmit={createFolder}
            />
            <FileDialog openButton={<IconButton icon={<FileUp />} />} action={action} />
          </div>
        </div>
        <ul className="flex flex-col text-lg">
          <ListItem name="Folder 1" />
          <ListItem name="Folder 2" />
          <ListItem name="Folder 3" />
          <ListItem name="Folder 4" />
          <ListItem name="Folder 5" />
          <ListItem name="Folder 6" />
          <ListItem name="Folder 7" />
          <ListItem name="Folder 8" />
          <ListItem name="Folder 9" />
          <ListItem name="Folder 10" />
        </ul>
      </div>
    </aside>
  );
}

function ListItem({ name }: { name: string }) {
  return <li className="cursor-pointer rounded-lg p-2 hover:bg-gray-100">{name}</li>;
}

function IconButton({ icon }: { icon: React.ReactNode }) {
  return (
    <div className="cursor-pointer rounded-md bg-white p-1 shadow-md hover:bg-gray-100">{icon}</div>
  );
}

export default Sidebar;
