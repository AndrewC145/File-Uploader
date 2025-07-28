import { useEffect, useContext } from "react";
import UserContext from "@/context/userContext";
import StorageContext from "@/context/storageContext";
import { useLocation, type Location } from "react-router";
import File from "./File";

function Folder() {
  const { user } = useContext(UserContext);
  const { files, setFiles, fetchFiles } = useContext(StorageContext);
  const location: Location = useLocation();
  const folderId: number = location.state?.folderId;
  const folderName: string = location.state?.folderName;

  useEffect(() => {
    if (!user || !folderId || !folderName) {
      console.error("User, folderId, or folderName is not defined.");
      return;
    }

    fetchFiles(user.id, folderId, folderName);

    return () => {
      setFiles([]);
    };
  }, [fetchFiles, setFiles, user, folderId, folderName, user.id]);

  return <File userId={user.id} files={files} folderId={folderId} />;
}

export default Folder;
