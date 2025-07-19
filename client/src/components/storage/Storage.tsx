import Sidebar from "./Sidebar";
import Folder from "./Folder";
import FolderHome from "./FolderHome";
import FileHeader from "./FileHeader";
import { useContext } from "react";
import UserContext from "@/context/userContext";

function Storage() {
  const { user } = useContext(UserContext);
  const url = window.location.pathname;

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg md:text-xl lg:text-2xl">Please log in to access your storage.</p>
      </div>
    );
  }

  return (
    <div className="flex font-nunito">
      <Sidebar />
      <div className="flex w-full flex-col">
        <FileHeader />
        {url === "/storage" && user ? <FolderHome /> : <Folder />}
      </div>
    </div>
  );
}
export default Storage;
