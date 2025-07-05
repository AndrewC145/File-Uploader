/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useContext } from "react";
import UserContext from "@/context/userContext";
import axios from "axios";

const PORT = import.meta.env.VITE_API_URL;

async function fetchFolders(userId: string): Promise<any> {
  try {
    const response = await axios.get(`${PORT}/${userId}/folders`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching folders:", error);
    return [];
  }
}

function useFolders() {
  const { user } = useContext(UserContext);
  const [folders, setFolders] = useState<any[]>([]);

  useEffect(() => {
    if (user?.id) {
      fetchFolders(user?.id).then((data) => setFolders(data));
    }
  }, [user?.id]);

  useEffect(() => {
    console.log("Folders updated:", folders);
  }, [folders]);

  return folders;
}

export { fetchFolders, useFolders };
