import { Plus, FileUp } from "lucide-react";
import FolderDialog from "./FolderDialog";
import FileDialog from "./FileDialog";
import { useContext } from "react";
import UserContext from "@/context/userContext";
import { useFolders } from "./FolderLoader";
import ListItem from "./ListItem";

const PORT: string = import.meta.env.VITE_API_URL;
const action: string = `${PORT}/upload`;

function Sidebar() {
  const { user } = useContext(UserContext);
  const userId: string = user?.id;
  const { folders, getFolders } = useFolders(userId);
  const folderAction = `${PORT}/${userId}/createFolder`;
  return (
    <aside className="h-screen w-[20%] bg-gray-200">
      <div className="px-4 py-2">
        <div className="flex items-center justify-between p-2">
          <h2 className="text-lg md:text-xl 2xl:text-2xl">Folders</h2>
          <div className="flex items-center justify-center gap-2">
            <FolderDialog
              openButton={<IconButton icon={<Plus />} />}
              action={folderAction}
              getFolders={getFolders}
            />
            <FileDialog openButton={<IconButton icon={<FileUp />} />} action={action} />
          </div>
        </div>
        <ul className="flex flex-col text-lg">
          {folders.map((folder) => (
            <ListItem
              key={folder.id}
              name={folder.name}
              folderId={folder.id}
              userId={userId}
              getFolders={getFolders}
            />
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
