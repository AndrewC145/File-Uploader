import { Plus } from "lucide-react";
import FolderDialog from "./FolderDialog";

function Sidebar() {
  return (
    <aside className="h-screen w-[20%] bg-gray-200">
      <div className="px-4 py-2">
        <div className="flex items-center justify-between p-2">
          <h2 className="text-lg md:text-xl 2xl:text-2xl">Folders</h2>
          <FolderDialog openButton={<IconButton />} />
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

function IconButton() {
  return (
    <div className="cursor-pointer rounded-md bg-white p-1 shadow-md hover:bg-gray-100">
      <Plus />
    </div>
  );
}

export default Sidebar;
