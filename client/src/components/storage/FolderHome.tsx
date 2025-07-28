import { useEffect, useContext } from "react";
import UserContext from "@/context/userContext";
import StorageContext from "@/context/storageContext";
import File from "./File";
import { fetchHomeFiles } from "./fetchHome";

function FolderHome() {
  const { user } = useContext(UserContext);
  const { homeId, setHomeId, homeFiles, setHomeFiles } = useContext(StorageContext);
  const PORT = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchHomeFiles(PORT, user.id, setHomeFiles, setHomeId);

    return () => {
      setHomeFiles([]);
    };
  }, [PORT, user.id, setHomeId, setHomeFiles]);

  return <File files={homeFiles} folderId={homeId} userId={user.id} />;
}

export default FolderHome;
