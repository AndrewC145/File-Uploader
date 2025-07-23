import { useEffect, useContext } from "react";
import UserContext from "@/context/userContext";
import { useLocation, type Location } from "react-router";
import File from "./File";

function Folder() {
  const { user, files, setFiles, fetchFiles } = useContext(UserContext);
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

  return <File files={files} />;
}

export default Folder;
